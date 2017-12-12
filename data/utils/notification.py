'''
Notification sender class
Example Run Command:
    python3 notification.py --gmail test-recipient@gmail.com --sms 8888888888 configs.yaml

An example of the configs.yaml: 

gmail_0:
  address: test@gmail.com
  password: myPassWord
  sender_type: gmail_password

gmail_1:
  address: test@gmail.com
  credential_path: client_secret.json
  sender_type: gmail_credentials

sms_0:
  number: '+19999999999'
  key: 'AC***********'
  secret: '18***********'
  sender_type: sms_twilio

'''

from abc import ABCMeta, abstractmethod
from enum import Enum

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import httplib2
import os
import oauth2client
from oauth2client import client, tools
import base64
from apiclient import errors, discovery
import mimetypes

from twilio.rest import Client as TwilioClient

import argparse
import yaml

SCOPES = 'https://mail.google.com/'
APPLICATION_NAME = 'Gmail API Python Send Email'


class Sender(metaclass=ABCMeta):

    @abstractmethod
    def send(self, recipient, subject, message):
        raise NotImplementedError('send method is not implemented')


class GmailSenderWithPassword(Sender):
    '''
    Gmail Sender Client with sender address and password
    This class is created for quick testing purposes
    Please avoid using it in production due to various security concerns
    '''
    def __init__(self, address, password):
        self.address = address
        self.password = password

    def send(self, recipient, subject, body):
        msg = MIMEMultipart()
        msg['From'] = self.address
        msg['To'] = recipient
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))
        self._send(msg, recipient)

    def _send(self, msg, recipient):
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(self.address, self.password)
        text = msg.as_string()
        server.sendmail(self.address, recipient, text)
        server.quit()


class GmailSenderWithCredentials(Sender):
    '''
    Gmail Sender Client with sender address and credentials
    '''

    def __init__(self, address, secret_file_path=None, credentials=None):
        self.address = address
        if secret_file_path:
            credentials = self._get_credentials(secret_file_path)
        elif credentials:
            credentials = credentials
        else:
            raise ValueError('No credential or secret_file_path is found to create a gmail sender')
        self.credentials = credentials

        http = self.credentials.authorize(httplib2.Http())
        self.service = discovery.build('gmail', 'v1', http=http)

    def _get_credentials(self, secret_file_path):
        '''
        Log in using this guide: https://developers.google.com/gmail/api/quickstart/python
        Or store your credentials in ~/.credentials/gmail-python-email-send.json from other sign-ins
        '''
        home_dir = os.path.expanduser('~')
        credential_dir = os.path.join(home_dir, '.credentials')
        if not os.path.exists(credential_dir):
            os.makedirs(credential_dir)
        credential_path = os.path.join(credential_dir, 'gmail-python-email-send.json')

        store = oauth2client.file.Storage(credential_path)
        credentials = store.get()
        if not credentials or credentials.invalid:
            flow = client.flow_from_clientsecrets(secret_file_path, SCOPES)
            flow.user_agent = APPLICATION_NAME
            credentials = tools.run_flow(flow, store)
            print('Storing credentials to ' + credential_path)
        return credentials

    def send(self, recipient, subject, body):
        msg = MIMEMultipart()
        msg['From'] = self.address
        msg['To'] = recipient
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Don't worry about the details, this is just a google thing
        # https://github.com/google/google-api-python-client/issues/93
        msg_raw = {'raw': base64.urlsafe_b64encode(msg.as_string().encode()).decode()}
        try:
            message = (self.service.users().messages().send(userId='me', body=msg_raw).execute())
            print('Message Id: %s' % message['id'])
            return message
        except errors.HttpError as error:
            print('An error occurred: %s' % error)


class TwilioSMSSender(Sender):
    '''
    SMS Sender Client
    '''
    def __init__(self, key, secret, number):
        self.client = TwilioClient(key, secret)
        self.client_number = number

    def send(self, recipient, subject, body):
        self.client.messages.create(
                       from_=self.client_number,
                       to=recipient,
                       body='Hello from Python!')


class SenderFactory:
    def get_sender(self, info):
        if 'sender_type' not in info:
            raise ValueError('Sender type is not specified in the info {}'.format(info))
        sender_type = info['sender_type']
        if sender_type == 'gmail_password':
            if 'address' in info and 'password' in info:
                return GmailSenderWithPassword(info['address'], info['password'])
            else:
                raise ValueError('Sender email address or password not found in info dictionary')
        if sender_type == 'gmail_credentials':
            if 'address' not in info:
                raise ValueError('Sender email address not found in info dictionary')
            if 'secret_file_path' in info:
                return GmailSenderWithCredentials(info['address'], secret_file_path=info['secret_file_path'])
            elif 'credentials' in info:
                return GmailSenderWithCredentials(info['address'], credentials=info['credentials'])
            else:
                raise ValueError('Sender email credentials not found in info dictionary')
        if sender_type == 'sms_twilio':
            if 'key' in info and 'secret' in info and 'number' in info:
                return TwilioSMSSender(info['key'], info['secret'], info['number'])
            else:
                raise ValueError('Sender SMS key or secret or number not found in info dictionary')
        else:
            raise NotImplementedError('Unknown sender type.')


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='Create notification senders based on config file', formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('config_file', help='Path to config yaml file')
    parser.add_argument('--gmail', dest='gmail_recipient',default=None, type=str, help='Set gmail address for quick testing')
    parser.add_argument('--sms', dest='sms_recipient', default=None, type=str, help='Set SMS number for quick testing')
    parser.add_argument('--subject', dest='subject', default='Hello!', type=str, help='Set message subject')
    parser.add_argument('--body', dest='body', default='Blockterm is awesome!', type=str, help='Set message body')
    args = parser.parse_args()

    configs = {}
    with open(args.config_file, 'r') as f:
        try:
            configs = yaml.load(f)
        except yaml.YAMLError as exc:
            print(exc)
    factory = SenderFactory()
    senders = {}
    for name, info in configs.items():
        print('Initializing sender: ', name, info)
        senders[name] = factory.get_sender(info)

    subject = args.subject
    body = args.body
    
    gmail_recipient = args.gmail_recipient
    sms_recipient = args.sms_recipient

    print('Sending test messages')
    for name, sender in senders.items():
        if name.startswith('gmail') and gmail_recipient:
            recipient = gmail_recipient
        elif name.startswith('sms') and sms_recipient:
            recipient = sms_recipient
        else:
            print('Unknown sender or recipient for testing with name: {}'.format(name))
            break
        sender.send(recipient, subject, body)
        print('Message sent from sender {}',format(name))

    print('Testing Completes')

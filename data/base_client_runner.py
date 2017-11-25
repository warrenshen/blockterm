import abc
import threading


class Client(object):
    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def update(self):
        """Update information stored in the client class"""
        raise NotImplementedError("Please implement update method")


class BaseClientRunner():
    def __init__(self, client, update_interval=5):
        self.client = client
        self.update_interval = update_interval

    def run(self):
        threading.Timer(self.update_interval, self.run).start()
        self.client.update()

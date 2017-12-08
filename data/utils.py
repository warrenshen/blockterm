import time
from datetime import datetime

def datetime_string_to_unix_timestamp(timstamp_string):
  return int(datetime.strptime(timstamp_string, '%Y-%m-%d').strftime('%s'))

def unix_timestamp_today():
  return int(time.mktime(datetime.today().date().timetuple()))

def unix_timestamp_to_datetime_string(timestamp_unix):
  datetime_object = datetime.fromtimestamp(timestamp_unix)
  return datetime_object.strftime('%Y-%m-%d %H:%M:%S')

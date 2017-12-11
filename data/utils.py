import pytz
# import time

from datetime import datetime, time, timedelta

tz = pytz.timezone('America/Los_Angeles')

def datetime_string_to_unix_timestamp(timstamp_string):
  return int(datetime.strptime(timstamp_string, '%Y-%m-%d %H:%M:%S').strftime('%s'))

def unix_timestamp_now():
  return int(time.time())

def unix_timestamp_today():
  return int(tz.localize(datetime.combine(datetime.now(tz), time(0, 0)), is_dst=None).strftime('%s'))

def unix_timestamp_to_datetime_string(timestamp_unix):
  datetime_object = datetime.fromtimestamp(timestamp_unix)
  localized = tz.localize(datetime_object, is_dst=None)
  return localized.strftime('%Y-%m-%d %H:%M:%S')

def datetime_string_now():
  timestamp_unix = int(time.time())
  return unix_timestamp_to_datetime_string(timestamp_unix)

def unix_timestamps_until_today(start_date):
  start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
  today = datetime.now(tz).date()

  total_days = (today - start_date).days

  for day_number in range(total_days):
    current_date = start_date + timedelta(days=day_number)
    localized_date = tz.localize(datetime.combine(current_date, time(0, 0)), is_dst=None)
    yield int(localized_date.strftime('%s'))

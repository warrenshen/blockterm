import pytz
import time

# Note that we use both the "time" module and the "datetime.time" function.
import datetime

tz = pytz.timezone('America/Los_Angeles')

def datetime_string_now():
  timestamp_unix = int(time.time())
  return unix_timestamp_to_datetime_string(timestamp_unix)

def datetime_string_to_unix_timestamp(datetime_string, string_format='%Y-%m-%d %H:%M:%S'):
  return int(datetime.datetime.strptime(datetime_string, string_format).strftime('%s'))

def datetime_string_utc_to_pst(datetime_string, string_format='%Y-%m-%d %H:%M:%S'):
  datetime_object = datetime.datetime.strptime(datetime_string, string_format)
  return pytz.utc.localize(datetime_object).astimezone(tz).strftime('%Y-%m-%d %H:%M:%S')

def unix_timestamp_now():
  return int(time.time())

def unix_timestamp_today():
  return int(
    tz.localize(
      datetime.datetime.combine(
        datetime.datetime.now(tz),
        datetime.time(0, 0)
      ),
      is_dst=None
    ).strftime('%s'))

def unix_timestamp_to_datetime_string(timestamp_unix):
  datetime_object = datetime.datetime.fromtimestamp(timestamp_unix)
  localized = tz.localize(datetime_object, is_dst=None)
  return localized.strftime('%Y-%m-%d %H:%M:%S')

def unix_timestamps_until_today(start_date):
  start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()
  today = datetime.datetime.now(tz).date()

  total_days = (today - start_date).days

  for day_number in range(total_days):
    current_date = start_date + datetime.timedelta(days=day_number)
    localized_date = tz.localize(
      datetime.datetime.combine(
        current_date,
        datetime.time(0, 0)
      ),
      is_dst=None
    )
    yield int(localized_date.strftime('%s'))

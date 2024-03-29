from crontab import CronTab
from configs import CRONTAB_USER, PYTHON_PATH, SRC_PATH

def get_command_for_script(script_name):
  return '%s %s/%s >> %s/cron.log 2>&1' % (PYTHON_PATH, SRC_PATH, script_name, SRC_PATH)

cron_tab = CronTab(user=CRONTAB_USER)

cron_tab.env['MAILTO'] = 'jtcdbob@gmail.com, warrenzshen@gmail.com, blockterm2017@gmail.com'

cron_tab.remove_all()
cron_tab.write()

job = cron_tab.new(command=get_command_for_script('coinmarketcap_client.py -t global'))
job.minute.every(5)
cron_tab.write()

job = cron_tab.new(command=get_command_for_script('coinmarketcap_client.py -t tickers'))
job.minute.during(2, 59).every(10)
cron_tab.write()

job = cron_tab.new(command=get_command_for_script('token_exchanges.py'))
job.minute.during(7, 59).every(10)
cron_tab.write()

# job = cron_tab.new(command=get_command_for_script('sync_markets.py %s/config.yaml' % SRC_PATH))
# job.minute.every(2)
# cron_tab.write()

job = cron_tab.new(command=get_command_for_script('portfolio_tickers.py'))
job.minute.on(8)
job.hour.every(4)
cron_tab.write()

job = cron_tab.new(command=get_command_for_script('sync_blob_and_comments.py'))
job.minute.during(4, 59).every(5)
cron_tab.write()

job = cron_tab.new(command=get_command_for_script('active_user_and_subscriber_counts.py'))
job.minute.every(30)
cron_tab.write()

job = cron_tab.new(command=get_command_for_script('post_counts.py'))
job.minute.on(6)
job.hour.every(24)
cron_tab.write()

job = cron_tab.new(command=get_command_for_script('comment_counts.py'))
job.minute.on(6)
job.hour.every(24)
cron_tab.write()

job = cron_tab.new(command=get_command_for_script('mention_counts.py'))
job.minute.on(6)
job.hour.every(24)
cron_tab.write()

for (name, value) in cron_tab.env.items():
  print(name)
  print(value)

from crontab import CronTab

import configs

cron_tab = CronTab(user=configs.CRONTAB_USER)
cron_tab.remove_all()
cron_tab.write()

cron_tab = CronTab(user=configs.CRONTAB_USER)
job = cron_tab.new(command='python active_user_and_subscribers_counts.py')
job.minute.every(15)
cron_tab.write()

cron_tab = CronTab(user=configs.CRONTAB_USER)
job = cron_tab.new(command='python post_counts.py')
job.day.every(1)
cron_tab.write()

cron_tab = CronTab(user=configs.CRONTAB_USER)
job = cron_tab.new(command='python sync_comments.py')
job.minute.every(10)
cron_tab.write()


cron_tab = CronTab(user=configs.CRONTAB_USER)
job = cron_tab.new(command='python comment_counts.py')
job.day.every(1)
cron_tab.write()


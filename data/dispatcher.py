from crontab import CronTab

import configs

def get_command_for_script(script_name):
    return 'python %s/%s' % (configs.CRONTAB_PATH, script_name)

cron_tab = CronTab(user=configs.CRONTAB_USER)
cron_tab.remove_all()
cron_tab.write()

cron_tab = CronTab(user=configs.CRONTAB_USER)
job = cron_tab.new(command=get_command_for_script('sync_comments.py'))
job.minute.every(10)
cron_tab.write()

cron_tab = CronTab(user=configs.CRONTAB_USER)
job = cron_tab.new(command=get_command_for_script('active_user_and_subscriber_counts.py'))
job.minute.every(15)
cron_tab.write()

cron_tab = CronTab(user=configs.CRONTAB_USER)
job = cron_tab.new(command=get_command_for_script('post_counts.py'))
job.day.every(1)
cron_tab.write()

cron_tab = CronTab(user=configs.CRONTAB_USER)
job = cron_tab.new(command=get_command_for_script('comment_counts.py'))
job.day.every(1)
cron_tab.write()


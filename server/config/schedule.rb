# Use this file to easily define all of your cron jobs.
# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end

# Learn more: http://github.com/javan/whenever

ENV.each { |k, v| env(k, v) }

set :job_template, "/bin/bash -c ':job'"
set :output,       '/blockterm/log/cron.log'

job_type :job, 'cd /blockterm && bundle exec rails runner :task :output'

# every 4.hours do
#   job 'PortfolioTickerJob.perform_now'
# end

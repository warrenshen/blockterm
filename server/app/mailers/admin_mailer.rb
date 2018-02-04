class AdminMailer < ApplicationMailer
  JOB_PORTFOLIO_TICKER = 'Portfolio Ticker Job'

  JOB_STATUS_FAILURE = 'Failure'
  JOB_STATUS_SUCCESS = 'Success'

  def job_status_email(job_name, job_status, message = nil)
    @message = message
    subject = "Blockterm Admin Mail: [#{job_name}] [#{job_status}]"
    mail(to: 'warrenzshen@gmail.com', subject: subject)
  end
end

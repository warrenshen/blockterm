class UserMailer < ApplicationMailer
  def forgot_password_email(user)
    if Rails.env.development?
      @url = "http://localhost:3000/reset/#{user.reset_password_token}"
    else
      @url = "https://blockterm.com/reset/#{user.reset_password_token}"
    end
    mail(to: user.email, subject: 'Blockterm Reset Password Request')
  end
end

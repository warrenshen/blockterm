# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           not null
#  password_digest        :string           not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  last_active_at         :datetime         not null
#  confirmation_token     :string
#  confirmation_sent_at   :datetime
#  confirmed_at           :datetime
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  active_count           :integer          default(0), not null
#

class User < ApplicationRecord
  has_secure_password

  has_many :alerts
  has_many :dashboard_items
  has_many :dashboard_pages
  has_many :token_users
  has_many :tokens, through: :token_users

  validates :email, presence: true, uniqueness: true, on: :create
  validates_email_format_of :email, on: :create
  validates :password, presence: true, length: { within: 5..30 }, on: :create
  validates_presence_of :last_active_at

  before_validation :set_last_active_at, on: :create

  def generate_reset_password_token!
    self.reset_password_token = generate_token
    self.reset_password_sent_at = DateTime.now
    save!
  end

  def reset_password!(password)
    self.reset_password_token = nil
    self.password = password
    save!
  end

  def reset_password_token_valid?(token)
    self.reset_password_sent_at + 4.hours > DateTime.now && self.reset_password_token == token
  end

  def sync_last_active_at!
    if last_active_at.nil? || last_active_at < DateTime.now - 1.minute
      self.update_attributes!(
        active_count: active_count + 1,
        last_active_at: DateTime.now,
      )
    end
  end

  private

  def generate_token
    SecureRandom.hex(16)
  end

  def set_last_active_at
    self.last_active_at = DateTime.now
  end
end

# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  has_secure_password

  has_many :dashboard_items
  has_many :dashboard_pages
  has_many :token_users
  has_many :tokens, through: :token_users

  validates :email, presence: true, uniqueness: true
  validates_email_format_of :email
  validates :password, presence: true, length: { within: 5..30 }
  validates_presence_of :last_active_at

  before_create :set_last_active

  def sync_last_active_at
    if last_active_at.nil? || last_active_at < DateTime.now - 1.minute
      self.update_attribute(:last_active_at, DateTime.now)
    end
  end

  private

  def set_last_active_at
    self.last_active_at = DateTime.now
  end
end

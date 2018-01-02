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

  validates :email, presence: true, uniqueness: true
  validates_length_of :email, minimum: 5, maximum: 30
  validates :password, presence: true, length: { within: 5..30 }
end

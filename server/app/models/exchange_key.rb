# == Schema Information
#
# Table name: exchange_keys
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  exchange   :integer          not null
#  status     :integer          default(0), not null
#  api_key    :string           not null
#  secret_key :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_exchange_keys_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class ExchangeKey < ApplicationRecord
  belongs_to :user

  validates :api_key, presence: true
  validates :secret_key, presence: true

  enum exchange: {
    gdax: 0,
    binance: 1,
    bittrex: 2,
  }
  enum status: {
    active: 0,
  }
end

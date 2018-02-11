# == Schema Information
#
# Table name: token_exchanges
#
#  id                 :integer          not null, primary key
#  token_id           :integer
#  exchange           :integer          not null
#  identifier         :string           not null
#  price_usd          :decimal(, )      default(0.0), not null
#  price_btc          :decimal(, )      default(0.0), not null
#  price_eth          :decimal(, )      default(0.0), not null
#  percent_change_1h  :decimal(, )      default(0.0), not null
#  percent_change_24h :decimal(, )      default(0.0), not null
#  percent_change_7d  :decimal(, )      default(0.0), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_token_exchanges_on_exchange_and_identifier  (exchange,identifier) UNIQUE
#  index_token_exchanges_on_token_id                 (token_id)
#
# Foreign Keys
#
#  fk_rails_...  (token_id => tokens.id)
#

class TokenExchange < ApplicationRecord
  belongs_to :token

  has_many :token_users

  enum exchange: {
    gdax: 0,
    binance: 1,
    bittrex: 2,
    coinmarketcap: 3,
  }

  validates :exchange, presence: true
  validates :identifier, presence: true, uniqueness: { scope: :exchange }
end

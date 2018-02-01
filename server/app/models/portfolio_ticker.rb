# == Schema Information
#
# Table name: portfolio_tickers
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  value_usd  :decimal(, )      not null
#  value_btc  :decimal(, )      not null
#  value_eth  :decimal(, )      not null
#  timestamp  :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_portfolio_tickers_on_user_id                (user_id)
#  index_portfolio_tickers_on_user_id_and_timestamp  (user_id,timestamp) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class PortfolioTicker < ApplicationRecord
  belongs_to :user
end

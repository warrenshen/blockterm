# == Schema Information
#
# Table name: market_tickers
#
#  id         :integer          not null, primary key
#  market_id  :integer          not null
#  value      :decimal(, )      not null
#  timestamp  :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_market_tickers_on_market_id  (market_id)
#
# Foreign Keys
#
#  fk_rails_...  (market_id => markets.id)
#

class MarketTicker < ApplicationRecord
  belongs_to :market
end

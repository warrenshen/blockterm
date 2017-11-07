# == Schema Information
#
# Table name: market_tickers
#
#  id         :integer          not null, primary key
#  markets_id :integer          not null
#  value      :decimal(, )      not null
#  when       :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_market_tickers_on_markets_id  (markets_id)
#
# Foreign Keys
#
#  fk_rails_...  (markets_id => markets.id)
#

class MarketTicker < ApplicationRecord
end

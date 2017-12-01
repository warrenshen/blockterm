# == Schema Information
#
# Table name: markets
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_markets_on_name  (name) UNIQUE
#

class Market < ApplicationRecord
	has_many :market_tickers
end

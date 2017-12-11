# == Schema Information
#
# Table name: markets
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  token_id   :integer
#
# Indexes
#
#  index_markets_on_name      (name) UNIQUE
#  index_markets_on_token_id  (token_id)
#
# Foreign Keys
#
#  fk_rails_...  (token_id => tokens.id)
#

class Market < ApplicationRecord
	has_many :market_tickers
  has_one :token
end

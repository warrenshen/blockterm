# == Schema Information
#
# Table name: market_subreddits
#
#  id           :integer          not null, primary key
#  market_id    :integer          not null
#  subreddit_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_market_subreddits_on_market_id                   (market_id)
#  index_market_subreddits_on_market_id_and_subreddit_id  (market_id,subreddit_id) UNIQUE
#  index_market_subreddits_on_subreddit_id                (subreddit_id)
#

class MarketSubreddit < ApplicationRecord
end

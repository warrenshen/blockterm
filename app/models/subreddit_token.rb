# == Schema Information
#
# Table name: subreddit_tokens
#
#  id           :integer          not null, primary key
#  subreddit_id :integer          not null
#  token_id     :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_subreddit_tokens_on_subreddit_id  (subreddit_id)
#  index_subreddit_tokens_on_token_id      (token_id)
#
# Foreign Keys
#
#  fk_rails_...  (subreddit_id => subreddits.id)
#  fk_rails_...  (token_id => tokens.id)
#

class SubredditToken < ApplicationRecord
  belongs_to :subreddit
  belongs_to :token
end

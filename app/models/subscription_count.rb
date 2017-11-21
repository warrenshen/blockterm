# == Schema Information
#
# Table name: subscription_counts
#
#  id           :integer          not null, primary key
#  subreddit_id :integer          not null
#  timestamp    :datetime         not null
#  count        :integer          default(0), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_subscription_counts_on_subreddit_id  (subreddit_id)
#
# Foreign Keys
#
#  fk_rails_...  (subreddit_id => subreddits.id)
#

class SubscriptionCount < ApplicationRecord
  belongs_to :subreddit
end

# == Schema Information
#
# Table name: subscription_counts
#
#  id           :integer          not null, primary key
#  subreddit_id :integer          not null
#  when         :datetime         not null
#  count        :integer          default(0), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Foreign Keys
#
#  fk_rails_...  (subreddit_id => subreddits.id)
#

class SubscriptionCount < ApplicationRecord
end

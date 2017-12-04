# == Schema Information
#
# Table name: active_user_counts
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
#  index_active_user_counts_on_subreddit_id                (subreddit_id)
#  index_active_user_counts_on_subreddit_id_and_timestamp  (subreddit_id,timestamp) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (subreddit_id => subreddits.id)
#

class ActiveUserCount < ApplicationRecord
  belongs_to :subreddit
end

# == Schema Information
#
# Table name: post_counts
#
#  id           :integer          not null, primary key
#  subreddit_id :integer          not null
#  when         :datetime         not null
#  count        :integer          default(0), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_post_counts_on_subreddit_id  (subreddit_id)
#
# Foreign Keys
#
#  fk_rails_...  (subreddit_id => subreddits.id)
#

class PostCount < ApplicationRecord
  belongs_to :subreddit
end

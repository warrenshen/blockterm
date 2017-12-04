# == Schema Information
#
# Table name: mention_counts
#
#  id           :integer          not null, primary key
#  keyword_id   :integer          not null
#  subreddit_id :integer          not null
#  timestamp    :datetime         not null
#  count        :integer          default(0), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_mention_counts_on_keyword_and_subreddit_and_timestamp  (keyword_id,subreddit_id,timestamp) UNIQUE
#  index_mention_counts_on_keyword_id                           (keyword_id)
#  index_mention_counts_on_subreddit_id                         (subreddit_id)
#
# Foreign Keys
#
#  fk_rails_...  (keyword_id => keywords.id)
#  fk_rails_...  (subreddit_id => subreddits.id)
#

class MentionCount < ApplicationRecord
  belongs_to :keyword
  belongs_to :subreddit
end

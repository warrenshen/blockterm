# == Schema Information
#
# Table name: subreddits
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  description :string           default(""), not null
#  start_date  :date             not null
#  blob        :string           default("{}"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_subreddits_on_name  (name) UNIQUE
#

class Subreddit < ApplicationRecord
  has_many :comment_counts
  has_many :post_counts
  has_many :subscription_counts

  def display_name
    '/r/' + name
  end
end

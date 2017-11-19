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
  has_many :active_user_counts
  has_many :comment_counts
  has_many :post_counts
  has_many :subscription_counts
  has_many :subreddit_tokens
  has_many :tokens, through: :subreddit_tokens

  def display_name
    '/r/' + name
  end

  def subreddit_blob
    SubredditBlob.new(blob)
  end

  def update_blob_attribute(attribute, value)
    blob_object = subreddit_blob
    blob_object.update_attribute(attribute, value)
    update_attribute(:blob, blob_object.serialize)
  end
end

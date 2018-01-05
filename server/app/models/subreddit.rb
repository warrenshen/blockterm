# == Schema Information
#
# Table name: subreddits
#
#  id                :integer          not null, primary key
#  name              :string           not null
#  description       :string           default(""), not null
#  start_date        :date             not null
#  blob              :string           default("{}"), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  image_url         :string           default(""), not null
#  subscriber_count  :integer
#  active_user_count :integer
#  post_count        :integer
#  comment_count     :integer
#
# Indexes
#
#  index_subreddits_on_name  (name) UNIQUE
#

class Subreddit < ApplicationRecord
  has_many :active_user_counts
  has_many :comment_counts
  has_many :mention_counts
  has_many :post_counts
  has_many :subscriber_counts
  has_many :subreddit_tokens
  has_many :tokens, through: :subreddit_tokens

  validates :name, presence: true, uniqueness: { case_sensitive: false }

  def blob_camel_case
    subreddit_blob.camel_case_serialize
  end

  def display_name
    'r/' + name
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

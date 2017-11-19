# == Schema Information
#
# Table name: tokens
#
#  id         :integer          not null, primary key
#  short_name :string           not null
#  long_name  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  image_url  :string           default(""), not null
#  website    :string           default(""), not null
#
# Indexes
#
#  index_tokens_on_short_name  (short_name) UNIQUE
#

class Token < ApplicationRecord
  has_many :keywords
  has_many :subreddit_tokens
  has_many :subreddits, through: :subreddit_tokens
end

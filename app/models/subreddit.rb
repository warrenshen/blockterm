# == Schema Information
#
# Table name: subreddits
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_subreddits_on_name  (name) UNIQUE
#

class Subreddit < ApplicationRecord
end

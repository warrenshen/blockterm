# == Schema Information
#
# Table name: subreddits
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Subreddit < ApplicationRecord
end

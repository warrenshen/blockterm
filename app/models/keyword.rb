# == Schema Information
#
# Table name: keywords
#
#  id         :integer          not null, primary key
#  token_id   :integer          not null
#  word       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_keywords_on_token_id  (token_id)
#
# Foreign Keys
#
#  fk_rails_...  (token_id => tokens.id)
#

class Keyword < ApplicationRecord
  belongs_to :token
  has_many :mention_counts
end

# == Schema Information
#
# Table name: tokens
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_tokens_on_name  (name) UNIQUE
#

class Token < ApplicationRecord
end

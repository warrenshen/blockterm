# == Schema Information
#
# Table name: token_users
#
#  id         :integer          not null, primary key
#  token_id   :integer          not null
#  user_id    :integer          not null
#  index      :integer          default(0), not null
#  amount     :decimal(, )      default(0.0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_token_users_on_token_id           (token_id)
#  index_token_users_on_user_id            (user_id)
#  index_token_users_on_user_id_and_index  (user_id,index) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (token_id => tokens.id)
#  fk_rails_...  (user_id => users.id)
#

class TokenUser < ApplicationRecord
  belongs_to :token
  belongs_to :user

  validates :token_id, uniqueness: { scope: :user_id }
  validates :index, uniqueness: { scope: :user_id }
end

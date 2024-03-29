# == Schema Information
#
# Table name: token_users
#
#  id                :integer          not null, primary key
#  token_id          :integer
#  user_id           :integer          not null
#  index             :integer          default(0), not null
#  amount            :decimal(, )      default(0.0), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  token_exchange_id :integer
#
# Indexes
#
#  index_token_users_on_token_exchange_id  (token_exchange_id)
#  index_token_users_on_token_id           (token_id)
#  index_token_users_on_user_id            (user_id)
#  index_token_users_on_user_id_and_index  (user_id,index) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (token_exchange_id => token_exchanges.id)
#  fk_rails_...  (token_id => tokens.id)
#  fk_rails_...  (user_id => users.id)
#

class TokenUser < ApplicationRecord
  belongs_to :token
  belongs_to :token_exchange
  belongs_to :user

  validates :token_exchange_id, presence: true,
                                uniqueness: { scope: :user_id }
  validates :index, uniqueness: { scope: :user_id }
end

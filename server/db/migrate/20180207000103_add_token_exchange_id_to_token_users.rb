class AddTokenExchangeIdToTokenUsers < ActiveRecord::Migration[5.0]
  def change
    add_reference :token_users, :token_exchange, foreign_key: true
  end
end

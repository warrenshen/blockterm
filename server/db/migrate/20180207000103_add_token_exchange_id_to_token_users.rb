class AddTokenExchangeIdToTokenUsers < ActiveRecord::Migration[5.0]
  def change
    add_reference :token_users, :token_exchange, foreign_key: true

    TokenUser.all.each do |token_user|
      token_exchange = TokenExchange.find_by(
        exchange: 'coinmarketcap',
        token_id: token_user.token_id,
      )
      token_user.update_attributes(token_exchange_id: token_exchange.id)
    end
  end
end

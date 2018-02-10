class CreateTokenExchanges < ActiveRecord::Migration[5.0]
  def change
    create_table :token_exchanges do |t|
      t.belongs_to :token, foreign_key: true
      t.integer :exchange, null: false
      t.string :identifier, null: false
      t.decimal :price_usd, default: 0, null: false
      t.decimal :price_btc, default: 0, null: false
      t.decimal :price_eth, default: 0, null: false
      t.decimal :percent_change_1h, default: 0, null: false
      t.decimal :percent_change_24h, default: 0, null: false
      t.decimal :percent_change_7d, default: 0, null: false
      t.timestamps

      t.index [:exchange, :identifier], unique: true
    end

    Token.all.each do |token|
      TokenExchange.create(
        token_id: token.id,
        exchange: 'coinmarketcap',
        identifier: token.identifier,
      )
    end
  end
end

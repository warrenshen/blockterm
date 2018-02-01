class CreatePortfolioTickers < ActiveRecord::Migration[5.0]
  def change
    create_table :portfolio_tickers do |t|
      t.belongs_to :user, foreign_key: true, null: false
      t.decimal :value_usd, null: false
      t.decimal :value_btc, null: false
      t.decimal :value_eth, null: false
      t.datetime :timestamp, null: false
      t.timestamps

      t.index [:user_id, :timestamp], unique: true
    end
  end
end

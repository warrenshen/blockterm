class CreateMarketTickers < ActiveRecord::Migration[5.0]
  def change
    create_table :market_tickers do |t|
      t.belongs_to :market, foreign_key: true, null: false
      t.decimal :value, null: false
      t.datetime :timestamp, null: false
      t.timestamps
    end
  end
end

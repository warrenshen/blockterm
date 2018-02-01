class AddMarketIdTimestampIndexToMarketTickers < ActiveRecord::Migration[5.0]
  def change
    add_index :market_tickers, [:market_id, :timestamp]
  end
end

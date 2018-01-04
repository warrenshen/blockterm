class AddColumnsToToken < ActiveRecord::Migration[5.0]
  def change
    add_column :tokens, :price_usd, :decimal, default: 0, null: false
    add_column :tokens, :price_btc, :decimal, default: 0, null: false
    add_column :tokens, :volume_usd_24h, :decimal, default: 0, null: false
    add_column :tokens, :market_cap_usd, :decimal, default: 0, null: false
    add_column :tokens, :available_supply, :decimal, default: 0, null: false
    add_column :tokens, :total_supply, :decimal, default: 0, null: false
    add_column :tokens, :max_supply, :decimal, default: 0, null: false
    add_column :tokens, :percent_change_1h, :decimal, default: 0, null: false
    add_column :tokens, :percent_change_24h, :decimal, default: 0, null: false
    add_column :tokens, :percent_change_7d, :decimal, default: 0, null: false
  end
end

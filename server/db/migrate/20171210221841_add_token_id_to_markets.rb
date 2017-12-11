class AddTokenIdToMarkets < ActiveRecord::Migration[5.0]
  def change
    add_reference :markets, :token, foreign_key: true
  end
end

class CreateExchangeKeys < ActiveRecord::Migration[5.0]
  def change
    create_table :exchange_keys do |t|
      t.belongs_to :user, foreign_key: true, null: false
      t.integer :exchange, null: false
      t.integer :status, default: 0, null: false
      t.string :api_key, null: false
      t.string :secret_key, null: false
      t.timestamps
    end
  end
end

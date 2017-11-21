class CreateTokens < ActiveRecord::Migration[5.0]
  def change
    create_table :tokens do |t|
      t.string :short_name, null: false
      t.string :long_name, null: false
      t.timestamps

      t.index :short_name, unique: true
    end
  end
end

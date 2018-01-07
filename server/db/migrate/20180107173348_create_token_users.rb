class CreateTokenUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :token_users do |t|
      t.belongs_to :token, foreign_key: true, null: false
      t.belongs_to :user, foreign_key: true, null: false
      t.integer :index, default: 0, null: false
      t.decimal :amount, default: 0, null: false
      t.timestamps
    end
  end
end

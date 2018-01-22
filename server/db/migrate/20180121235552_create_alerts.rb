class CreateAlerts < ActiveRecord::Migration[5.0]
  def change
    create_table :alerts do |t|
      t.belongs_to :user, foreign_key: true, null: false
      t.string :identifier, null: false
      t.datetime :expires_at, null: false
      t.timestamps

      t.index [:user_id, :expires_at]
    end
  end
end

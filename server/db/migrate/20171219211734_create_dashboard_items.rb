class CreateDashboardItems < ActiveRecord::Migration[5.0]
  def change
    create_table :dashboard_items do |t|
      t.belongs_to :user, foreign_key: true, null: false
      t.string :identifier, null: false
      t.integer :w, default: 0, null: false
      t.integer :h, default: 0, null: false
      t.integer :x, default: 0, null: false
      t.integer :y, default: 0, null: false
      t.timestamps
    end
  end
end

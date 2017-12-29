class CreateDashboardPages < ActiveRecord::Migration[5.0]
  def change
    create_table :dashboard_pages do |t|
      t.belongs_to :user, foreign_key: true, null: false
      t.integer :index, default: 0, null: false
      t.string :name, default: '', null: false
      t.timestamps
    end
  end
end

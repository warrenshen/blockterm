class AddStaticToDashboardItems < ActiveRecord::Migration[5.0]
  def change
    add_column :dashboard_items, :static, :boolean, null: false, default: false
  end
end

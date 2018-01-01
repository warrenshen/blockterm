class AddDashboardPageIdToDashboardItems < ActiveRecord::Migration[5.0]
  def change
    add_reference :dashboard_items, :dashboard_page, foreign_key: true, null: false
  end
end

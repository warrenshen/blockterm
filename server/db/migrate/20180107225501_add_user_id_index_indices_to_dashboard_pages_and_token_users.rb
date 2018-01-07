class AddUserIdIndexIndicesToDashboardPagesAndTokenUsers < ActiveRecord::Migration[5.0]
  def change
    add_index :dashboard_pages, [:user_id, :index], unique: true
    add_index :token_users, [:user_id, :index], unique: true
  end
end

class AddConfirmEmailAndResetPasswordColumnsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :confirmation_token, :string
    add_column :users, :confirmation_sent_at, :datetime
    add_column :users, :confirmed_at, :datetime
    add_column :users, :reset_password_token, :string
    add_column :users, :reset_password_sent_at, :datetime
    add_column :users, :active_count, :integer, default: 0, null: false
  end
end

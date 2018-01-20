class AddLastActiveAtToUsers < ActiveRecord::Migration[5.0]
  def self.up
    add_column :users, :last_active_at, :datetime

    User.all.each do |user|
      user.update_attribute(:last_active_at, user.created_at)
    end

    change_column :users, :last_active_at, :datetime, null: false
  end

  def self.down
    remove_column :users, :last_active_at, :datetime, null: false
  end
end

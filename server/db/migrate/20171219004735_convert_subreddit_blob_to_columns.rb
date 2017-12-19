class ConvertSubredditBlobToColumns < ActiveRecord::Migration[5.0]
  def change
    add_column :subreddits, :active_user_count, :integer
    add_column :subreddits, :comment_count, :integer
    add_column :subreddits, :post_count, :integer
    add_column :subreddits, :subscriber_count, :integer
  end
end

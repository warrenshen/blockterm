class AddImageUrlToSubreddits < ActiveRecord::Migration[5.0]
  def change
    add_column :subreddits, :image_url, :string, null: false, default: ''
  end
end

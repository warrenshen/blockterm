class CreateCommentCounts < ActiveRecord::Migration[5.0]
  def change
    create_table :comment_counts do |t|
      t.belongs_to :subreddit, foreign_key: true, null: false
      t.datetime :timestamp, limit: 6, null: false
      t.integer :count, default: 0, null: false
      t.timestamps

      t.index [:subreddit_id, :timestamp], unique: true
    end
  end
end

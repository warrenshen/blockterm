class CreateMentionCounts < ActiveRecord::Migration[5.0]
  def change
    create_table :mention_counts do |t|
      t.belongs_to :keyword, foreign_key: true, null: false
      t.belongs_to :subreddit, foreign_key: true, null: false
      t.datetime :timestamp, limit: 6, null: false
      t.integer :count, default: 0, null: false
      t.timestamps
    end
  end
end

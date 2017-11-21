class CreateSubredditTokens < ActiveRecord::Migration[5.0]
  def change
    create_table :subreddit_tokens do |t|
      t.belongs_to :subreddit, foreign_key: true, null: false
      t.belongs_to :token, foreign_key: true, null: false
      t.timestamps
    end
  end
end

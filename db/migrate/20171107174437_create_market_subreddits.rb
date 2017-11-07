class CreateMarketSubreddits < ActiveRecord::Migration[5.0]
  def change
    create_table :market_subreddits do |t|
      t.belongs_to :market, null: false
      t.belongs_to :subreddit, null: false
      t.timestamps

      t.index [:market_id, :subreddit_id], unique: true
    end
  end
end

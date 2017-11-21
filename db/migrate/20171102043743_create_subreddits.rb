class CreateSubreddits < ActiveRecord::Migration[5.0]
  def change
    create_table :subreddits do |t|
      t.string :name, null: false
      t.string :description, null: false, default: ''
      t.date :start_date, null: false
      t.string :blob, null: false, default: '{}'
      t.timestamps

      t.index :name, unique: true
    end
  end
end

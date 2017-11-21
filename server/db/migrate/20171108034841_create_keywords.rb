class CreateKeywords < ActiveRecord::Migration[5.0]
  def change
    create_table :keywords do |t|
      t.belongs_to :token, foreign_key: true, null: false
      t.string :word, null: false
      t.timestamps
    end
  end
end

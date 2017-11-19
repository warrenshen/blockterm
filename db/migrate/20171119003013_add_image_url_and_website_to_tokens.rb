class AddImageUrlAndWebsiteToTokens < ActiveRecord::Migration[5.0]
  def change
    add_column :tokens, :image_url, :string, null: false, default: ''
    add_column :tokens, :website, :string, null: false, default: ''
  end
end

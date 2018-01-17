class AddIdentifierToAndChangeIndexOfTokens < ActiveRecord::Migration[5.0]
  def change
    add_column :tokens, :identifier, :string
    remove_index :tokens, :short_name
    add_index :tokens, :identifier
  end
end

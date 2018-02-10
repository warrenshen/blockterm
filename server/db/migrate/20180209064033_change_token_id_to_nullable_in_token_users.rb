class ChangeTokenIdToNullableInTokenUsers < ActiveRecord::Migration[5.0]
  def change
    change_column_null :token_users, :token_id, true
  end
end

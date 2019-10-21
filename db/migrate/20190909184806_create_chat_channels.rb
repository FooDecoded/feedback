class CreateChatChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :chat_channels do |t|
      t.integer :first_member_id, null: false
      t.integer :second_member_id, null: false
      t.integer :workspace_id, null: false

      t.index :first_member_id
      t.index :second_member_id
      t.index :workspace_id
      t.index [:first_member_id, :second_member_id, :workspace_id] ,unique: true, name: 'unique_chat'
      t.timestamps
    end
  end
end

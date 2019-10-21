class CreateChatMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :chat_messages do |t|
      t.string :body, null: false
      t.integer :author_id, null: false
      t.integer :chat_channel_id, null: false
      t.boolean :liked, default: false

      t.index :author_id
      t.index :chat_channel_id
      t.timestamps
    end
  end
end

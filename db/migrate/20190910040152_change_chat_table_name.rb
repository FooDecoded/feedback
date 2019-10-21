class ChangeChatTableName < ActiveRecord::Migration[5.2]
  def change
    rename_table :chat_channels, :chats
  end
end

class ModifyChatTable < ActiveRecord::Migration[5.2]
  def change
    # t.index ["first_member_id"], name: "index_chats_on_first_member_id"
    # t.index ["second_member_id"], name: "index_chats_on_second_member_id"
    # t.index ["workspace_id"], name: "index_chats_on_workspace_id"
    remove_index :chats, name: "index_chats_on_first_member_id"
    remove_index :chats, name: "index_chats_on_second_member_id"
    remove_index :chats, name: "index_chats_on_workspace_id"
  end
end

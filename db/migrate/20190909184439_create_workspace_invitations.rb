class CreateWorkspaceInvitations < ActiveRecord::Migration[5.2]
  def change
    create_table :workspace_invitations do |t|
      t.integer :workspace_id, null: false
      t.string :email, null: false

      t.index [:workspace_id, :email], unique: true
      t.timestamps
    end
  end
end

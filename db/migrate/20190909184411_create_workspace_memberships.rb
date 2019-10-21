class CreateWorkspaceMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :workspace_memberships do |t|
      t.integer :workspace_id, null: false
      t.integer :member_id, null: false
      t.boolean :admin, default: false

      t.index :workspace_id
      t.index :member_id
      t.index [:member_id, :workspace_id], unique: true
      t.timestamps
    end
  end
end

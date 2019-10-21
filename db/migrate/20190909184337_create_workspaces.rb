class CreateWorkspaces < ActiveRecord::Migration[5.2]
  def change
    create_table :workspaces do |t|
      t.string :name, null: false
      t.integer :owner_id, null: false

      t.index :owner_id
      t.index :name, unique: true
      t.timestamps
    end
  end
end

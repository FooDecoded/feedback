class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.integer :workspace_id, null: false
      t.integer :owner_id, null: false
      t.boolean :public, default: false

      t.index :workspace_id
      t.index :owner_id
      t.index [:workspace_id, :name], unique: true
      t.timestamps
    end
  end
end

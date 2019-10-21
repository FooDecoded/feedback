class CreateChannelMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :channel_memberships do |t|
      t.integer :channel_id, null: false
      t.integer :member_id, null: false
      t.boolean :admin, default: false

      t.index :channel_id
      t.index :member_id
      t.index [:channel_id, :member_id], unique: true, name: "unique memberships"
      t.timestamps
    end
  end
end

class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :body, null: false
      t.integer :channel_id, null: false
      t.integer :author_id, null: false

      t.index :author_id
      t.index :channel_id
      t.timestamps
    end
  end
end

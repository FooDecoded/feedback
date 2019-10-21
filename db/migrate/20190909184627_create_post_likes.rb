class CreatePostLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :post_likes do |t|
      t.integer :post_id, null: false
      t.integer :member_id, null: false

      t.index [:member_id, :post_id], unique: true
      t.timestamps
    end
  end
end

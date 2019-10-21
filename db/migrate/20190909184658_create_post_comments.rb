class CreatePostComments < ActiveRecord::Migration[5.2]
  def change
    create_table :post_comments do |t|
      t.string :body, null: false
      t.integer :post_id, null: false
      t.integer :author_id, null: false

      t.index :post_id
      t.index :author_id
      t.timestamps
    end
  end
end

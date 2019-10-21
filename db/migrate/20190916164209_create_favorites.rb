class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.integer :member_id, null: false
      t.references :favorited, polymorphic: true
      t.index [:member_id, :favorited_id, :favorited_type], unique: true, name: "ensure uniquess"
      t.timestamps
    end
  end
end

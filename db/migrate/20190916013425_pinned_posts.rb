class PinnedPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :pinned, :boolean, default: false
  end
end

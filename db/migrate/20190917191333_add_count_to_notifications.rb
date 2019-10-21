class AddCountToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :channel_memberships, :unread_count, :integer, default: 0
  end
end

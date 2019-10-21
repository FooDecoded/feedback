# == Schema Information
#
# Table name: channels
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  workspace_id :integer          not null
#  owner_id     :integer          not null
#  public       :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Channel < ApplicationRecord
    validates :workspace_id, :name, presence: true
    validates :workspace_id, uniqueness: { scope: :name }
    validates :public, inclusion: [true, false] 

    after_commit :subscribe_owner

    def subscribe_owner
        ChannelMembership.create(channel_id: self.id, member_id: self.owner_id, admin: true )
    end

    belongs_to :workspace,
        foreign_key: :workspace_id,
        class_name: :Workspace

    has_many :posts,
        foreign_key: :channel_id,
        class_name: :Post
    
    has_many :channel_memberships,
        foreign_key: :channel_id,
        class_name: :ChannelMembership 

    has_many :members,
        through: :channel_memberships

    ## How to get the admins in here
    # has_many :admins,
    #     through: :thread_channel_memberships,
    #     -> { where(admin: true) }

    # Not the most optimal way of doing it , How can we make joins at the same query
    def self.available_channels(member_id, workspace_id)
        private_channels = Channel.where(workspace_id: workspace_id)
        joins(:channel_memberships)
        .where(:channel_memberships => {member_id: member_id})

        public_channels = Channel.where(public: true)
        
        return private_channels + public_channels
    end
end

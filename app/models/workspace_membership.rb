# == Schema Information
#
# Table name: workspace_memberships
#
#  id           :bigint           not null, primary key
#  workspace_id :integer          not null
#  member_id    :integer          not null
#  admin        :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class WorkspaceMembership < ApplicationRecord
    validates :workspace_id, :member_id, presence: true
    validates :member_id, uniqueness: { scope: :workspace_id }
    validates :admin, inclusion: [true, false] 
    after_commit :add_user_to_public_channels


    # How to optimize this to make a single query instead of (N+1)
    def add_user_to_public_channels # working
        public_channels_ids = Channel.where("workspace_id = #{self.workspace_id} AND public = #{true}").pluck(:id)
        public_channels_ids.each do |channel_id|
            ChannelMembership.create(channel_id: channel_id, member_id: self.member_id)
        end
    end

    belongs_to :workspace,
        foreign_key: :workspace_id,
        class_name: :Workspace

    belongs_to :member,
    foreign_key: :member_id,
    class_name: :User

    has_many :channels,
        through: :workspace
end

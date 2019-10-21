# == Schema Information
#
# Table name: workspaces
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  owner_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Workspace < ApplicationRecord
    validates :name, :owner_id, presence: true
    validates :name, uniqueness: true

    after_commit :add_owner_to_membership

    def add_owner_to_membership ## working
        WorkspaceMembership.create(workspace_id: self.id, member_id: self.owner_id, admin: true)
    end

    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User

    has_many :workspace_memberships,
        foreign_key: :workspace_id,
        class_name: :WorkspaceMembership

    has_many :members,
        through: :workspace_memberships

    has_many :channels,
        foreign_key: :workspace_id,
        class_name: :Channel

    def admins # Needs testing // it returns back active_record relation
        Workspace.joins(:members).where(:members => {admin: true})
    end

    def is_owner(owner_id) ## Working
        self.owner_id == owner_id
    end

    def self.find_avilable_workspaces(user_id) # Needs Testing
        Workspace.joins(:workspace_memberships).where(:workspace_memberships => {member_id: user_id})
    end
end

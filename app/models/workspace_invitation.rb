# == Schema Information
#
# Table name: workspace_invitations
#
#  id           :bigint           not null, primary key
#  workspace_id :integer          not null
#  email        :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class WorkspaceInvitation < ApplicationRecord
    validates :workspace_id, :email, null: false
end

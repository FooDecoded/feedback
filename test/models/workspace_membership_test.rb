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

require 'test_helper'

class WorkspaceMembershipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

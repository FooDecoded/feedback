# == Schema Information
#
# Table name: channel_memberships
#
#  id         :bigint           not null, primary key
#  channel_id :integer          not null
#  member_id  :integer          not null
#  admin      :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class ChannelMembershipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: chat_channels
#
#  id               :bigint           not null, primary key
#  first_member_id  :integer          not null
#  second_member_id :integer          not null
#  workspace_id     :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

require 'test_helper'

class ChatChannelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

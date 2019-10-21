# == Schema Information
#
# Table name: chat_messages
#
#  id              :bigint           not null, primary key
#  body            :string           not null
#  author_id       :integer          not null
#  chat_channel_id :integer          not null
#  liked           :boolean          default(FALSE)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'test_helper'

class ChatMessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: favorites
#
#  id             :bigint           not null, primary key
#  member_id      :integer          not null
#  favorited_type :string
#  favorited_id   :bigint
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class FavoriteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

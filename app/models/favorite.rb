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

class Favorite < ApplicationRecord
    belongs_to :favorited, polymorphic: true
end

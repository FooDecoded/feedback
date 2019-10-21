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

class ChannelMembership < ApplicationRecord
    validates :channel_id, :member_id, null: false
    validates :admin, inclusion: [true, false]

    belongs_to :channel,
        foreign_key: :channel_id,
        class_name: :Channel

    belongs_to :member,
        foreign_key: :member_id,
        class_name: :User    
end

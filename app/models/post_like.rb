# == Schema Information
#
# Table name: post_likes
#
#  id         :bigint           not null, primary key
#  post_id    :integer          not null
#  member_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PostLike < ApplicationRecord
    validates :post_id, :member_id, presence: true
    validates :member_id, uniqueness: { scope: :post_id }

    # belongs_to :post,
    #     foreign_key: :post_id,
    #     class_name: :Post

    # belongs_to :liker,
    #     foreign_key: :member_id,
    #     class_name: :User
end

# == Schema Information
#
# Table name: post_comments
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  post_id    :integer          not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PostComment < ApplicationRecord
    validates :body, :post_id, :author_id, presence: true

    belongs_to :post,
        foreign_key: :post_id,
        class_name: :Post

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
    # Not sure
    # belongs_to :parent_comment,
    #     foreign_key: :parent_comment_id,
    #     class_name: :PostComment

    # Only one level of nesting
    # has_many :comments,
    #     foreign_key: :parent_comment_id,
    #     class_name: :PostComment
end

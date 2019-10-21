# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  channel_id :integer          not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  pinned     :boolean          default(FALSE)
#

class Post < ApplicationRecord
    validates :body, :channel_id, presence: true

    scope :text_like, -> (text) { where("body like ?", "%#{text}%") }
    scope :created_before, -> (before) { where("created_at <= ", "#{before}") }
    scope :created_after, -> (after) { where("created_at >= ?", "#{after}") }
    scope :created_by, -> (author_id) { where("author_id = #{author_id}")}
    scope :inside_channel, -> (channel_id) { where("channel_id = #{channel_id}")}

    has_many :comments,
        foreign_key: :post_id,
        class_name: :PostComment

    belongs_to :channel,
        foreign_key: :channel_id,
        class_name: :Channel

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    has_many :likes,
        foreign_key: :post_id,
        class_name: :PostLike   

    # has_many :favorites, as :favorited
    # has_many 
    has_many :favorites,
        class_name: :Favorite,
        as: :favortited
end

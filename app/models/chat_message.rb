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

class ChatMessage < ApplicationRecord
    validates :body, :author_id, :chat_channel_id ,presence: true
    validates :liked, inclusion: [true, false]

    belongs_to :chat_channel,
        foreign_key: :chat_channel_id,
        class_name: :Chat

    belongs_to :author,
        foreign_key: :author_id ,
        class_name: :User

    # has_many :favorites, as :favorited

end

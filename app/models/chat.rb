# == Schema Information
#
# Table name: chats
#
#  id               :bigint           not null, primary key
#  first_member_id  :integer          not null
#  second_member_id :integer          not null
#  workspace_id     :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Chat < ApplicationRecord
    validates :first_member_id , :second_member_id, :workspace_id, presence: true
    validates :first_member_id , uniqueness: { scope: [:workspace_id, :second_member_id] }
    
    # # belongs_to :first_member,
    # #     foreign_key: :first_member_id,
    # #     class_name: :User

    # # belongs_to :second_member,
    # #     foreign_key: :second_member_id,
    # #     class_name: :User

    # # belongs_to :workspace,
    # #     foreign_key: :workspace_id,
    # #     class_name: :Workspace

    has_many :messages,
        foreign_key: :chat_channel_id,
        class_name: :ChatMessage

    # Really Interesting one
    # How to get it optiamized
    #
    def self.all_messages(user_id, workspace_id) # Not tested
        # ChatMessage.where
        # chat_channels =  # include the messages
        # messages = chat_channels.each # sort them based on creation date
        result = {
            messages: {

            },
            receivers_id: {
                
            }
        }
        Chat.includes(:messages).where("workspace_id = #{workspace_id}").where("first_member_id = #{user_id} OR second_member_id=#{user_id}")     
        .each do |chat|
            # debugger
            result[:messages][chat.id] = ChatMessage.where("chat_channel_id = #{chat.id}")
            .limit(10).order(created_at: :desc)
            .reverse.as_json(only: [:id, :body, :author_id, :chat_channel_id, :liked])
            other_user_id = chat.first_member_id == user_id ? chat.second_member_id : chat.first_member_id
            result[:receivers_id][other_user_id] = chat.id
        end
        return result
    end

    # Really Interesting one
    # def self.all_messages_for_user(user1_id, user2_id)
    #     Chat.where("first_member_id = #{user1_id} OR second_member_id = #{user1_id} OR first_member_id = #{user2_id} OR second_member_id=#{user2_id}")
    # end
end

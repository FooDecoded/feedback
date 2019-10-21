class Api::MessagesController < ApplicationController
    before_action :require_logged_in

    def index # working
        @chats = Chat.all_messages(current_user.id, messages_params[:workspace_id])
        render json: @chats
    end

    def create
        @message = ChatMessage.new(messages_params)
        @message.author_id = current_user.id
        if @message.save
            Api::MessagesController.broadcast_message(@message, @message.chat_channel_id)
        else
            render json: @message.errors.full_messages
        end
    end

    def create_chat
        @chat = Chat.new(first_member_id: current_user.id, second_member_id: messages_params[:receiver_id], workspace_id: messages_params[:workspace_id])
        # debugger
        if @chat.save
            render :create_chat
        else
            render json: @chat.errors.full_messages, status: 404
        end
    end

    # not tested yet
    def fetch_messages_before
        ChatMessage.where("chat_channel_id = #{messages_params[:chat_channel_id]} and created_at < #{messages_params[:time]}")
        render :index
    end

    def self.broadcast_message(message, channel_id)
        json = ApplicationController.render(partial: 'api/messages/message.json', locals: {message: message})
        ActionCable.server
        .broadcast("chat_channel_#{channel_id}", 
        JSON.parse(json)
        )
    end

    def messages_params
        params.require(:message).permit(:body, :chat_channel_id, :time, :workspace_id, :receiver_id, :workspace_id)
    end
end

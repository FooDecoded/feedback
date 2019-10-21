class ChatChannel < ApplicationCable::Channel
  def subscribed
    # debugger
    stream_from "chat_channel_#{params[:channel_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

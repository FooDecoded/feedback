class PostChannel < ApplicationCable::Channel
  def subscribed
    # debugger
    stream_from "post_channel_#{params[:channel_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

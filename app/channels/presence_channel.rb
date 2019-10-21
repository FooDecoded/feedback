class PresenceChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "presence_channel"
    @user = User.find(params[:user_id])
    @user.online = true
    @user.save
    ActionCable.server.broadcast("presence_channel", {online: true , userId: params[:user_id]})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    # debugger
    @user = User.find(params[:user_id])
    @user.online = false
    @user.save
    ActionCable.server.broadcast("presence_channel", {online: false , userId: params[:user_id]})
  end
end

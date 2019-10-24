class Api::ChannelsController < ApplicationController
    before_action :require_logged_in
    before_action :is_channel_admin, only:[:add_user]

    def is_channel_admin # working only for the owner
        unless Channel.find(params[:channel_id]).owner_id == current_user.id
            render json: ["unathorized access"], status: 404
        end
    end

    def add_user
        @channel_membership = ChannelMembership.find_by(channel_id: channel_params[:channel_id], member_id: channel_params[:member_id])
        if @channel_membership
            @channel_membership.destroy
            render json: { deleted: true, channelId: @channel_membership.channel_id, userId: @channel_membership.member_id }
        else
            @membership = ChannelMembership.create(channel_params)
            render json: {channelId: @membership.channel_id, userId: @membership.member_id}
        end
    end

    def create # working
        @channel = Channel.new(channel_params);
        @channel.owner_id = current_user.id
        # debugger
        @channel.members = []
        if @channel.save
            render :show
        else
            render @channel.errors.full_messages, status: 404
        end
    end

    # How to not do (N + 1)
    def index # working
        @members = {}
        @channels = User.find(current_user.id).channels

        @channels.each do |channel|
            @members[channel.id] = channel.members
        end

        @members.keys.each do |channel_id|
            @members[channel_id] = @members[channel_id].map do |user|
                user.id
            end
        end
    end

    def channel_params
        params.require(:channel).permit(:workspace_id, :name, :public, :channel_id, :member_id)
    end
end

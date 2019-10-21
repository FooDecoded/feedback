class Api::WorkspacesController < ApplicationController

    before_action :require_logged_in
    before_action :is_owner, only: [:add_user, :add_admin, :add_invitation]

    def is_owner # Not Tested
        # debugger
        @workspace = Workspace.find(params[:workspace_id]).is_owner(current_user.id)
        unless @workspace
            render json: ["unauthorized user"]
        end
    end

    def create #working
        @workspace = Workspace.new(name: workspace_params[:name], owner_id: current_user.id)
        if @workspace.save
            render :show
        else
            render @workspace.errors.full_messages, status: 404
        end
    end

    def index #working
        @workspaces = Workspace.find_avilable_workspaces(current_user.id)
    end

    # @posts = Post.includes(:comments).joins(channel: :channel_memberships)
    # .where("channel_memberships.member_id = #{current_user.id}").each do |post|
    #     # respond[:posts][post.channel.id] = {} unless respond[:posts][post.channel.id]
    #     respond[:posts][post.channel.id] ||= []
    #     respond[:posts][post.channel.id].push(post)
    #     if post.comments.length != 0
    #         respond[:comments][post.id] ||= post.comments
    #     end
    # end

    # Bonus
    def add_user #working
        # debugger
        @membership = WorkspaceMembership.new(workspace_params)
        debugger
        if @membership.save
            render json: {}
        else
            render @membership.errors.full_messages, status: 404
        end

        # with invitation / not tested
        # unless WorkspaceInvitation.find_by(workspace_id: params[:workspace_id], email: workspace_params[:email])
        #     WorkspaceInvitation.create(workspace_id: params[:workspace_id], email: workspace_params[:email])
        # end
        # render json: {}
    end

    def add_invitation
        # debugger
        @invitation = WorkspaceInvitation.create(workspace_params)
        if @invitation.save
            render json: @invitation
        else
            render @invitation.errors.full_messages, status: 404
        end
    end

    #Bonus // Make remove admin
    def set_admin
        @workspace_membership = WorkspaceMembership.includes(:member)
        .find_by(member_id: workspace_params[:member_id], workspace_id: workspace_params[:workspace_id])

        # if @workspace_membership.admin
        #     @workspace_membership.update(admin: !@workspace_membership.admin)
        #     @user = @workspace_membership.member
        #     render json: {memberId: @user.id, workspaceId: @workspace_membership.workspace_id, admin: @workspace_membership.admin}
        # else
            @workspace_membership.update(admin: !@workspace_membership.admin)
            @user = @workspace_membership.member
            render json: {memberId: @user.id, workspaceId: @workspace_membership.workspace_id, admin: @workspace_membership.admin}
        # end
        # else
        #     render @workspace_membership.errors.full_messages, status: 404
        # end
    end

    def invitations
        # debugger
        @invitations = WorkspaceInvitation.where(workspace_id: params[:workspace_id])
        # debugger
        render json: @invitations
    end

    def get_favorites
        # debugger
        @favorited_posts = User.find(current_user.id).favorited_posts
        @favorite_messages = User.find(current_user.id).favorite_messages
        # debugger
        render :favorites
    end

    private 
    def workspace_params
        params.require(:workspace).permit(:name, :owner_id, :workspace_id, :member_id, :email)
    end
end

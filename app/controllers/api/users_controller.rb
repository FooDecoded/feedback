class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params);
        # debugger
        if @user.save
          login(@user)
          # debugger
          @user.check_invitations
          render :show
        else 
          render @user.errors.full_messages
        end
      end
    
      def destroy
        @user = User.find(params[:id])
        if @user.destroy
            render show
        else
            render @user.errors.full_messages
        end
      end

      def index 
        # debugger
        # @users = Workspace.find(params[:workspace_id]).members
        @users = User.find_subscribed_users(params[:workspace_id])
        # debugger
        render :index
      end
    
      private
    
      def user_params
        params.require(:user).permit(:email, :username, :password)
      end
end

class Api::SessionsController < ApplicationController
    def create
        # debugger
         @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
          )
      
          if @user
            login(@user)
            render :show
          else
            # debugger
            # render json: ["wrong credintials"], status: 404    
            render json: {errors: ['wrong user or password']}
          end
      end
      
      def destroy
          if logged_in?
            logout
            render json: {}
          else
            render json: ["some error happend"], status: 404
          end
      end
end

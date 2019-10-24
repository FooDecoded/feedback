Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"
  
  namespace :api, defaults: { format: :json } do
    resources :users 
    resource :session, only: [:create, :destroy] 
    post "create_chat", to: "messages#create_chat"
    resources :workspaces do
      post "add_user", to: "workspaces#add_user"
      post "set_admin", to: "workspaces#set_admin"
      post "add_invitation", to: "workspaces#add_invitation"
      get "invitations", to: "workspaces#invitations"
      get "get_favorites", to: "workspaces#get_favorites"
    end
    resources :channels do
      post "add_user", to: "channels#add_user"
      post "remove_user", to: "channels#remove_user"
    end
    get "more_posts", to: "posts#more_posts"
    get "filtered_posts", to: "posts#filtered_posts"
    post "clear_notifications", to: "posts#clear_notifications"
    resources :posts do
      post "add_comment", to: "posts#add_comment"
      post "add_like", to: "posts#add_like"
      post "pin_post", to: "posts#pin_post"
      post "favorite_post", to: "posts#favorite_post"
    end
    resources :messages do 
      post "favorite_message", to: "messages#favorite_message"
    end
  end
  mount ActionCable.server => "/cable"
end

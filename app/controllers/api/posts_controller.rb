class Api::PostsController < ApplicationController
    before_action :require_logged_in

    def index
        # debugger   

        respond = {
            posts: {},
            comments: {},
            notifications: {},
            likes: {}
        }
        # This shit needs to be redone
        @posts = Post.includes(:comments).joins(channel: :channel_memberships).where("channel_memberships.member_id = #{current_user.id}").order("posts.created_at DESC").limit(40).each do |post|
            # respond[:posts][post.channel.id] = {} unless respond[:posts][post.channel.id]
            respond[:posts][post.channel.id] ||= []
            respond[:posts][post.channel.id].push(post)
            if post.comments.length != 0
                respond[:comments][post.id] ||= post.comments
            end
            if post.likes.length != 0
                respond[:likes][post.id] ||= post.likes
            end
        end
        
        # ChannelMembership.where
        ChannelMembership.where(member_id: current_user.id).each do |membership|
            respond[:notifications][membership.channel_id] = membership.unread_count
        end
        render json: respond
        # How to format it now with objects , how to extract only from array
    end
    

    def more_posts
        respond = {
            posts: [],
            comments: {},
            likes: {}
        }

        if(posts_params[:last_post_id] != "0")
            @posts = Post.includes(:comments, :likes).where("channel_id = #{posts_params[:channel_id]} and created_at < (#{Post.where("id = #{posts_params[:last_post_id]}").select(:created_at).to_sql})")
                .order(:created_at).limit(10).each do |post|
                    respond[:posts].push(post) 
                    if post.comments.length != 0
                        respond[:comments][post.id] ||= post.comments
                    end
                    if post.likes.length != 0
                        respond[:likes][post.id] ||= post.likes
                    end
                end
        else 
            @posts = Post.includes(:comments, :likes).where("channel_id = #{posts_params[:channel_id]}").order(:created_at).limit(10)
            .each do |post|
                    respond[:posts].push(post) 
                    if post.comments.length != 0
                        respond[:comments][post.id] ||= post.comments
                    end
                    if post.likes.length != 0
                        respond[:likes][post.id] ||= post.likes
                    end
            end
        end
        ChannelMembership.where(channel_id: posts_params[:channel_id], member_id: current_user.id).update(unread_count: 0)
        render json: respond
    end

    def clear_notifications
        ChannelMembership.where(channel_id: posts_params[:channel_id], member_id: current_user.id).update(unread_count: 0)
    end


    def create
        @post = Post.new(posts_params)
        @post.author_id = current_user.id
        if @post.save
            ChannelMembership.increment_counter(:unread_count, ChannelMembership.where(channel_id: @post.channel_id).pluck(:id))
            Api::PostsController.broadcast_post(@post, posts_params[:channel_id])
            channel_membership = ChannelMembership.find_by(member_id: current_user.id , channel_id: posts_params[:channel_id])
            channel_membership.unread_count = 0
            channel_membership.save
        else
            render @post.errors.full_messages, status: 404
        end
    end

    def update # not tested
        @post = Post.find(params[:id])
        if @post.update(posts_params)
            Api::PostsController.broadcast_post(@post, @post.channel_id, true)
        else
            render @post.errors.full_messages, status: 404
        end       
    end

    def destroy # not tested
        @post = Post.find(params[:post_id])
        if @post.destroy
            render {}
        else
            render @post.errors.full_messages, status: 404
        end 
    end


    def add_like # Gonna be done with action cable

        @post_like = PostLike.where("member_id = #{ current_user.id} AND post_id = #{params[:post_id]}")

        if @post_like.length == 0
            @post_like = PostLike.new(post_id: params[:post_id], member_id: current_user.id )
            @post_like.save
            render json: { postId: @post_like.post_id, userId: @post_like.member_id }          
        else
            @post_like[0].destroy
            render json: { unliked: true, postId: @post_like[0].post_id, userId: @post_like[0].member_id}
        end

    end

    def add_comment # Gonna be done with action cable
        @comment = PostComment.new(body: posts_params[:body], post_id: posts_params[:post_id])
        @comment.author_id = current_user.id

        if @comment.save
            Api::PostsController.broadcast_comment(@comment, @comment.post.channel.id)
        else
            render @comment.errors.full_messages, status: 404
        end
    end


    def filtered_posts
        filters = filters_params
        if(filters[:source] == "channels")
            @posts = Post.joins(:channel).where("channels.workspace_id = #{filters[:workspace_id]}")
            @posts = @posts.text_like(filters[:text_like]) if filters[:text_like].present? && filters[:text_like] != ""
            @posts = @posts.created_before(filters[:created_before]) if filters[:created_before].present? && filters[:created_before] != ""
            @posts = @posts.created_after(filters[:created_after]) if filters[:created_after].present? && filters[:created_after] != ""
            @posts = @posts.created_by(filters[:created_by]) if filters[:created_by].present? && filters[:created_by] != ""
            @posts = @posts.inside_channel(filters[:source_channel]) if filters[:source_channel].present? && filters[:source_channel] != ""
            render json: @posts
        end
    end

    def fetch_posts_before
        render :index
    end


    def favorite_post
        @post = Post.find(params[:post_id])
        @favorited_post = Favorite.find_by(member_id: current_user.id, favorited_id: params[:post_id], favorited_type: 'Post')
            if @favorited_post
                @favorited_post.destroy
                render json: {unfavorited: true, post_id: params[:post_id]}
            else
                Favorite.create(member_id: current_user.id, favorited_id: params[:post_id], favorited_type: 'Post')
                render :show   
            end

    end

    def filters_params
        params.require(:filters).permit(:text_like, :source_channel, :source, :created_by, :created_before, :created_after, :workspace_id  )
    end

    def posts_params
        params.require(:post).permit( :body, :channel_id, :post_id, :post_id, :last_post_id, :created_at )
    end

    def pin_post
        @post = Post.find(params[:post_id])
        # debugger
        if @post.update(pinned: !@post.pinned)
            render :show
        else
            render @post.errors.full_messages, status: 404
        end
    end


    def self.broadcast_post(post, channel_id, update_broadcast = false)
        json = ApplicationController.render(partial: 'api/posts/post.json', locals: {post: post, update: update_broadcast})

        ActionCable.server
        .broadcast("post_channel_#{channel_id}", 
        JSON.parse(json)
        )
    end

    def self.broadcast_comment(comment, channel_id)
        json = ApplicationController.render(template: 'api/posts/show_comment.json', assigns: {comment: comment})
        # debugger
        ActionCable.server
        .broadcast("post_channel_#{channel_id}", 
        JSON.parse(json)
        )
    end

end

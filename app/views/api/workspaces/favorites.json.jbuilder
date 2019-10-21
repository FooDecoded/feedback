# debugger
# json.posts @favorited_posts
json.posts do
    @favorited_posts.each do |post|
        # debugger
        json.set! post.id, post
    end
end
# debugger
# json.messages @favorite_messages

json.messages do
    @favorite_messages.each do |message|
        # debugger
        json.set! message.id, message
    end
end
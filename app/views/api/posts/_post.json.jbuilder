# json.set! post.id do 
#     json.extract! post, :id, :body, :author_id, :channel_id
#     json.type "post"
# end
json.post do 
    json.extract! post, :id, :body, :author_id, :channel_id, :pinned
end
json.type "post"
if update
    json.update true
else
    json.update false
end
# json.set! @comment.id do 
#     json.extract! @comment, :id, :body, :author_id, :post_id
#     json.type "comment"
# end

json.comment do 
    json.extract! @comment, :id, :body, :author_id, :post_id
end
json.type "comment"
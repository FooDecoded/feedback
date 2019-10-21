# json.set! message.id do 
#     json.extract! message, :id, :body, :author_id, :chat_channel_id, :liked
# end

json.extract! message, :id, :body, :author_id, :chat_channel_id, :liked
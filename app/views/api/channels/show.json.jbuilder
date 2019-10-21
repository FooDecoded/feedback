# json.set! @channel.id do
#     json.extract! @channel, :name, :id
# end

json.extract! @channel, :name, :id, :members, :owner_id
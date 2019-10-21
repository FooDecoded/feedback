# debugger


@channels.each do |channel|
    json.set! channel.id do
        json.extract! channel, :id, :name
        json.members @members[channel[:id]]
        json.ownerId channel.owner_id
    end
end




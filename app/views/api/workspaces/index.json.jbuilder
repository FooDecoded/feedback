@workspaces.each do |workspace|
    json.set! workspace.id do
        json.extract! workspace, :id, :name, :owner_id
    end
end

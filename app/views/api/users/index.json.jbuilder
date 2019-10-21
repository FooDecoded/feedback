@users.each do |item|
    json.set! item[:id] do
        json.extract! item, :id, :username, :profile_image, :admin, :online
    end
end
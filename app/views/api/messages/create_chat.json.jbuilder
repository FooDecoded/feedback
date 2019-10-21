    #  first_member_id  :integer          not null
#  second_member_id :integer          not null
#  workspace_id    
json.extract! @chat, :first_member_id, :second_member_id, :workspace_id, :id
class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :profile_image, default: "https://i.pinimg.com/originals/cd/c8/69/cdc86930243bda2b9c2b6cd1a8ff5ee3.png"
      
      t.timestamps
    end
  end
end

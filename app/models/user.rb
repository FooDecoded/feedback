# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  profile_image   :string           default("https://i.pinimg.com/originals/cd/c8/69/cdc86930243bda2b9c2b6cd1a8ff5ee3.png")
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  online          :boolean          default(FALSE)
#

class User < ApplicationRecord
    validates :email,:username, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6, allow_nil: true}
    attr_reader :password
    
    after_initialize :ensure_session_token

    def check_invitations # working but there is a weird namespace error
        
      WorkspaceInvitation.where(email: self.email).pluck(:workspace_id).each do |id|
        WorkspaceMembership.create(workspace_id: id, member_id: self.id)
        # debugger
        Channel.where("workspace_id = #{id} and public = #{true}").each do |channel|
            channel.channel_memberships.create(channel_id: channel.id, member_id: self.id, admin: false)
        debugger
          end
      end
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
      end
    
    def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil 
    end

    def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
    end

    def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
    end

      # For the Admin
    has_many :owned_workspaces, #working_perfect
    foreign_key: :owner_id,
    class_name: :Workspace

    # For user/admin
    has_many :subscribed_workspaces, #working
    foreign_key: :member_id,
    class_name: :WorkspaceMembership

    has_many :authorded_posts, # working
    foreign_key: :post_id,
    class_name: :Post

    has_many :liked_posts,  # working
    foreign_key: :member_id,
    class_name: :PostLike

    has_many :subscribed_channel_memberships, # working
    foreign_key: :member_id,
    class_name: :ChannelMembership

    has_many :channels, 
    through: :subscribed_channel_memberships

    def chat_channels # Working
    ChatChannel.where("first_member_id = #{self.id} OR second_member_id = #{self.id}")
    end

    def self.find_subscribed_users(workspace_id)
      users = User.joins(:subscribed_workspaces).where("workspace_memberships.workspace_id = #{workspace_id}")
          .pluck("users.id, users.username, users.profile_image, workspace_memberships.admin, users.online")
      users.map {|user_record| {id: user_record[0], username: user_record[1],profile_image: user_record[2] ,admin: user_record[3], online: user_record[4] } } 
    end

    # def self.

    has_many :chat_messages, # working
    foreign_key: :author_id,
    class_name: :ChatMessage

    has_many :favorites,
      class_name: :Favorite,
      foreign_key: :member_id
# favorited_type
    has_many :favorited_posts,
      through: :favorites,
      source: :favorited,
      source_type: :Post

    has_many :favorite_messages,
      through: :favorites,
      source: :favorited,
      source_type: :ChatMessage

end

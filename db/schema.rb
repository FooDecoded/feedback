# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_17_191333) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "channel_memberships", force: :cascade do |t|
    t.integer "channel_id", null: false
    t.integer "member_id", null: false
    t.boolean "admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "unread_count", default: 0
    t.index ["channel_id", "member_id"], name: "unique memberships", unique: true
    t.index ["channel_id"], name: "index_channel_memberships_on_channel_id"
    t.index ["member_id"], name: "index_channel_memberships_on_member_id"
  end

  create_table "channels", force: :cascade do |t|
    t.string "name", null: false
    t.integer "workspace_id", null: false
    t.integer "owner_id", null: false
    t.boolean "public", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_channels_on_owner_id"
    t.index ["workspace_id", "name"], name: "index_channels_on_workspace_id_and_name", unique: true
    t.index ["workspace_id"], name: "index_channels_on_workspace_id"
  end

  create_table "chat_messages", force: :cascade do |t|
    t.string "body", null: false
    t.integer "author_id", null: false
    t.integer "chat_channel_id", null: false
    t.boolean "liked", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_chat_messages_on_author_id"
    t.index ["chat_channel_id"], name: "index_chat_messages_on_chat_channel_id"
  end

  create_table "chats", force: :cascade do |t|
    t.integer "first_member_id", null: false
    t.integer "second_member_id", null: false
    t.integer "workspace_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["first_member_id", "second_member_id", "workspace_id"], name: "unique_chat", unique: true
  end

  create_table "favorites", force: :cascade do |t|
    t.integer "member_id", null: false
    t.string "favorited_type"
    t.bigint "favorited_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["favorited_type", "favorited_id"], name: "index_favorites_on_favorited_type_and_favorited_id"
    t.index ["member_id", "favorited_id", "favorited_type"], name: "ensure uniquess", unique: true
  end

  create_table "post_comments", force: :cascade do |t|
    t.string "body", null: false
    t.integer "post_id", null: false
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_post_comments_on_author_id"
    t.index ["post_id"], name: "index_post_comments_on_post_id"
  end

  create_table "post_likes", force: :cascade do |t|
    t.integer "post_id", null: false
    t.integer "member_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id", "post_id"], name: "index_post_likes_on_member_id_and_post_id", unique: true
  end

  create_table "posts", force: :cascade do |t|
    t.string "body", null: false
    t.integer "channel_id", null: false
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "pinned", default: false
    t.index ["author_id"], name: "index_posts_on_author_id"
    t.index ["channel_id"], name: "index_posts_on_channel_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "profile_image", default: "https://i.pinimg.com/originals/cd/c8/69/cdc86930243bda2b9c2b6cd1a8ff5ee3.png"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "online", default: false
  end

  create_table "workspace_invitations", force: :cascade do |t|
    t.integer "workspace_id", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workspace_id", "email"], name: "index_workspace_invitations_on_workspace_id_and_email", unique: true
  end

  create_table "workspace_memberships", force: :cascade do |t|
    t.integer "workspace_id", null: false
    t.integer "member_id", null: false
    t.boolean "admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id", "workspace_id"], name: "index_workspace_memberships_on_member_id_and_workspace_id", unique: true
    t.index ["member_id"], name: "index_workspace_memberships_on_member_id"
    t.index ["workspace_id"], name: "index_workspace_memberships_on_workspace_id"
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "name", null: false
    t.integer "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_workspaces_on_name", unique: true
    t.index ["owner_id"], name: "index_workspaces_on_owner_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end

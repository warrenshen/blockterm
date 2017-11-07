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

ActiveRecord::Schema.define(version: 20171107060245) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comment_counts", force: :cascade do |t|
    t.integer  "subreddit_id",                           null: false
    t.datetime "when",         precision: 6,             null: false
    t.integer  "count",                      default: 0, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["subreddit_id"], name: "index_comment_counts_on_subreddit_id", using: :btree
  end

  create_table "post_counts", force: :cascade do |t|
    t.integer  "subreddit_id",                           null: false
    t.datetime "when",         precision: 6,             null: false
    t.integer  "count",                      default: 0, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["subreddit_id"], name: "index_post_counts_on_subreddit_id", using: :btree
  end

  create_table "subreddits", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_subreddits_on_name", unique: true, using: :btree
  end

  create_table "subscription_counts", force: :cascade do |t|
    t.integer  "subreddit_id",                           null: false
    t.datetime "when",         precision: 6,             null: false
    t.integer  "count",                      default: 0, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["subreddit_id"], name: "index_subscription_counts_on_subreddit_id", using: :btree
  end

  add_foreign_key "comment_counts", "subreddits"
  add_foreign_key "post_counts", "subreddits"
  add_foreign_key "subscription_counts", "subreddits"
end

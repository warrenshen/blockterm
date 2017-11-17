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

ActiveRecord::Schema.define(version: 20171109193841) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comment_counts", force: :cascade do |t|
    t.integer  "subreddit_id",                           null: false
    t.datetime "timestamp",    precision: 6,             null: false
    t.integer  "count",                      default: 0, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["subreddit_id"], name: "index_comment_counts_on_subreddit_id", using: :btree
  end

  create_table "keywords", force: :cascade do |t|
    t.integer  "token_id",   null: false
    t.string   "word",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token_id"], name: "index_keywords_on_token_id", using: :btree
  end

  create_table "market_subreddits", force: :cascade do |t|
    t.integer  "market_id",    null: false
    t.integer  "subreddit_id", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["market_id", "subreddit_id"], name: "index_market_subreddits_on_market_id_and_subreddit_id", unique: true, using: :btree
    t.index ["market_id"], name: "index_market_subreddits_on_market_id", using: :btree
    t.index ["subreddit_id"], name: "index_market_subreddits_on_subreddit_id", using: :btree
  end

  create_table "market_tickers", force: :cascade do |t|
    t.integer  "markets_id", null: false
    t.decimal  "value",      null: false
    t.datetime "timestamp",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["markets_id"], name: "index_market_tickers_on_markets_id", using: :btree
  end

  create_table "markets", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_markets_on_name", unique: true, using: :btree
  end

  create_table "mention_counts", force: :cascade do |t|
    t.integer  "keyword_id",                             null: false
    t.integer  "subreddit_id",                           null: false
    t.datetime "timestamp",    precision: 6,             null: false
    t.integer  "count",                      default: 0, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["keyword_id"], name: "index_mention_counts_on_keyword_id", using: :btree
    t.index ["subreddit_id"], name: "index_mention_counts_on_subreddit_id", using: :btree
  end

  create_table "post_counts", force: :cascade do |t|
    t.integer  "subreddit_id",                           null: false
    t.datetime "timestamp",    precision: 6,             null: false
    t.integer  "count",                      default: 0, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["subreddit_id"], name: "index_post_counts_on_subreddit_id", using: :btree
  end

  create_table "subreddits", force: :cascade do |t|
    t.string   "name",                       null: false
    t.string   "description", default: "",   null: false
    t.date     "start_date",                 null: false
    t.string   "blob",        default: "{}", null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["name"], name: "index_subreddits_on_name", unique: true, using: :btree
  end

  create_table "subscription_counts", force: :cascade do |t|
    t.integer  "subreddit_id",                           null: false
    t.datetime "timestamp",    precision: 6,             null: false
    t.integer  "count",                      default: 0, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["subreddit_id"], name: "index_subscription_counts_on_subreddit_id", using: :btree
  end

  create_table "tokens", force: :cascade do |t|
    t.string   "short_name", null: false
    t.string   "long_name",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["short_name"], name: "index_tokens_on_short_name", unique: true, using: :btree
  end

  add_foreign_key "comment_counts", "subreddits"
  add_foreign_key "keywords", "tokens"
  add_foreign_key "market_tickers", "markets", column: "markets_id"
  add_foreign_key "mention_counts", "keywords"
  add_foreign_key "mention_counts", "subreddits"
  add_foreign_key "post_counts", "subreddits"
  add_foreign_key "subscription_counts", "subreddits"
end

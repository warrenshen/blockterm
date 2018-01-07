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

ActiveRecord::Schema.define(version: 20180107173348) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_user_counts", force: :cascade do |t|
    t.integer  "subreddit_id",                           null: false
    t.datetime "timestamp",    precision: 6,             null: false
    t.integer  "count",                      default: 0, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["subreddit_id", "timestamp"], name: "index_active_user_counts_on_subreddit_id_and_timestamp", unique: true, using: :btree
    t.index ["subreddit_id"], name: "index_active_user_counts_on_subreddit_id", using: :btree
  end

  create_table "comment_counts", force: :cascade do |t|
    t.integer  "subreddit_id",                           null: false
    t.datetime "timestamp",    precision: 6,             null: false
    t.integer  "count",                      default: 0, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["subreddit_id", "timestamp"], name: "index_comment_counts_on_subreddit_id_and_timestamp", unique: true, using: :btree
    t.index ["subreddit_id"], name: "index_comment_counts_on_subreddit_id", using: :btree
  end

  create_table "dashboard_items", force: :cascade do |t|
    t.integer  "user_id",                           null: false
    t.string   "identifier",                        null: false
    t.integer  "w",                 default: 0,     null: false
    t.integer  "h",                 default: 0,     null: false
    t.integer  "x",                 default: 0,     null: false
    t.integer  "y",                 default: 0,     null: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.integer  "dashboard_page_id",                 null: false
    t.boolean  "static",            default: false, null: false
    t.index ["dashboard_page_id"], name: "index_dashboard_items_on_dashboard_page_id", using: :btree
    t.index ["user_id"], name: "index_dashboard_items_on_user_id", using: :btree
  end

  create_table "dashboard_pages", force: :cascade do |t|
    t.integer  "user_id",                 null: false
    t.integer  "index",      default: 0,  null: false
    t.string   "name",       default: "", null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.index ["user_id"], name: "index_dashboard_pages_on_user_id", using: :btree
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
    t.integer  "market_id",  null: false
    t.decimal  "value",      null: false
    t.datetime "timestamp",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["market_id"], name: "index_market_tickers_on_market_id", using: :btree
  end

  create_table "markets", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "token_id"
    t.index ["name"], name: "index_markets_on_name", unique: true, using: :btree
    t.index ["token_id"], name: "index_markets_on_token_id", using: :btree
  end

  create_table "mention_counts", force: :cascade do |t|
    t.integer  "keyword_id",                             null: false
    t.integer  "subreddit_id",                           null: false
    t.datetime "timestamp",    precision: 6,             null: false
    t.integer  "count",                      default: 0, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["keyword_id", "subreddit_id", "timestamp"], name: "index_mention_counts_on_keyword_and_subreddit_and_timestamp", unique: true, using: :btree
    t.index ["keyword_id"], name: "index_mention_counts_on_keyword_id", using: :btree
    t.index ["subreddit_id"], name: "index_mention_counts_on_subreddit_id", using: :btree
  end

  create_table "post_counts", force: :cascade do |t|
    t.integer  "subreddit_id",                           null: false
    t.datetime "timestamp",    precision: 6,             null: false
    t.integer  "count",                      default: 0, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["subreddit_id", "timestamp"], name: "index_post_counts_on_subreddit_id_and_timestamp", unique: true, using: :btree
    t.index ["subreddit_id"], name: "index_post_counts_on_subreddit_id", using: :btree
  end

  create_table "subreddit_tokens", force: :cascade do |t|
    t.integer  "subreddit_id", null: false
    t.integer  "token_id",     null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["subreddit_id"], name: "index_subreddit_tokens_on_subreddit_id", using: :btree
    t.index ["token_id"], name: "index_subreddit_tokens_on_token_id", using: :btree
  end

  create_table "subreddits", force: :cascade do |t|
    t.string   "name",                             null: false
    t.string   "description",       default: "",   null: false
    t.date     "start_date",                       null: false
    t.string   "blob",              default: "{}", null: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "image_url",         default: "",   null: false
    t.integer  "active_user_count"
    t.integer  "comment_count"
    t.integer  "post_count"
    t.integer  "subscriber_count"
    t.index ["name"], name: "index_subreddits_on_name", unique: true, using: :btree
  end

  create_table "subscriber_counts", force: :cascade do |t|
    t.integer  "subreddit_id",                           null: false
    t.datetime "timestamp",    precision: 6,             null: false
    t.integer  "count",                      default: 0, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["subreddit_id", "timestamp"], name: "index_subscriber_counts_on_subreddit_id_and_timestamp", unique: true, using: :btree
    t.index ["subreddit_id"], name: "index_subscriber_counts_on_subreddit_id", using: :btree
  end

  create_table "token_users", force: :cascade do |t|
    t.integer  "token_id",                   null: false
    t.integer  "user_id",                    null: false
    t.integer  "index",      default: 0,     null: false
    t.decimal  "amount",     default: "0.0", null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["token_id"], name: "index_token_users_on_token_id", using: :btree
    t.index ["user_id"], name: "index_token_users_on_user_id", using: :btree
  end

  create_table "tokens", force: :cascade do |t|
    t.string   "short_name",                         null: false
    t.string   "long_name",                          null: false
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "image_url",          default: "",    null: false
    t.string   "website",            default: "",    null: false
    t.decimal  "price_usd",          default: "0.0", null: false
    t.decimal  "price_btc",          default: "0.0", null: false
    t.decimal  "volume_usd_24h",     default: "0.0", null: false
    t.decimal  "market_cap_usd",     default: "0.0", null: false
    t.decimal  "available_supply",   default: "0.0", null: false
    t.decimal  "total_supply",       default: "0.0", null: false
    t.decimal  "max_supply",         default: "0.0", null: false
    t.decimal  "percent_change_1h",  default: "0.0", null: false
    t.decimal  "percent_change_24h", default: "0.0", null: false
    t.decimal  "percent_change_7d",  default: "0.0", null: false
    t.index ["short_name"], name: "index_tokens_on_short_name", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "active_user_counts", "subreddits"
  add_foreign_key "comment_counts", "subreddits"
  add_foreign_key "dashboard_items", "dashboard_pages"
  add_foreign_key "dashboard_items", "users"
  add_foreign_key "dashboard_pages", "users"
  add_foreign_key "keywords", "tokens"
  add_foreign_key "market_tickers", "markets"
  add_foreign_key "markets", "tokens"
  add_foreign_key "mention_counts", "keywords"
  add_foreign_key "mention_counts", "subreddits"
  add_foreign_key "post_counts", "subreddits"
  add_foreign_key "subreddit_tokens", "subreddits"
  add_foreign_key "subreddit_tokens", "tokens"
  add_foreign_key "subscriber_counts", "subreddits"
  add_foreign_key "token_users", "tokens"
  add_foreign_key "token_users", "users"
end

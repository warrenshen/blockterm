# == Schema Information
#
# Table name: tokens
#
#  id                 :integer          not null, primary key
#  short_name         :string           not null
#  long_name          :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_url          :string           default(""), not null
#  website            :string           default(""), not null
#  price_usd          :decimal(, )      default(0.0), not null
#  price_btc          :decimal(, )      default(0.0), not null
#  volume_usd_24h     :decimal(, )      default(0.0), not null
#  market_cap_usd     :decimal(, )      default(0.0), not null
#  available_supply   :decimal(, )      default(0.0), not null
#  total_supply       :decimal(, )      default(0.0), not null
#  max_supply         :decimal(, )      default(0.0), not null
#  percent_change_1h  :decimal(, )      default(0.0), not null
#  percent_change_24h :decimal(, )      default(0.0), not null
#  percent_change_7d  :decimal(, )      default(0.0), not null
#
# Indexes
#
#  index_tokens_on_short_name  (short_name) UNIQUE
#

class Token < ApplicationRecord
  has_many :keywords
  has_many :markets
  has_many :mention_counts, through: :keywords
  has_many :subreddit_tokens
  has_many :subreddits, through: :subreddit_tokens

  validates :short_name, uniqueness: true
  validates :long_name, uniqueness: true
end

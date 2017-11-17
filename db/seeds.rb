# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Seeding the database...'

satoshi_subreddit = Subreddit.find_or_create_by(
  name: 'SatoshiCoin',
  start_date: Date.new(2017, 10, 1),
)
puts "Created #{satoshi_subreddit.name_with_r} subreddit"

nakamoto_subreddit = Subreddit.find_or_create_by(
  name: 'NakamotoMarket',
  start_date: Date.new(2017, 11, 1),
)
puts "Created #{nakamoto_subreddit.name_with_r} subreddit"

subreddits = [satoshi_subreddit, nakamoto_subreddit]

puts 'Seeding tokens and keywords...'

token_infos = [
  {
    short_name: 'SAT',
    long_name: 'Satoshi',
    keywords: ['SAT', 'SATs', 'Satoshi', 'Satoshis', 'Sato', 'Satos'],
  },
  {
    short_name: 'NAK',
    long_name: 'Nakamoto',
    keywords: ['NAK', 'NAKs', 'Nakamoto', 'Nakamotos'],
  }
]

token_infos.each do |token_info|
  keyword_words = token_info.delete(:keywords)
  token = Token.create(token_info)
  keyword_words.each do |word|
    Keyword.create(
      token: token,
      word: word,
    )
  end
end
puts "Created tokens and keywords"

puts 'Seeding counts...'

def create_one_month_subscription_counts_for_subreddit(subreddit, increment=3)
  start_date = DateTime.new(2017, 6, 22)
  subscription_count = 0
  for i in (-364..0)
    date = start_date + i.day
    SubscriptionCount.create(
      subreddit_id: subreddit.id,
      timestamp: date,
      count: subscription_count,
    )
    subscription_count += rand(increment)
  end
  puts "Created 365 subscription counts for the #{subreddit.name_with_r} subreddit"
end

subreddits.each do |subreddit|
  create_one_month_subscription_counts_for_subreddit(subreddit)
end

def create_one_month_post_counts_for_subreddit(subreddit, k=50)
  start_date = DateTime.new(2017, 6, 22)
  for i in (-364..0)
    date = start_date + i.day
    PostCount.create(
      subreddit_id: subreddit.id,
      timestamp: date,
      count: rand(k),
    )
  end
  puts "Created 365 post counts for the #{subreddit.name_with_r} subreddit"
end

Subreddit.all.each do |subreddit|
  create_one_month_post_counts_for_subreddit(subreddit)
end

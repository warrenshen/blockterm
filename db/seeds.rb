puts 'Seeding the database...'

satoshi_subreddit = Subreddit.find_or_create_by(
  name: 'Satoshi',
  description: 'Satoshi is the currency of the Internet: a distributed, worldwide, decentralized digital money. Unlike traditional currencies such as dollars, satoshis are issued and managed without any central authority whatsoever: there is no government, company, or bank in charge of Satoshi. As such, it is more resistant to wild inflation and corrupt banks. With Satoshi, you can be your own bank.',
  start_date: Date.new(2017, 10, 1),
)
puts "Created #{satoshi_subreddit.display_name} subreddit"

nakamoto_subreddit = Subreddit.find_or_create_by(
  name: 'NakamotoMarket',
  description: 'Nakamoto is a shit coin just like the rest of them.',
  start_date: Date.new(2017, 11, 1),
)
puts "Created #{nakamoto_subreddit.display_name} subreddit"

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
  puts "Created 365 subscription counts for the #{subreddit.display_name} subreddit"
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
  puts "Created 365 post counts for the #{subreddit.display_name} subreddit"
end

Subreddit.all.each do |subreddit|
  create_one_month_post_counts_for_subreddit(subreddit)
end

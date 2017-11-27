puts 'Seeding the database...'

puts 'Seeding subreddits...'

subreddit_infos = [
  {
    name: 'Satoshi',
    description: 'Satoshi is the currency of the Internet: a distributed, worldwide, decentralized digital money. Unlike traditional currencies such as dollars, satoshis are issued and managed without any central authority whatsoever: there is no government, company, or bank in charge of Satoshi. As such, it is more resistant to wild inflation and corrupt banks. With Satoshi, you can be your own bank.',
    start_date: Date.new(2017, 1, 1),
  },
  {
    name: 'SatoshiTrader',
    description: 'A place to discuss trading opportunities for the Satoshi cryptocurrency.',
    start_date: Date.new(2017, 6, 1),
  },
  {
    name: 'NakamotoMarket',
    description: 'Nakamoto is a shit coin just like the rest of them.',
    start_date: Date.new(2017, 11, 1),
  },
]

subreddit_infos.each do |subreddit_info|
  subreddit = Subreddit.create(subreddit_info)
  puts "Created #{subreddit.display_name} subreddit"
end

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

subreddit_tokens = [
  {
    subreddit_id: Subreddit.find_by(name: 'Satoshi').id,
    token_id: Token.find_by(long_name: 'Satoshi').id,
  },
  {
    subreddit_id: Subreddit.find_by(name: 'SatoshiTrader').id,
    token_id: Token.find_by(long_name: 'Satoshi').id,
  },
]
subreddit_tokens.each do |subreddit_token|
  SubredditToken.create(subreddit_token)
end
puts 'Created subreddit tokens'


puts 'Seeding counts...'

def create_one_month_subscriber_counts_for_subreddit(subreddit, increment=3)
  start_date = DateTime.new(2017, 6, 22)
  subscriber_count = 0
  for i in (-364..0)
    date = start_date + i.day
    SubscriberCount.create(
      subreddit_id: subreddit.id,
      timestamp: date,
      count: subscriber_count,
    )
    subscriber_count += rand(increment)
  end
  puts "Created 365 subscriber counts for the #{subreddit.display_name} subreddit"
end

Subreddit.all.each do |subreddit|
  create_one_month_subscriber_counts_for_subreddit(subreddit)
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

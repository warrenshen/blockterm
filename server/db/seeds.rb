puts 'Seeding the database...'

puts 'Seeding users...'
user_infos = [
  {
    email: 'warren@blockterm.com',
    password: 'password',
  },
]

user_infos.each do |user_info|
  User.create(user_info)
end

puts 'Seeding dashboard pages and items'
dashboard_item_infos = [
  {
    identifier: 'TV_CANDLE_CHART__BITSTAMP:BTCUSD',
    w: 3,
    h: 3,
    x: 0,
    y: 0,
  },
  {
    identifier: 'SUBREDDIT_POST_COUNTS__Bitcoin',
    w: 3,
    h: 3,
    x: 3,
    y: 0,
  },
  {
    identifier: 'TV_CANDLE_CHART__BITSTAMP:ETHUSD',
    w: 3,
    h: 3,
    x: 0,
    y: 3,
  },
  {
    identifier: 'SUBREDDIT_POST_COUNTS__ethereum',
    w: 3,
    h: 3,
    x: 3,
    y: 3,
  },
]

User.all.each do |user|
  for i in (0..3)
    dashboard_page = DashboardPage.create(
      user_id: user.id,
      index: i,
      name: "Tab #{i + 1}"
    )
    dashboard_item_infos.each do |dashboard_item_info|
      DashboardItem.create(
        {
          user_id: user.id,
          dashboard_page_id: dashboard_page.id,
        }.merge(dashboard_item_info))
    end
  end
end

puts 'Seeding subreddits...'

subreddit_infos = [
  # {
  #   name: 'Satoshi',
  #   description: 'Satoshi is the currency of the Internet: a distributed, worldwide, decentralized digital money. Unlike traditional currencies such as dollars, satoshis are issued and managed without any central authority whatsoever: there is no government, company, or bank in charge of Satoshi. As such, it is more resistant to wild inflation and corrupt banks. With Satoshi, you can be your own bank.',
  #   start_date: Date.new(2017, 1, 1),
  #   image_url: 'https://b.thumbs.redditmedia.com/QPWBJVeSoUDcA1Sc3dYL7eK_3bq2ZdVbOxNOdcBojNM.png',
  # },
  # {
  #   name: 'SatoshiTrader',
  #   description: 'A place to discuss trading opportunities for the Satoshi cryptocurrency.',
  #   start_date: Date.new(2017, 6, 1),
  #   image_url: 'https://b.thumbs.redditmedia.com/QPWBJVeSoUDcA1Sc3dYL7eK_3bq2ZdVbOxNOdcBojNM.png',
  # },
  # {
  #   name: 'NakamotoMarket',
  #   description: 'Nakamoto is a shit coin just like the rest of them.',
  #   start_date: Date.new(2017, 11, 1),
  #   image_url: 'https://b.thumbs.redditmedia.com/j_Y7S-sW6KsbVGYiXlKjGIOPvwJa0-BPGvZznNbwcgo.png',
  # },
  {
    name: 'altcoin',
    start_date: '2013-03-12',
  },
  {
    name: 'Bitcoin',
    start_date: '2010-09-09',
  },
  {
    name: 'Bitcoincash',
    start_date: '2014-11-09',
  },
  {
    name: 'btc',
    start_date: '2011-05-20',
    image_url: 'https://bitsonline.com/wp-content/uploads/2017/10/Bitcoin-Cash-Green-Logo.png',
  },
  {
    name: 'CryptoCurrency',
    start_date: '2013-03-11',
    image_url: 'https://b.thumbs.redditmedia.com/BlRR72bV2aPJ5HW-JmzFi9IUhNCxtqjgjlO8VGWJN6w.png',
  },
  {
    name: 'CryptoMarkets',
    start_date: '2013-11-12',
  },
  {
    name: 'dogecoin',
    start_date: '2013-12-08',
  },
  {
    name: 'Electroneum',
    start_date: '2017-08-17',
  },
  {
    name: 'ethereum',
    start_date: '2013-12-14',
  },
  {
    name: 'Groestlcoin',
    start_date: '2014-04-03',
  },
  {
    name: 'Iota',
    start_date: '2012-09-06',
  },
  {
    name: 'Lisk',
    start_date: '2016-01-07',
  },
  {
    name: 'litecoin',
    start_date: '2011-10-14',
  },
  {
    name: 'Monero',
    start_date: '2014-04-24',
  },
  {
    name: 'NEO',
    start_date: '2008-08-07',
  },
  {
    name: 'Ripple',
    start_date: '2009-10-14',
  },
  {
    name: 'SubstratumNetwork',
    start_date: '2017-07-31',
  },
  {
    name: 'Vertcoin',
    start_date: '2014-01-11',
  },
]

subreddit_infos.each do |subreddit_info|
  count_data = {
    active_user_count: rand(5000),
    comment_count: rand(500),
    post_count: rand(250),
    subscriber_count: rand(50000),
  }
  subreddit = Subreddit.create(subreddit_info.merge(count_data))
  puts "Created #{subreddit.display_name} subreddit"
end

puts 'Seeding tokens and keywords...'

token_infos = [
  {
    long_name: 'Satoshi',
    short_name: 'SAT',
    image_url: 'https://bitcoin.org/img/icons/opengraph.png',
    website: 'https://www.bitcoin.com',
    keywords: ['SAT', 'Satoshi'],
  },
  {
    long_name: 'Nakamoto',
    short_name: 'NAK',
    image_url: 'https://bitcoin.org/img/icons/opengraph.png',
    website: 'https://www.bitcoin.com',
    keywords: ['NAK', 'Nakamotos'],
  },
  {
    short_name: 'BTC',
    long_name: 'Bitcoin',
    image_url: 'https://bitcoin.org/img/icons/opengraph.png',
    website: 'https://www.bitcoin.com',
    keywords: ['BTC', 'Bitcoin'],
    markets: ['USD-BTC', 'USDT-BTC'],
  },
  {
    short_name: 'ETH',
    long_name: 'Ethereum',
    image_url: 'https://bitcoin.org/img/icons/opengraph.png',
    website: 'https://www.bitcoin.com',
    keywords: ['ETH', 'Ethereum'],
    markets: ['USD-ETH', 'BTC-ETH', 'USDT-ETH'],
  },
  {
    short_name: 'NEO',
    long_name: 'NEO',
    image_url: 'https://bitcoin.org/img/icons/opengraph.png',
    website: 'https://www.bitcoin.com',
    keywords: ['NEO', 'Antshare'],
    markets: ['BTC-NEO', 'ETH-NEO', 'USDT-NEO'],
  },
]

token_infos.each do |token_info|
  keyword_words = token_info.delete(:keywords)
  markets = token_info.delete(:markets)

  token = Token.create(token_info)

  if !keyword_words.nil?
    keyword_words.each do |word|
      Keyword.create(
        token_id: token.id,
        word: word,
      )
    end
  end

  if !markets.nil?
    markets.each do |market|
      Market.create(
        name: market,
        token_id: token.id,
      )
    end
  end
end

Market.create(
  name: 'TOTAL',
)


puts "Created tokens, keywords, and markets"

Market.all.each do |market|
  today = DateTime.now.beginning_of_day
  last_value = 1000

  for i in (-90..0)
    date = today + i.day
    last_value += rand(5)
    MarketTicker.create(
      market_id: market.id,
      timestamp: date,
      value: last_value,
    )
  end
end

subreddit_tokens = [
  # {
  #   subreddit_id: Subreddit.find_by(name: 'Satoshi').id,
  #   token_id: Token.find_by(long_name: 'Satoshi').id,
  # },
  # {
  #   subreddit_id: Subreddit.find_by(name: 'SatoshiTrader').id,
  #   token_id: Token.find_by(long_name: 'Satoshi').id,
  # },
  {
    subreddit_id: Subreddit.find_by(name: 'Bitcoin').id,
    token_id: Token.find_by(long_name: 'Bitcoin').id,
  },
  {
    subreddit_id: Subreddit.find_by(name: 'ethereum').id,
    token_id: Token.find_by(long_name: 'Ethereum').id,
  },
  {
    subreddit_id: Subreddit.find_by(name: 'NEO').id,
    token_id: Token.find_by(long_name: 'NEO').id,
  },
]
subreddit_tokens.each do |subreddit_token|
  SubredditToken.create(subreddit_token)
end
puts 'Created subreddit tokens'

puts 'Seeding counts...'

def create_post_counts_for_subreddit(subreddit, days=30, k=50)
  today = DateTime.now.beginning_of_day

  for i in (-days..0)
    date = today + i.day
    PostCount.create(
      subreddit_id: subreddit.id,
      timestamp: date,
      count: rand(k),
    )
  end

  puts "Created #{days} post counts for the #{subreddit.display_name} subreddit"
end

def create_comment_counts_for_subreddit(subreddit, days=30, k=500)
  today = DateTime.now.beginning_of_day

  for i in (-days..0)
    date = today + i.day
    CommentCount.create(
      subreddit_id: subreddit.id,
      timestamp: date,
      count: rand(k),
    )
  end

  puts "Created #{days} post counts for the #{subreddit.display_name} subreddit"
end

def create_subscriber_counts_for_subreddit(subreddit, days=30, increment=3)
  today = DateTime.now.beginning_of_day
  subscriber_count = 0

  for i in (-days..0)
    date = today + i.day
    SubscriberCount.create(
      subreddit_id: subreddit.id,
      timestamp: date,
      count: subscriber_count,
    )
    subscriber_count += rand(increment)
  end

  puts "Created #{days} subscriber counts for the #{subreddit.display_name} subreddit"
end

def create_active_user_counts_for_subreddit(subreddit, days=30, increment=4)
  today = DateTime.now.beginning_of_day
  active_user_count = 3000

  for i in (-days..0)
    date = today + i.day
    ActiveUserCount.create(
      subreddit_id: subreddit.id,
      timestamp: date,
      count: active_user_count,
    )
    if rand(4) == 0
      active_user_count += rand(increment)
    end
  end

  puts "Created #{days} active user counts for the #{subreddit.display_name} subreddit"
end

Subreddit.first(3).each do |subreddit|
  create_post_counts_for_subreddit(subreddit, 365 * 2)
  create_comment_counts_for_subreddit(subreddit, 365 * 2)
  create_subscriber_counts_for_subreddit(subreddit, 365 * 2)
  create_active_user_counts_for_subreddit(subreddit, 365 * 2)
end

Subreddit.all[3..-1].each do |subreddit|
  create_post_counts_for_subreddit(subreddit, 90)
  create_comment_counts_for_subreddit(subreddit, 90)
  create_subscriber_counts_for_subreddit(subreddit, 90)
  create_active_user_counts_for_subreddit(subreddit, 90)
end

Token.all.each do |token|
  keywords = token.keywords

  keywords.each do |keyword|
    Subreddit.first(5).each do |subreddit|
      today = DateTime.now.beginning_of_day

      for i in (-90..0)
        date = today + i.day
        MentionCount.create(
          subreddit_id: subreddit.id,
          keyword_id: keyword.id,
          timestamp: date,
          count: rand(100),
        )
      end

      puts "Created 90 mention counts for the #{keyword.word} keyword in the #{subreddit.display_name} subreddit"
    end
  end
end

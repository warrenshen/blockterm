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
  {
    name: 'altcoin',
    start_date: '2013-03-12',
  },
  {
    name: 'binance',
    start_date: '2017-06-30',
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
    name: 'BNBtrader',
    start_date: '2017-08-15',
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
    name: 'enigmacatalyst',
    start_date: '2017-06-05',
  },
  {
    name: 'ethereum',
    start_date: '2013-12-14',
  },
  {
    name: 'ethtrader',
    start_date: '2015-03-25',
  },
  {
    name: 'gridcoin',
    start_date: '2013-12-27',
  },
  {
    name: 'Groestlcoin',
    start_date: '2014-04-03',
  },
  {
    name: 'helloicon',
    start_date: '2017-08-15',
  },
  {
    name: 'icon',
    start_date: '2010-08-31',
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
    name: 'Raiblocks',
    start_date: '2014-12-13',
  },
  {
    name: 'RequestNetwork',
    start_date: '2017-07-20',
  },
  {
    name: 'Ripple',
    start_date: '2009-10-14',
  },
  {
    name: 'steemit',
    start_date: '2016-02-23',
  },
  {
    name: 'Stellar',
    start_date: '2011-12-24'
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
    short_name: 'BTC',
    long_name: 'Bitcoin',
    image_url: 'bitcoin',
    website: 'https://www.bitcoin.com',
    keywords: ['BTC', 'Bitcoin'],
    markets: ['USD-BTC', 'USDT-BTC'],
    price_usd: 14543.78,
    price_btc: 1.0,
    volume_usd_24h: 18966300000,
    market_cap_usd: 251403067744,
    available_supply: 16781237,
    total_supply: 16781237,
    max_supply: 21000000,
    percent_change_1h: 7.4,
    percent_change_24h: -5.8,
    percent_change_7d: 23.6,
  },
  {
    short_name: 'ETH',
    long_name: 'Ethereum',
    image_url: 'ethereum',
    website: 'https://www.bitcoin.com',
    keywords: ['ETH', 'Ethereum'],
    markets: ['USD-ETH', 'BTC-ETH', 'USDT-ETH'],
    price_usd: 1296.19,
    price_btc: 0.09056550,
    volume_usd_24h: 8063390000,
    market_cap_usd: 125575833053,
    available_supply: 96880730,
    total_supply: 96880730,
    max_supply: 96880730,
    percent_change_1h: 3.44,
    percent_change_24h: -0.85,
    percent_change_7d: -9.6,
  },
  {
    short_name: 'NEO',
    long_name: 'NEO',
    image_url: 'neo',
    website: 'https://www.bitcoin.com',
    keywords: ['NEO', 'Antshare'],
    markets: ['BTC-NEO', 'ETH-NEO', 'USDT-NEO'],
    price_usd: 125.04,
    price_btc: 0.00873646,
    volume_usd_24h: 536919000,
    market_cap_usd: 8127470000,
    available_supply: 96880730,
    total_supply: 96880730,
    max_supply: 96880730,
    percent_change_1h: 3.44,
    percent_change_24h: -0.85,
    percent_change_7d: -9.6,
  },
  {
    short_name: 'XRP',
    long_name: 'Ripple',
    image_url: 'ripple',
    keywords: ['XRP', 'Ripple'],
    markets: [],
    price_usd: 3.37,
    price_btc: 0.00021126,
    volume_usd_24h: 2512240000,
    market_cap_usd: 130666360786,
    available_supply: 38739144847,
    total_supply: 99993093880,
    max_supply: 100000000000,
    percent_change_1h: 9.44,
    percent_change_24h: -0.8,
    percent_change_7d: -16.6,
  },
  {
    short_name: 'BCH',
    long_name: 'Bitcoin Cash',
    image_url: 'bitcoin-cash',
    keywords: ['BCH', 'Bitcoin Cash'],
    markets: [],
    price_usd: 14543.78,
    price_btc: 1.0,
    volume_usd_24h: 18966300000,
    market_cap_usd: 251403067744,
    available_supply: 16781237,
    total_supply: 16781237,
    max_supply: 21000000,
    percent_change_1h: 7.4,
    percent_change_24h: -5.8,
    percent_change_7d: 23.6,
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
        token_id: token.id,
        name: market,
      )
    end
  end
end

Token.first(2).each_with_index do |token, index|
  TokenUser.create(
    token_id: token.id,
    user_id: User.first.id,
    index: index,
    amount: rand(10),
  )
end
puts "Created token users"

total_cap_market = Market.create(
  name: 'TOTAL',
)

puts "Created tokens, keywords, and markets"

Market.all.each do |market|
  if market.name == 'TOTAL'
    last_value = 10000000
    today = DateTime.now.beginning_of_day

    for i in (-365 * 2..0)
      date = today + i.day
      last_value += rand(50000)
      MarketTicker.create(
        market_id: total_cap_market.id,
        timestamp: date,
        value: last_value,
      )
      total_cap_market
    end
  else
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
end

subreddit_tokens = [
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

def create_post_counts_for_subreddit(subreddit, days=30, k=2000)
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

def create_comment_counts_for_subreddit(subreddit, days=30, k=5000)
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
    Subreddit.where(name: ['CryptoCurrency', 'CryptoMarkets']).each do |subreddit|
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

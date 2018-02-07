module MutationHelper
  def self.create_default_dashboard_pages(user)
    for i in (0..3)
      dashboard_page = DashboardPage.create(
        user_id: user.id,
        index: i,
        name: "Tab #{i + 1}"
      )

      if i == 0
        DashboardItem.create(
          user_id: user.id,
          dashboard_page_id: dashboard_page.id,
          identifier: 'TV_CANDLE_CHART__BITSTAMP:BTCUSD',
          w: 6,
          h: 4,
          x: 0,
          y: 0,
          static: false,
        )
        DashboardItem.create(
          user_id: user.id,
          dashboard_page_id: dashboard_page.id,
          identifier: 'TV_CANDLE_CHART__BITSTAMP:ETHUSD',
          w: 6,
          h: 4,
          x: 0,
          y: 4,
          static: false,
        )
        DashboardItem.create(
          user_id: user.id,
          dashboard_page_id: dashboard_page.id,
          identifier: 'TV_MARKET_OVERVIEW__Default',
          w: 3,
          h: 8,
          x: 6,
          y: 0,
          static: false,
        )
        DashboardItem.create(
          user_id: user.id,
          dashboard_page_id: dashboard_page.id,
          identifier: 'SUBREDDIT_POST_COUNTS__Bitcoin',
          w: 3,
          h: 3,
          x: 3,
          y: 8,
          static: false,
        )
        DashboardItem.create(
          user_id: user.id,
          dashboard_page_id: dashboard_page.id,
          identifier: 'SUBREDDIT_COMMENT_COUNTS__Bitcoin',
          w: 3,
          h: 3,
          x: 6,
          y: 8,
          static: false,
        )
        DashboardItem.create(
          user_id: user.id,
          dashboard_page_id: dashboard_page.id,
          identifier: 'TOTAL_MARKET_CAP__Default',
          w: 3,
          h: 3,
          x: 0,
          y: 8,
          static: false,
        )
      end
    end
  end

  def self.create_portfolio_tickers
    success = true

    users_with_portfolio = User.where_exists(:token_users)
    users_with_portfolio.each do |user|
      token_users = TokenUser.includes(:token).where(user_id: user.id)
      portfolio_ticker = PortfolioTicker.create(
        user_id: user.id,
        value_usd: self.calculate_value_usd(token_users),
        value_btc: self.calculate_value_btc(token_users),
        value_eth: self.calculate_value_eth(token_users),
        timestamp: DateTime.now
      )

      if !portfolio_ticker.valid?
        success = false
      end
    end

    if success
      AdminMailer.job_status_email(
        AdminMailer::JOB_PORTFOLIO_TICKER,
        AdminMailer::JOB_STATUS_SUCCESS,
      ).deliver_now
    else
      AdminMailer.job_status_email(
        AdminMailer::JOB_PORTFOLIO_TICKER,
        AdminMailer::JOB_STATUS_FAILURE,
      ).deliver_now
    end

    return success
  end

  def self.calculate_value_usd(token_users)
    value_usd = 0.0
    token_users.each do |token_user|
      value_usd += token_user.amount * token_user.token.price_usd
    end
    value_usd
  end

  def self.calculate_value_btc(token_users)
    value_btc = 0.0
    token_users.each do |token_user|
      value_btc += token_user.amount * token_user.token.price_btc
    end
    value_btc
  end

  def self.calculate_value_eth(token_users)
    value_eth = 0.0
    token_eth = Token.find_by_identifier('ethereum')
    token_users.each do |token_user|
      eth_price = token_user.token.price_usd / token_eth.price_usd
      value_eth += token_user.amount * eth_price
    end
    value_eth
  end

  def self.parse_dashboard_pages_string(user, dashboard_pages_string)
    dashboard_pages_hashes = JSON.parse(dashboard_pages_string)
    dashboard_pages_hashes.each do |dashboard_page_hash|
      dashboard_page = DashboardPage.create(
        user_id: user.id,
        index: dashboard_page_hash['index'],
        name: dashboard_page_hash['name'],
      )

      dashboard_item_hashes = dashboard_page_hash['dashboardItems']
      dashboard_item_hashes.each do |dashboard_item_hash|
        dashboard_item = DashboardItem.create(
          user_id: user.id,
          dashboard_page_id: dashboard_page.id,
          identifier: dashboard_item_hash['identifier'],
          w: dashboard_item_hash['w'],
          h: dashboard_item_hash['h'],
          x: dashboard_item_hash['x'],
          y: dashboard_item_hash['y'],
        )
      end
    end
  end
end

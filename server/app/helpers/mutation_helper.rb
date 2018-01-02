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

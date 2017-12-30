module MutationHelper
  def self.create_default_dashboard_pages(user)
    for i in (0..3)
      dashboard_page = DashboardPage.create(
        user_id: user.id,
        index: i,
        name: "Tab #{i + 1}"
      )
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

module Types
  MutationType = GraphQL::ObjectType.define do
    name 'Mutation'

    field :createActiveUserCount, Types::CountType do
      description 'Creates a active user count'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit_id = args[:subredditId]
        else
          subreddit = QueryHelper::find_subreddit_by_name(args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        timestamp = QueryHelper::localize_timestamp(args[:timestamp])

        active_user_count = ActiveUserCount.create(
          subreddit_id: subreddit_id,
          count: args[:count],
          timestamp: timestamp,
        )

        if active_user_count.valid?
          active_user_count
        else
          return GraphQL::ExecutionError.new(
            'Failed to create active user count'
          )
        end
      }
    end

    field :createCommentCount, Types::CountType do
      description 'Creates a comment count'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit_id = args[:subredditId]
        else
          subreddit = QueryHelper::find_subreddit_by_name(args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        timestamp = QueryHelper::localize_timestamp(args[:timestamp])

        existing_comment_count = CommentCount.find_by(
          subreddit_id: subreddit_id,
          timestamp: timestamp,
        )

        if existing_comment_count.nil?
          comment_count = CommentCount.create(
            subreddit_id: subreddit_id,
            count: args[:count],
            timestamp: timestamp,
          )

          if comment_count.valid?
            comment_count
          else
            return GraphQL::ExecutionError.new(
              'Failed to create comment count'
            )
          end
        else
          existing_comment_count.update_attribute(:count, args[:count])
          existing_comment_count
        end
      }
    end

    field :createKeyword, Types::KeywordType do
      description 'Creates a keyword'

      argument :apiKey, !types.String
      argument :tokenId, !types.ID
      argument :word, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        keyword = Keyword.create(
          token_id: args[:tokenId],
          word: args[:word],
        )

        if keyword.valid?
          keyword
        else
          return GraphQL::ExecutionError.new(
            'Failed to create keyword'
          )
        end
      }
    end

    field :createMentionCount, Types::MentionCountType do
      description 'Creates a mention count'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :keywordId, !types.ID
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit_id = args[:subredditId]
        else
          subreddit = QueryHelper::find_subreddit_by_name(args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        keyword_id = args[:keywordId]
        timestamp = QueryHelper::localize_timestamp(args[:timestamp])

        existing_mention_count = MentionCount.find_by(
          keyword_id: keyword_id,
          subreddit_id: subreddit_id,
          timestamp: timestamp,
        )

        if existing_mention_count.nil?
          mention_count = MentionCount.create(
            keyword_id: keyword_id,
            subreddit_id: subreddit_id,
            count: args[:count],
            timestamp: timestamp,
          )

          if mention_count.valid?
            mention_count
          else
            return GraphQL::ExecutionError.new(
              'Failed to create mention count'
            )
          end
        else
          existing_mention_count.update_attribute(:count, args[:count])
          existing_mention_count
        end
      }
    end

    field :createPostCount, Types::CountType do
      description 'Create a post count'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit_id = args[:subredditId]
        else
          subreddit = QueryHelper::find_subreddit_by_name(args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        timestamp = QueryHelper::localize_timestamp(args[:timestamp])

        existing_post_count = PostCount.find_by(
          subreddit_id: subreddit_id,
          timestamp: timestamp,
        )

        if existing_post_count.nil?
          post_count = PostCount.create(
            subreddit_id: subreddit_id,
            count: args[:count],
            timestamp: timestamp,
          )

          if post_count.valid?
            post_count
          else
            return GraphQL::ExecutionError.new(
              'Failed to create post count'
            )
          end
        else
          existing_post_count.update_attribute(:count, args[:count])
          existing_post_count
        end
      }
    end

    field :createSubscriberCount, Types::CountType do
      description 'Creates a subscriber count'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :count, !types.Int
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit_id = args[:subredditId]
        else
          subreddit = QueryHelper::find_subreddit_by_name(args[:subredditName])
          if subreddit.nil?
            return GraphQL::ExecutionError.new(
              "No subreddit found for given 'subredditId' or 'subredditName'"
            )
          end
          subreddit_id = subreddit.id
        end

        timestamp = QueryHelper::localize_timestamp(args[:timestamp])

        subscriber_count = SubscriberCount.create(
          subreddit_id: subreddit_id,
          count: args[:count],
          timestamp: timestamp,
        )

        if subscriber_count.valid?
          subscriber_count
        else
          return GraphQL::ExecutionError.new(
            'Failed to create subscriber count'
          )
        end
      }
    end

    field :createSubreddit, Types::SubredditType do
      description 'Creates a subreddit'

      argument :apiKey, !types.String
      argument :name, !types.String
      argument :startDate, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        subreddit = Subreddit.create(
          name: args[:name],
          start_date: args[:startDate],
        )

        if subreddit.valid?
          subreddit
        else
          return GraphQL::ExecutionError.new(
            'Failed to create subreddit'
          )
        end
      }
    end

    field :createToken, Types::TokenType do
      description 'Creates a token'

      argument :apiKey, !types.String
      argument :shortName, !types.String
      argument :longName, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        token = Token.create(
          short_name: args[:shortName],
          long_name: args[:longName],
        )

        if token.valid?
          token
        else
          return GraphQL::ExecutionError.new(
            'Failed to create token'
          )
        end
      }
    end

    field :createTokenUser, Types::TokenUserType do
      description 'Creates a token user'

      argument :tokenId, !types.ID
      argument :amount, !types.Float
      argument :index, !types.Int

      resolve -> (obj, args, ctx) {
        current_user = ctx[:current_user]
        if ctx[:current_user].nil?
          current_user = User.first
          # return GraphQL::ExecutionError.new('No current user')
        end

        token_user = TokenUser.create(
          token_id: args[:tokenId],
          user_id: current_user.id,
          amount: args[:amount],
          index: args[:index],
        )

        if token_user.valid?
          token_user
        else
          return GraphQL::ExecutionError.new(token_user.errors.full_messages)
        end
      }
    end

    field :updateTokenUsers, Types::UserType do
      description "Updates a user's token users"

      argument :tokenUsersString, !types.String

      resolve -> (obj, args, ctx) {
        current_user = ctx[:current_user]
        if ctx[:current_user].nil?
          current_user = User.first
          # return GraphQL::ExecutionError.new('No current user')
        end

        token_users_hashes = JSON.parse(args[:tokenUsersString])
        token_users_hashes.each do |token_user_hash|
          token_user_id = token_user_hash['id']
          token_user = TokenUser.find(token_user_id)

          token_user.assign_attributes(
            amount: token_user_hash['amount'],
            index: token_user_hash['index'],
          )

          if token_user.changed?
            if !token_user.save
              return GraphQL::ExecutionError.new(token_user.errors.full_messages)
            end
          end
        end

        current_user.reload
      }
    end

    field :updateSubredditBlob, Types::SubredditType do
      description 'Updates blob column of subreddit'

      argument :apiKey, !types.String
      argument :subredditId, types.ID
      argument :subredditName, types.String
      argument :activeUserCount, types.Int
      argument :commentCount, types.Int
      argument :postCount, types.Int
      argument :subscriberCount, types.Int

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:subredditId].nil? && args[:subredditName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'subredditId' or 'subredditName' params is required"
          )
        end

        if !args[:subredditId].nil?
          subreddit = Subreddit.find(args[:subredditId])
        else
          subreddit = QueryHelper::find_subreddit_by_name(args[:subredditName])
        end

        if subreddit.nil?
          return GraphQL::ExecutionError.new(
            "No subreddit found for given 'subredditId' or 'subredditName'"
          )
        end

        if !args[:activeUserCount].nil?
          subreddit.active_user_count = args[:activeUserCount]
        end
        if !args[:commentCount].nil?
          subreddit.comment_count = args[:commentCount]
        end
        if !args[:postCount].nil?
          subreddit.post_count =  args[:postCount]
        end
        if !args[:subscriberCount].nil?
          subreddit.subscriber_count = args[:subscriberCount]
        end

        if subreddit.changed?
          if subreddit.save
            subreddit
          else
            return GraphQL::ExecutionError.new('Could not save subreddit')
          end
        else
          subreddit
        end
      }
    end

    field :updateToken, Types::TokenType do
      description 'Updates columns of token'

      argument :apiKey, !types.String
      argument :shortName, !types.String
      argument :priceUSD, types.Float
      argument :priceBTC, types.Float
      argument :volumeUSD24h, types.Float
      argument :marketCapUSD, types.Float
      argument :availableSupply, types.Float
      argument :totalSupply, types.Float
      argument :maxSupply, types.Float
      argument :percentChange1h, types.Float
      argument :percentChange24h, types.Float
      argument :percentChange7d, types.Float

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        token = Token.find_by_short_name(args[:shortName])

        if token.nil?
          token = Token.create(
            short_name: args[:shortName],
            long_name: args[:shortName],
          )

          keyword = Keyword.create(
            token_id: token.id,
            word: args[:shortName],
          )

          if !token.valid? || !keyword.valid?
            return GraphQL::ExecutionError.new('Could not create new token')
          end
        end

        if !args[:priceUSD].nil?
          token.price_usd = args[:priceUSD]
        end
        if !args[:priceBTC].nil?
          token.price_btc = args[:priceBTC]
        end
        if !args[:volumeUSD24h].nil?
          token.volume_usd_24h = args[:volumeUSD24h]
        end
        if !args[:marketCapUSD].nil?
          token.market_cap_usd = args[:marketCapUSD]
        end
        if !args[:availableSupply].nil?
          token.available_supply = args[:availableSupply]
        end
        if !args[:totalSupply].nil?
          token.total_supply = args[:totalSupply]
        end
        if !args[:maxSupply].nil?
          token.max_supply = args[:maxSupply]
        end
        if !args[:percentChange1h].nil?
          token.percent_change_1h = args[:percentChange1h]
        end
        if !args[:percentChange24h].nil?
          token.percent_change_24h = args[:percentChange24h]
        end
        if !args[:percentChange7d].nil?
          token.percent_change_7d = args[:percentChange7d]
        end

        if token.changed?
          if token.save
            token
          else
            return GraphQL::ExecutionError.new('Could not save token')
          end
        else
          token
        end
      }
    end

    field :createMarket, Types::MarketType do
      description 'Creates a market'

      argument :apiKey, !types.String
      argument :name, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        market = Market.create(
          name: args[:name],
        )

        if market.valid?
          market
        else
          return GraphQL::ExecutionError.new(
            'Failed to create market'
          )
        end
      }
    end

    field :createMarketTicker, Types::MarketTickerType do
      description 'Creates a market ticker'

      argument :apiKey, !types.String
      argument :marketId, types.ID
      argument :marketName, types.String
      argument :value, !types.Float
      argument :timestamp, !types.String

      resolve -> (obj, args, ctx) {
        if QueryHelper::api_key_invalid?(args[:apiKey])
          return GraphQL::ExecutionError.new('Invalid api key')
        end

        if args[:marketId].nil? && args[:marketName].nil?
          return GraphQL::ExecutionError.new(
            "One of 'marketId' or 'marketName' params is required"
          )
        end

        if !args[:marketId].nil?
          market = Market.find(args[:marketId])
        else
          market = Market.find_by_name(args[:marketName])
        end
        if market.nil?
          return GraphQL::ExecutionError.new(
            "No market found for given 'marketId' or 'marketName'"
          )
        end
        market_id = market.id

        timestamp = QueryHelper::localize_timestamp(args[:timestamp])

        market_ticker = MarketTicker.find_or_create_by(
          market_id: market_id,
          value: args[:value],
          timestamp: timestamp,
        )

        if market_ticker.valid?
          market_ticker
        else
          return GraphQL::ExecutionError.new(
            'Failed to create market ticker'
          )
        end
      }
    end

    field :logIn, Types::AuthType do
      description 'Logs in user'

      argument :email, !types.String
      argument :password, !types.String

      resolve -> (obj, args, ctx) {
        command = AuthenticateUser.call(args[:email], args[:password])

        if command.success?
          result = command.result
          return Auth.new(result[:user], result[:auth_token])
        else
          return GraphQL::ExecutionError.new('Invalid credentials')
        end
      }
    end

    field :createUser, Types::AuthType do
      description 'Creates and logs in a user'

      argument :email, !types.String
      argument :password, !types.String
      argument :dashboardPagesString, types.String

      resolve -> (obj, args, ctx) {
        user = User.create(
          email: args[:email],
          password: args[:password],
        )

        if user.valid?
          if args[:dashboardPagesString].nil?
            MutationHelper::create_default_dashboard_pages(user)
          else
            MutationHelper::parse_dashboard_pages_string(
              user,
              args[:dashboardPagesString],
            )
          end

          command = AuthenticateUser.call(args[:email], args[:password])

          if command.success?
            result = command.result
            return Auth.new(result[:user], result[:auth_token])
          end
        else
          return GraphQL::ExecutionError.new(user.errors.full_messages)
        end
      }
    end

    field :createDashboardItem, Types::UserType do
      # description ''

      argument :dashboardPageId, !types.ID
      argument :identifier, !types.String
      argument :w, !types.Int
      argument :h, !types.Int
      argument :x, !types.Int
      argument :y, !types.Int

      resolve -> (obj, args, ctx) {
        current_user = ctx[:current_user]
        if ctx[:current_user].nil?
          return GraphQL::ExecutionError.new('No current user')
        end

        dashboard_page = DashboardPage.find(args[:dashboardPageId])
        if dashboard_page.nil?
          return GraphQL::ExecutionError.new('Could not find dashboard page')
        end

        # TODO: verify that identifier arg is in whitelist.
        dashboard_item = DashboardItem.create(
          dashboard_page_id: dashboard_page.id,
          user_id: current_user.id,
          identifier: args[:identifier],
          w: args[:w],
          h: args[:h],
          x: args[:x],
          y: args[:y],
        )

        if dashboard_item.valid?
          current_user.reload
        else
          return GraphQL::ExecutionError.new('Failed to create dashboard item')
        end
      }
    end

    field :destroyDashboardItem, Types::UserType do
      # description ''

      argument :dashboardPageId, !types.ID
      argument :id, !types.ID

      resolve -> (obj, args, ctx) {
        current_user = ctx[:current_user]
        if ctx[:current_user].nil?
          return GraphQL::ExecutionError.new('No current user')
        end

        dashboard_page = DashboardPage.find(args[:dashboardPageId])
        if dashboard_page.nil?
          return GraphQL::ExecutionError.new('Could not find dashboard page')
        end

        dashboard_item = DashboardItem.find(args[:id])

        if dashboard_item.dashboard_page_id != dashboard_page.id
          return GraphQL::ExecutionError.new('Dashboard item does not belong to dashboard page')
        end

        if !dashboard_item.nil?
          dashboard_item.destroy
          if !dashboard_item.destroyed?
            return GraphQL::ExecutionError.new('Failed to destroy dashboard item')
          end
        end

        current_user.reload
      }
    end

    field :updateDashboardItem, Types::UserType do
      description 'Update the dashboard item of the dashboard page associated with given dashboard page id'

      argument :dashboardPageId, !types.ID
      argument :id, !types.ID
      argument :identifier, types.String
      argument :static, types.Boolean

      resolve -> (obj, args, ctx) {
        current_user = ctx[:current_user]
        if ctx[:current_user].nil?
          return GraphQL::ExecutionError.new('No current user')
        end

        dashboard_page = DashboardPage.find(args[:dashboardPageId])
        if dashboard_page.nil?
          return GraphQL::ExecutionError.new('Could not find dashboard page')
        end

        dashboard_item = DashboardItem.find(args[:id])
        if dashboard_item.nil?
          return GraphQL::ExecutionError.new('Could not find dashboard item')
        end

        if dashboard_item.dashboard_page_id != dashboard_page.id
          return GraphQL::ExecutionError.new('Dashboard item does not belong to dashboard page')
        end

        if !args[:identifier].nil?
          dashboard_item.identifier = args[:identifier]
        end
        if !args[:static].nil?
          dashboard_item.static = args[:static]
        end

        if dashboard_item.changed?
          if !dashboard_item.save
            return GraphQL::ExecutionError.new('Could not save dashboard item')
          end
        end

        current_user.reload
      }
    end

    field :updateDashboardItems, Types::UserType do
      description 'Updates the dashboard items of the dashboard page associated with given dashboard page id'

      argument :dashboardPageId, !types.ID
      argument :dashboardItemsString, !types.String

      resolve -> (obj, args, ctx) {
        current_user = ctx[:current_user]
        if ctx[:current_user].nil?
          return GraphQL::ExecutionError.new('No current user')
        end

        dashboard_page = DashboardPage.find(args[:dashboardPageId])
        if dashboard_page.nil?
          return GraphQL::ExecutionError.new('Could not find dashboard page')
        end

        dashboard_items_hashes = JSON.parse(args[:dashboardItemsString])
        dashboard_items_hashes.each do |dashboard_item_hash|
          dashboard_item_id = dashboard_item_hash['id']
          dashboard_item = DashboardItem.find(dashboard_item_id)

          if dashboard_item.dashboard_page_id != dashboard_page.id
            return GraphQL::ExecutionError.new('Dashboard item does not belong to dashboard page')
          end

          dashboard_item.assign_attributes(
            w: dashboard_item_hash['w'],
            h: dashboard_item_hash['h'],
            x: dashboard_item_hash['x'],
            y: dashboard_item_hash['y'],
            static: dashboard_item_hash['static'],
          )

          if dashboard_item.changed?
            if !dashboard_item.save
              return GraphQL::ExecutionError.new(dashboard_item.errors.full_messages)
            end
          end
        end

        current_user.reload
      }
    end
  end
end

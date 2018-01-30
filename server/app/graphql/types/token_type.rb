module Types
  TokenType = GraphQL::ObjectType.define do
    name 'TokenType'

    field :id, !types.ID
    field :identifier, !types.String do
      resolve -> (obj, args, ctx) {
        if obj.identifier.nil?
          ''
        else
          obj.identifier
        end
      }
    end
    field :shortName, !types.String, property: :short_name
    field :longName, !types.String, property: :long_name
    field :imageUrl, !types.String, property: :image_url
    field :website, !types.String
    field :priceUSD, !types.Float, property: :price_usd
    field :priceBTC, !types.Float, property: :price_btc
    # Deprecating :volumeUSD24h
    field :volumeUSD24h, !types.Float, property: :volume_usd_24h
    field :volume24hUSD, !types.Float, property: :volume_usd_24h
    field :marketCapUSD, !types.Float, property: :market_cap_usd
    field :availableSupply, !types.Float, property: :available_supply
    field :totalSupply, !types.Float, property: :total_supply
    field :maxSupply, !types.Float, property: :max_supply
    field :percentChange1h, !types.Float, property: :percent_change_1h
    field :percentChange24h, !types.Float, property: :percent_change_24h
    field :percentChange7d, !types.Float, property: :percent_change_7d
    field :percentChange1hUSD, !types.Float, property: :percent_change_1h
    field :percentChange24hUSD, !types.Float, property: :percent_change_24h
    field :percentChange7dUSD, !types.Float, property: :percent_change_7d

    field :priceETH, !types.Float do
      resolve -> (obj, args, ctx) {
        token_eth = Token.find_by_identifier('ethereum')
        obj.price_usd / token_eth.price_usd
      }
    end

    field :marketCapBTC, !types.Float do
      resolve -> (obj, args, ctx) {
        token_btc = Token.find_by_identifier('bitcoin')
        obj.market_cap_usd / token_btc.price_usd
      }
    end
    # Deprecating volumeBTC24h
    field :volumeBTC24h, !types.Float do
      resolve -> (obj, args, ctx) {
        token_btc = Token.find_by_identifier('bitcoin')
        obj.volume_usd_24h / token_btc.price_usd
      }
    end
    field :volume24hBTC, !types.Float do
      resolve -> (obj, args, ctx) {
        token_btc = Token.find_by_identifier('bitcoin')
        obj.volume_usd_24h / token_btc.price_usd
      }
    end
    field :percentChange1hBTC, !types.Float do
      resolve -> (obj, args, ctx) {
        token_btc = Token.find_by_identifier('bitcoin')
        token_btc_old_price = token_btc.price_usd / (1 + token_btc.percent_change_1h / 100.0)
        obj_old_price = obj.price_usd / (1 + obj.percent_change_1h / 100.0)
        obj_old_price_btc = obj_old_price / (token_btc_old_price + 0.00000001)
        ((obj.price_btc - obj_old_price_btc) / (obj_old_price_btc + 0.00000001) * 100).round(2)
      }
    end
    field :percentChange24hBTC, !types.Float do
      resolve -> (obj, args, ctx) {
        token_btc = Token.find_by_identifier('bitcoin')
        token_btc_old_price = token_btc.price_usd / (1 + token_btc.percent_change_24h / 100.0)
        obj_old_price = obj.price_usd / (1 + obj.percent_change_24h / 100.0)
        obj_old_price_btc = obj_old_price / (token_btc_old_price + 0.00000001)
        ((obj.price_btc - obj_old_price_btc) / (obj_old_price_btc + 0.00000001) * 100).round(2)
      }
    end
    field :percentChange7dBTC, !types.Float do
      resolve -> (obj, args, ctx) {
        token_btc = Token.find_by_identifier('bitcoin')
        token_btc_old_price = token_btc.price_usd / (1 + token_btc.percent_change_7d / 100.0)
        obj_old_price = obj.price_usd / (1 + obj.percent_change_7d / 100.0)
        obj_old_price_btc = obj_old_price / (token_btc_old_price + 0.00000001)
        ((obj.price_btc - obj_old_price_btc) / (obj_old_price_btc + 0.00000001) * 100).round(2)
      }
    end
    field :percentChange1hETH, !types.Float do
      resolve -> (obj, args, ctx) {
        token_eth = Token.find_by_identifier('ethereum')
        eth_price = obj.price_usd / token_eth.price_usd
        token_eth_old_price = token_eth.price_usd / (1 + token_eth.percent_change_1h / 100.0)
        obj_old_price = obj.price_usd / (1 + obj.percent_change_1h / 100.0)
        obj_old_price_eth = obj_old_price / (token_eth_old_price + 0.00000001)
        ((eth_price - obj_old_price_eth) / (obj_old_price_eth + 0.00000001) * 100).round(2)
      }
    end
    field :percentChange24hETH, !types.Float do
      resolve -> (obj, args, ctx) {
        token_eth = Token.find_by_identifier('ethereum')
        eth_price = obj.price_usd / token_eth.price_usd
        token_eth_old_price = token_eth.price_usd / (1 + token_eth.percent_change_24h / 100.0)
        obj_old_price = obj.price_usd / (1 + obj.percent_change_24h / 100.0)
        obj_old_price_eth = obj_old_price / (token_eth_old_price + 0.00000001)
        ((eth_price - obj_old_price_eth) / (obj_old_price_eth + 0.00000001) * 100).round(2)
      }
    end
    field :percentChange7dETH, !types.Float do
      resolve -> (obj, args, ctx) {
        token_eth = Token.find_by_identifier('ethereum')
        eth_price = obj.price_usd / token_eth.price_usd
        token_eth_old_price = token_eth.price_usd / (1 + token_eth.percent_change_7d / 100.0)
        obj_old_price = obj.price_usd / (1 + obj.percent_change_7d / 100.0)
        obj_old_price_eth = obj_old_price / (token_eth_old_price + 0.00000001)
        ((eth_price - obj_old_price_eth) / (obj_old_price_eth + 0.00000001) * 100).round(2)
      }
    end

    field :earliestMentionCountDate, types.String do
      description 'The date time of earliest mention count associated with token'

      resolve -> (obj, args, ctx) {
        time_zone = ctx[:time_zone]
        QueryHelper::get_earliest_instance_date(
          obj.mention_counts,
          time_zone,
        )
      }
    end

    field :keywords, types[Types::KeywordType] do
      description 'The keywords associated with token'

      resolve -> (obj, args, ctx) {
        obj.keywords
      }
    end

    field :markets, types[Types::MarketType] do
      description 'The markets associated with token'

      resolve -> (obj, args, ctx) {
        obj.markets
      }
    end

    field :mentionTotalCounts, types[Types::MentionTotalCountType] do
      description 'The mention counts across all subreddits associated with token'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        mention_counts = QueryHelper::filter_relation_by_time_range(
          obj.mention_counts,
          args[:timeRange]
        )

        timestamp_to_mention_counts = {}
        mention_counts.each do |mention_count|
          timestamp = mention_count.timestamp.to_s
          timestamp_to_mention_counts[timestamp] ||= MentionTotalCount.new(timestamp)
          timestamp_to_mention_counts[timestamp].increment_by(mention_count.count)
        end

        timestamp_to_mention_counts.keys.sort.map do |timestamp|
          timestamp_to_mention_counts[timestamp]
        end
      }
    end

    field :subredditMentions, types[Types::SubredditMentionType] do
      description 'The subreddit mentions associated with token'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        mention_counts = QueryHelper::filter_relation_by_time_range(
          obj.mention_counts,
          args[:timeRange]
        )

        subreddit_id_to_mention_counts = {}
        mention_counts.each do |mention_count|
          subreddit_id = mention_count.subreddit_id
          timestamp = mention_count.timestamp.to_s
          subreddit_id_to_mention_counts[subreddit_id] ||= {}
          subreddit_id_to_mention_counts[subreddit_id][timestamp] ||= MentionTotalCount.new(timestamp)
          subreddit_id_to_mention_counts[subreddit_id][timestamp].increment_by(mention_count.count)
        end

        subreddit_id_to_mention_counts.map do |subreddit_id, timestamp_to_mention_counts|
          subreddit = Subreddit.find(subreddit_id)
          mention_counts = timestamp_to_mention_counts.keys.sort.map do |timestamp|
            timestamp_to_mention_counts[timestamp]
          end
          SubredditMention.new(subreddit, mention_counts)
        end
      }
    end

    field :subreddits, types[Types::SubredditType] do
      description 'The subreddits associated with token'

      resolve -> (obj, args, ctx) {
        obj.subreddits
      }
    end
  end
end

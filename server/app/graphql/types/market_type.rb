module Types
  MarketType = GraphQL::ObjectType.define do
    name "Market"

    field :id, !types.ID
    field :name, !types.String
    field :lastPrice, !types.String do
      resolve -> (obj, args, ctx) {
        market_ticker = obj.market_tickers.order(timestamp: :desc).first
        if market_ticker.valid?
          market_ticker.value.to_s
        else
          '0'
        end
      }
    end
    field :updatedAt, !types.String do
      resolve -> (obj, args, ctx) {
        market_ticker = obj.market_tickers.order(timestamp: :desc).first
        if market_ticker.valid?
          market_ticker.created_at.to_s
        else
          obj.created_at.to_s
        end
      }
    end

    field :earliestMarketTickerDate, types.String do
      description 'The date time of earliest market ticker associated with market'

      resolve -> (obj, args, ctx) {
        QueryHelper::get_earliest_instance_date(obj.market_tickers)
      }
    end

    field :marketTickers, types[Types::MarketTickerType] do
      description 'The tickers associated with the market'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::filter_relation_by_time_range(
          obj.market_tickers,
          args[:timeRange],
          'max',
          7.days,
          :value
        )
      }
    end
  end
end

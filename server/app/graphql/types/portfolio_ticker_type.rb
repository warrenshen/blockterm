module Types
  PortfolioTickerType = GraphQL::ObjectType.define do
    name 'PortfolioTickerType'

    field :id, !types.ID
    field :userId, !types.ID, property: :user_id
    field :valueUSD, !types.Float, property: :value_usd
    field :valueBTC, !types.Float, property: :value_btc
    field :valueETH, !types.Float, property: :value_eth

    field :timestamp, !types.String do
      resolve -> (obj, args, ctx) {
        time_zone = ctx[:time_zone]
        QueryHelper::localize_timestamp(
          obj.timestamp,
          time_zone,
        ).to_s
      }
    end
  end
end

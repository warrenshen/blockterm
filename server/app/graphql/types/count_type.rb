module Types
  CountType = GraphQL::ObjectType.define do
    name 'CountType'

    field :id, !types.ID
    field :subredditId, !types.ID, property: :subreddit_id
    field :count, !types.Int
    field :timestamp do
      type !types.String

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

module Types
  MentionCountType = GraphQL::ObjectType.define do
    name 'MentionCountType'

    field :id, !types.ID
    field :keywordId, !types.ID, property: :keyword_id
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

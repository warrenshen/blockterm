module Types
  SubredditType = GraphQL::ObjectType.define do
    name "Subreddit"

    field :id, !types.ID
    field :name, !types.String
    field :description, !types.String
    field :blob, !types.String
    field :displayName, !types.String do
      description 'The display name of subreddit'

      resolve -> (obj, args, ctx) {
        obj.display_name
      }
    end
    field :startDate, !types.String do
      resolve -> (obj, args, ctx) {
        obj.start_date.to_s
      }
    end

    field :activeUserCounts, types[Types::ActiveUserCountType] do
      description 'The comment counts associated with subreddit'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::filter_relation_by_time_range(
          obj.active_user_counts,
          args[:timeRange]
        )
      }
    end

    field :commentCounts, types[Types::PostCountType] do
      description 'The comment counts associated with subreddit'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::filter_relation_by_time_range(
          obj.comment_counts,
          args[:timeRange]
        )
      }
    end

    field :postCounts, types[Types::PostCountType] do
      description 'The page counts associated with subreddit'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::filter_relation_by_time_range(
          obj.post_counts,
          args[:timeRange]
        )
      }
    end

    field :subscriberCounts, types[Types::SubscriberCountType] do
      description 'The subscriber counts associated with subreddit'

      resolve -> (obj, args, ctx) {
        obj.subscriber_counts.order(timestamp: :asc)
      }
    end

    field :tokens, types[Types::TokenType] do
      description 'The tokens associated with subreddit'

      resolve -> (obj, args, ctx) {
        obj.tokens
      }
    end
  end
end

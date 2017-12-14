module Types
  SubredditType = GraphQL::ObjectType.define do
    name "Subreddit"

    field :id, !types.ID
    field :name, !types.String
    field :description, !types.String
    field :blob, !types.String, property: :blob_camel_case
    field :displayName, !types.String, property: :display_name
    field :imageUrl, !types.String, property: :image_url
    field :startDate, !types.String do
      resolve -> (obj, args, ctx) {
        obj.start_date.to_s
      }
    end
    field :earliestActiveUserCountDate, types.String do
      description 'The date time of earliest active user count associated with subreddit'

      resolve -> (obj, args, ctx) {
        QueryHelper::get_earliest_instance_timestamp(obj.active_user_counts)
      }
    end
    field :earliestCommentCountDate, types.String do
      description 'The date time of earliest comment count associated with subreddit'

      resolve -> (obj, args, ctx) {
        QueryHelper::get_earliest_instance_timestamp(obj.comment_counts)
      }
    end
    field :earliestPostCountDate, types.String do
      description 'The date time of earliest post count associated with subreddit'

      resolve -> (obj, args, ctx) {
        QueryHelper::get_earliest_instance_timestamp(obj.post_counts)
      }
    end

    field :activeUserCounts, types[Types::CountType] do
      description 'The comment counts associated with subreddit'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::filter_relation_by_time_range(
          obj.active_user_counts,
          args[:timeRange]
        )
      }
    end

    field :commentCounts, types[Types::CountType] do
      description 'The comment counts associated with subreddit'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::filter_relation_by_time_range(
          obj.comment_counts,
          args[:timeRange]
        )
      }
    end

    field :postCounts, types[Types::CountType] do
      description 'The page counts associated with subreddit'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::filter_relation_by_time_range(
          obj.post_counts,
          args[:timeRange]
        )
      }
    end

    field :subscriberCounts, types[Types::CountType] do
      description 'The subscriber counts associated with subreddit'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::filter_relation_by_time_range(
          obj.subscriber_counts,
          args[:timeRange]
        )
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

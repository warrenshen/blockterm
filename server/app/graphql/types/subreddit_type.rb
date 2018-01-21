module Types
  SubredditType = GraphQL::ObjectType.define do
    name "Subreddit"

    field :id, !types.ID
    field :name, !types.String
    field :description, !types.String
    field :blob, !types.String, property: :blob_camel_case
    field :displayName, !types.String, property: :display_name
    field :imageUrl, !types.String, property: :image_url
    field :activeUserCount, types.Int, property: :active_user_count
    field :commentCount, types.Int, property: :comment_count
    field :postCount, types.Int, property: :post_count
    field :subscriberCount, types.Int, property: :subscriber_count
    field :startDate, !types.String do
      resolve -> (obj, args, ctx) {
         obj.start_date.to_s
      }
    end
    field :updatedAt, types.String do
      resolve -> (obj, args, ctx) {
        time_zone = ctx[:time_zone]
        QueryHelper::localize_timestamp(
          obj.updated_at,
          time_zone,
        ).to_s
      }
    end

    field :earliestActiveUserCountDate, types.String do
      description 'The date time of earliest active user count associated with subreddit'

      resolve -> (obj, args, ctx) {
        time_zone = ctx[:time_zone]
        QueryHelper::get_earliest_instance_date(
          obj.active_user_counts,
          time_zone,
        )
      }
    end
    field :earliestCommentCountDate, types.String do
      description 'The date time of earliest comment count associated with subreddit'

      resolve -> (obj, args, ctx) {
        time_zone = ctx[:time_zone]
        QueryHelper::get_earliest_instance_date(
          obj.comment_counts,
          time_zone,
        )
      }
    end
    field :earliestPostCountDate, types.String do
      description 'The date time of earliest post count associated with subreddit'

      resolve -> (obj, args, ctx) {
        time_zone = ctx[:time_zone]
        QueryHelper::get_earliest_instance_date(
          obj.post_counts,
          time_zone,
        )
      }
    end
    field :earliestSubscriberCountDate, types.String do
      description 'The date time of earliest subscriber count associated with subreddit'

      resolve -> (obj, args, ctx) {
        time_zone = ctx[:time_zone]
        QueryHelper::get_earliest_instance_date(
          obj.subscriber_counts,
          time_zone,
        )
      }
    end

    field :activeUserCounts, types[Types::CountType] do
      description 'The comment counts associated with subreddit'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::filter_relation_by_time_range(
          obj.active_user_counts,
          args[:timeRange],
          'max'
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

    field :commentCountsTwoWeeks, types[Types::CountType] do
      description 'The comment counts in last two weeks associated with subreddit'

      resolve -> (obj, args, ctx) {
        CommentCountsLoader.for(CommentCount).load(obj.id)
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
          args[:timeRange],
          'max'
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

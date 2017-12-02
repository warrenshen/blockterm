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
        time_range = args[:timeRange]
        today = Date.today
        clause = 'timestamp > ?'

        active_user_counts = obj.active_user_counts

        if time_range.nil? or time_range == 'ONE_WEEK'
          active_user_counts = active_user_counts.where(clause, today - 7.days)
        elsif time_range == 'ONE_MONTH'
          active_user_counts = active_user_counts.where(clause, today - 1.month)
        elsif time_range == 'THREE_MONTHS'
          active_user_counts = active_user_counts.where(clause, today - 3.months)
        elsif time_range == 'ONE_YEAR'
          active_user_counts = active_user_counts.where(clause, today - 1.year)
        end

        active_user_counts.order(timestamp: :asc)
      }
    end

    field :commentCounts, types[Types::PostCountType] do
      description 'The comment counts associated with subreddit'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        time_range = args[:timeRange]
        today = Date.today
        clause = 'timestamp > ?'

        comment_counts = obj.comment_counts

        if time_range.nil? or time_range == 'ONE_WEEK'
          comment_counts = comment_counts.where(clause, today - 7.days)
        elsif time_range == 'ONE_MONTH'
          comment_counts = comment_counts.where(clause, today - 1.month)
        elsif time_range == 'THREE_MONTHS'
          comment_counts = comment_counts.where(clause, today - 3.months)
        elsif time_range == 'ONE_YEAR'
          comment_counts = comment_counts.where(clause, today - 1.year)
        end

        comment_counts.order(timestamp: :asc)
      }
    end

    field :postCounts, types[Types::PostCountType] do
      description 'The page counts associated with subreddit'

      argument :timeRange, types.String

      resolve -> (obj, args, ctx) {
        time_range = args[:timeRange]
        today = Date.today
        clause = 'timestamp > ?'

        post_counts = obj.post_counts

        if time_range.nil? or time_range == 'ONE_WEEK'
          post_counts = post_counts.where(clause, today - 7.days)
        elsif time_range == 'ONE_MONTH'
          post_counts = post_counts.where(clause, today - 1.month)
        elsif time_range == 'THREE_MONTHS'
          post_counts = post_counts.where(clause, today - 3.months)
        elsif time_range == 'ONE_YEAR'
          post_counts = post_counts.where(clause, today - 1.year)
        end

        post_counts.order(timestamp: :asc)
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

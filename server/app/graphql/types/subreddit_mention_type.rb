module Types
  SubredditMentionType = GraphQL::ObjectType.define do
    name 'SubredditMentionType'

    field :subreddit do
      type !Types::SubredditType

      resolve -> (obj, args, ctx) {
        obj.subreddit
      }
    end

    field :mentionTotalCounts do
      type !types[Types::MentionTotalCountType]

      resolve -> (obj, args, ctx) {
        obj.mention_total_counts
      }
    end
  end
end

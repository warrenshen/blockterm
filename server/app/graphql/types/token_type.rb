module Types
  TokenType = GraphQL::ObjectType.define do
    name 'TokenType'

    field :id, !types.ID
    field :shortName, !types.String, property: :short_name
    field :longName, !types.String, property: :long_name
    field :imageUrl, !types.String, property: :image_url
    field :website, !types.String

    field :keywords, types[Types::KeywordType] do
      description 'The keywords associated with token'

      resolve -> (obj, args, ctx) {
        obj.keywords
      }
    end

    field :mentionTotalCounts, types[Types::MentionTotalCountType] do
      description 'The mention counts across all subreddits associated with token'

      resolve -> (obj, args, ctx) {
        today = Date.today

        mention_counts = obj.mention_counts.where('timestamp > ?', today - 1.month)

        timestamp_to_mention_counts = {}
        mention_counts.each do |mention_count|
          timestamp = mention_count.timestamp.to_s
          timestamp_to_mention_counts[timestamp] ||= MentionTotalCount.new(nil, timestamp)
          timestamp_to_mention_counts[timestamp].increment_by(mention_count.count)
        end

        timestamp_to_mention_counts.keys.sort.map do |timestamp|
          timestamp_to_mention_counts[timestamp]
        end
      }
    end

    field :subredditMentions, types[Types::SubredditMentionType] do
      description 'The subreddit mentions associated with token'

      resolve -> (obj, args, ctx) {
        today = Date.today

        mention_counts = obj.mention_counts.where('timestamp > ?', today - 1.month)

        subreddit_id_to_mention_counts = {}
        mention_counts.each do |mention_count|
          subreddit_id = mention_count.subreddit_id
          timestamp = mention_count.timestamp.to_s
          subreddit_id_to_mention_counts[subreddit_id] ||= {}
          subreddit_id_to_mention_counts[subreddit_id][timestamp] ||= MentionTotalCount.new(subreddit_id, timestamp)
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

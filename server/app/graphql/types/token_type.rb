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

    field :subreddits, types[Types::SubredditType] do
      description 'The subreddits associated with token'

      resolve -> (obj, args, ctx) {
        obj.subreddits
      }
    end
  end
end

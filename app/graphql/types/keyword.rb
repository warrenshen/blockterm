module Types
  KeywordType = GraphQL::ObjectType.define do
    name 'KeywordType'

    field :id, !types.ID

    field :token, Types::TokenType do
      description 'The token associated with keyword'

      resolve -> (obj, args, ctx) {
        obj.token
      }
    end

    field :mentionCounts, types[Types::MentionCount] do
      description 'The mention counts associated with keyword'

      resolve -> (obj, args, ctx) {
        obj.mention_counts
      }
    end
  end
end

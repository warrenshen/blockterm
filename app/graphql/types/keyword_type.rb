module Types
  KeywordType = GraphQL::ObjectType.define do
    name 'KeywordType'

    field :id, !types.ID
    field :word, !types.String

    field :mentionCounts, types[Types::MentionCountType] do
      description 'The mention counts associated with keyword'

      resolve -> (obj, args, ctx) {
        obj.mention_counts
      }
    end
  end
end

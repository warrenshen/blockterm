module Types
  MentionCountType = GraphQL::ObjectType.define do
    name 'MentionCountType'

    field :id, !types.ID
    field :keywordId, !types.ID, property: keyword_id
    field :subredditId, !types.ID, property: :subreddit_id
    field :when do
      type !types.String

      resolve -> (obj, args, ctx) {
        obj.when.to_s
      }
    end
    field :count, !types.Int
    field :createdAt do
      type !types.String

      resolve -> (obj, args, ctx) {
        obj.created_at.to_s
      }
    end
    field :updatedAt do
      type !types.String

      resolve -> (obj, args, ctx) {
        obj.updated_at.to_s
      }
    end
  end
end

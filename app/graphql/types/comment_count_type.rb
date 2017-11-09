module Types
  CommentCountType = GraphQL::ObjectType.define do
    name 'CommentCountType'

    field :id, !types.ID
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

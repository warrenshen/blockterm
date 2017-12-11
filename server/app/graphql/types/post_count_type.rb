module Types
  PostCountType = GraphQL::ObjectType.define do
    name 'PostCountType'

    field :id, !types.ID
    field :subredditId, !types.ID, property: :subreddit_id
    field :timestamp do
      type !types.String

      resolve -> (obj, args, ctx) {
        QueryHelper::localize_timestamp(obj.timestamp).to_s
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

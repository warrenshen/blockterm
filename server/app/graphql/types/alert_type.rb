module Types
  AlertType = GraphQL::ObjectType.define do
    name 'AlertType'

    field :id, !types.ID
    field :userId, !types.ID
    field :identifier, !types.String
    field :expiresAt, !types.String do
      description 'The expires at datetime of alert'

      resolve -> (obj, args, ctx) {
        time_zone = ctx[:time_zone]
        QueryHelper::localize_timestamp(
          obj.expires_at,
          time_zone,
        ).to_s
      }
    end
    field :createdAt, !types.String do
      description 'The created at datetime of alert'

      resolve -> (obj, args, ctx) {
        time_zone = ctx[:time_zone]
        QueryHelper::localize_timestamp(
          obj.created_at,
          time_zone,
        ).to_s
      }
    end

    field :createdAtUnix, !types.Int do
      description 'The created at datetime of alert in unix format'

      resolve -> (obj, args, ctx) {
        obj.created_at.utc
      }
    end
  end
end

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
          obj.last_active_at,
          time_zone,
        ).to_s
      }
    end
  end
end

module Types
  TokenType = GraphQL::ObjectType.define do
    name 'TokenType'

    field :id, !types.ID
    field :shortName, !types.String, property: :short_name
    field :longName, !types.String, property: :long_name

    field :keywords, types[Types::KeywordType] do
      description 'The keywords associated with token'

      resolve -> (obj, args, ctx) {
        obj.keywords
      }
    end
  end
end

class TokenSearch
  include SearchObject.module(:paging)

  scope { Token.all }

  per_page 100

  option(:price_usd) do |scope, value|
    value ? scope.order(price_usd: :desc) : scope
  end
end

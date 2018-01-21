class TokenSearch
  include SearchObject.module(:paging)
  include SearchObject.module(:sorting)

  scope { Token.where.not(identifier: nil) }

  per_page 50

  sort_by :volume_usd_24h
end

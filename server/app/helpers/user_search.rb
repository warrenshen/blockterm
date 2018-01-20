class UserSearch
  include SearchObject.module(:paging)
  include SearchObject.module(:sorting)

  scope { User.where_exists(:token_users) }

  per_page 6

  sort_by :last_active_at
end

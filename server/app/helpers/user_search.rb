class UserSearch
  include SearchObject.module(:paging)

  scope { User.where_exists(:token_users) }

  per_page 6
end

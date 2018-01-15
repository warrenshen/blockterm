class UserSearch
  include SearchObject.module(:paging)

  scope { User.all }

  per_page 12
end

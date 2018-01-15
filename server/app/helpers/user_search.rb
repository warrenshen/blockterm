class UserSearch
  include SearchObject.module(:paging)

  scope { User.all }

  per_page 6
end

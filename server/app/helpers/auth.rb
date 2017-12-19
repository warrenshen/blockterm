class Auth
  attr_reader :auth_token
  attr_reader :email

  def initialize(user, auth_token)
    @auth_token = auth_token
    @email = user.email
    self
  end
end

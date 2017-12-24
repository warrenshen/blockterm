class Auth
  attr_reader :auth_token
  attr_reader :user

  def initialize(user, auth_token)
    @auth_token = auth_token
    @user = user
    self
  end
end

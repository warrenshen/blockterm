Rails.application.routes.draw do
  get '/', to: 'static#health'
  get '/health', to: 'static#health'
  post '/graphql', to: 'graphql#execute'

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end
end

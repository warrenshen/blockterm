require 'graphql'
require 'graphql/batch'
require_relative './find_loader'
require_relative './foreign_key_loader'

BlocktermSchema = GraphQL::Schema.define do
  mutation(Types::MutationType)
  query(Types::QueryType)
end

BlocktermSchema.query_execution_strategy = GraphQL::Batch::ExecutionStrategy

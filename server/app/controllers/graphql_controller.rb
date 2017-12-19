class GraphqlController < ApplicationController
  def execute
    variables = ensure_hash(params[:variables])
    # Note that `current_user` can be nil.
    current_user = authorize_request

    query = params[:query]
    operation_name = params[:operationName]
    context = {
      current_user: current_user,
    }
    result = CryptoTrendsSchema.execute(
      query,
      {
        variables: variables,
        context: context,
        operation_name: operation_name,
      }
    )

    render json: result
  end

  private

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def authorize_request
    AuthorizeApiRequest.call(request.headers).result
  end
end

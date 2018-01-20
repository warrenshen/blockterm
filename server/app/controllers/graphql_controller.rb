class GraphqlController < ApplicationController

  def execute
    # Note that `current_user` can be nil.
    current_user = authorize_request
    time_zone = parse_request_time_zone

    if !current_user.nil?
      current_user.sync_last_active_at
    end

    context = {
      current_user: current_user,
      time_zone: time_zone,
    }

    # Apollo sends the params in a _json variable when batching is enabled.
    # Apollo Documentation about query batching: http://dev.apollodata.com/core/network.html#query-batching.
    if params[:_json]
      queries = params[:_json].map do |param|
        {
          context: context,
          operation_name: param[:operationName],
          query: param[:query],
          variables: ensure_hash(param[:variables]),
        }
      end
      result = BlocktermSchema.multiplex(queries)
    else
      result = BlocktermSchema.execute(
        params[:query],
        {
          context: context,
          operation_name: params[:operationName],
          variables: ensure_hash(params[:variables]),
        }
      )
    end

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

  def parse_request_time_zone
    request.headers.include?(['X-Time-Zone']) ? request.headers['X-Time-Zone'] : nil
  end
end

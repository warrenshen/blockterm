class StaticController < ApplicationController
  def health
    render json: { message: 'Health ok!' }, status: 200
  end
end

class Api::TherapistsController < ApplicationController
  RECORD_LIMIT = 10

  def index
    params = validate_params!(Api::TherapistSearchParamsSchema.new)
    render json: build_json_response(Therapist.search(params, limit: RECORD_LIMIT))
  end

  private

  def validate_params!(schema)
    result = schema.call(params.to_unsafe_h)
   
    if result.success?
      result.to_h
    else
      raise ActionController::BadRequest, 'Invalid HTTP parameters.'
    end
  end

  def build_json_response(query_result)
    {
      total: query_result[:total],
      pagination: query_result[:page_info],
      data: query_result[:page].map{|p| TherapistSerializer.new(p[:data]) }
    }
  end
end

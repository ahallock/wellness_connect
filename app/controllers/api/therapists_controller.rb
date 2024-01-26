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
      page_info: query_result[:page_info],
      data: query_result[:page].map do |page|
        therapist = page[:data]

        {
          id: therapist.id,
          first_name: therapist.first_name,
          last_name: therapist.last_name,
          telehealth: therapist.telehealth,
          profession: therapist.profession,
          license_valid: therapist.license_valid,
          website: therapist.website,
          email: therapist.email,
          bio: therapist.bio,
          phone: therapist.phone,
          avatar_url: therapist.avatar_url,
          offices: therapist.offices,
          insurance_providers: therapist.insurance_providers,
          credentials: therapist.credentials
        }
      end
    }
  end
end

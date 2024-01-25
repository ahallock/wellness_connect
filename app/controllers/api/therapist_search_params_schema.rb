module Api
  class TherapistSearchParamsSchema < ::Dry::Schema::Params
    define do
      optional(:offices).filled(:string)
      optional(:insurance_providers).filled(:string)
      optional(:telehealth).value(:bool)
      optional(:before).filled(:string)
      optional(:after).filled(:string)
    end
  end
end

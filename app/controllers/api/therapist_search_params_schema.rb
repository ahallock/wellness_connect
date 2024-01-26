module Api
  class TherapistSearchParamsSchema < ::Dry::Schema::Params
    define do
      optional(:office).filled(:string)
      optional(:insurance_provider).filled(:string)
      optional(:telehealth).value(:bool)
      optional(:before).filled(:string)
      optional(:after).filled(:string)
    end
  end
end

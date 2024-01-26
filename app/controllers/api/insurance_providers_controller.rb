class Api::InsuranceProvidersController < ApplicationController
  def index
    render json: InsuranceProvider.order(:name).all.map { |insurance_provider| { slug: insurance_provider.name.parameterize.underscore, name: insurance_provider.name } }
  end
end

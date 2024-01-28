class Api::InsuranceProvidersController < ApplicationController
  def index
    render json: InsuranceProvider.order(:name).all
  end
end

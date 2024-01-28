class Api::OfficesController < ApplicationController
  def index
    render json: Office.order(:name).all
  end
end

class Api::OfficesController < ApplicationController
  def index
    render json: Office.order(:name).all.map { |office| { slug: office.name.parameterize.underscore, name: office.name } }
  end
end

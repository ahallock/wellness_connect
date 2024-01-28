class InsuranceProviderSerializer < ActiveModel::Serializer
  attributes :name, :slug

  def slug
    object.name.parameterize.underscore
  end
end

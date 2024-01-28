class TherapistSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :telehealth, :profession, :license_valid, :website, :email, :bio, :phone, :avatar_url
  has_many :credentials
  has_many :insurance_providers
  has_many :offices
end

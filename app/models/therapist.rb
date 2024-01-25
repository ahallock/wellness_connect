class Therapist < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :telehealth, inclusion: [true, false]
  validates :profession, presence: true
  validates :license_valid, inclusion: [true, false]
  validates :website, presence: true
  validates :email, presence: true, format: { with: /@/}
  validates :bio, presence: true
  validates :phone, format: { with: /\A\+\d{1,3}\d{6,14}\z/, message: "should be in E.164 format" }
  validates :avatar_url, presence: true
end

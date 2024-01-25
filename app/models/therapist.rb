class Therapist < ApplicationRecord
  validates :first_name, presence: true, text_tier: { tier: :text_standard }
  validates :last_name, presence: true, text_tier: { tier: :text_standard }
  validates :telehealth, inclusion: [true, false]
  validates :profession, presence: true, text_tier: { tier: :text_standard }
  validates :license_valid, inclusion: [true, false]
  validates :website, presence: true, text_tier: { tier: :text_standard }
  validates :email, presence: true, format: { with: /@/}, text_tier: { tier: :text_standard }
  validates :bio, presence: true, text_tier: { tier: :text_long }
  validates :phone, format: { with: /\A\+\d{1,3}\d{6,14}\z/, message: "should be in E.164 format" }, text_tier: { tier: :text_standard }
  validates :avatar_url, presence: true, text_tier: { tier: :text_standard }
end

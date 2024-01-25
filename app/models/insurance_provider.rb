class InsuranceProvider < ApplicationRecord
  validates :name, presence: true, uniqueness: true, text_tier: { tier: :text_standard }
  validates :slug, presence: true, uniqueness: true, text_tier: { tier: :text_standard }
end

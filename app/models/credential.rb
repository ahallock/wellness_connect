class Credential < ApplicationRecord
  validates :name, presence: true, uniqueness: true, text_tier: { tier: :text_standard }
  validates :abbreviation, presence: true, uniqueness: true, text_tier: { tier: :text_standard }
end

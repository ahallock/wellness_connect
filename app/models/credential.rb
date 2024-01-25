class Credential < ApplicationRecord
  validates :abbreviation, presence: true, uniqueness: true, text_tier: { tier: :text_standard }
  validates :name, presence: true, text_tier: { tier: :text_standard }
end

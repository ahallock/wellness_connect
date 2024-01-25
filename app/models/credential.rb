class Credential < ApplicationRecord
  validates :abbreviation, presence: true, uniqueness: true, text_tier: { tier: :text_standard }
  validates :name, presence: true, text_tier: { tier: :text_standard }

  has_and_belongs_to_many :therapists
end

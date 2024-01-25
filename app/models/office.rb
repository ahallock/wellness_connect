class Office < ApplicationRecord
  validates :name, presence: true, uniqueness: true, text_tier: { tier: :text_standard }
end

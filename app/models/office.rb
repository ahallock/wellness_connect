class Office < ApplicationRecord
  validates :name, presence: true, uniqueness: true, text_tier: { tier: :text_standard }
  has_and_belongs_to_many :offices
end

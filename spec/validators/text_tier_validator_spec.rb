require 'rails_helper'

class TextTierValidatable
  include ActiveModel::Validations

  attr_accessor :standard_name, :long_name, :huge_name

  validates :standard_name, text_tier: { tier: :text_standard }
  validates :long_name, text_tier: { tier: :text_long }
  validates :huge_name, text_tier: { tier: :text_huge }
end

RSpec.describe TextTierValidator do
  let(:record) { TextTierValidatable.new }

  describe "#validate" do
    context 'when the attribute length is within the maximum' do
      before { record.standard_name = 'a' * TextTierValidator::TEXT_TIERS[:text_standard] }

      it 'does not add any errors' do
        record.validate
        expect(record.errors[:standard_name]).to be_empty
      end
    end

    context 'when the attribute length is above the maximum' do
      before { record.standard_name = 'a' * (TextTierValidator::TEXT_TIERS[:text_standard] + 1) }

      it 'adds an error' do
        record.validate
        expect(record.errors[:standard_name]).to include(
          "is too long (maximum is #{TextTierValidator::TEXT_TIERS[:text_standard]} characters)"
        )
      end
    end
  end
end

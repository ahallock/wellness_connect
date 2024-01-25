require "rails_helper"

RSpec.describe Therapist, type: :model do
  describe ".search" do

    context "when telehealth is true" do
      let(:params) { { telehealth: true } }
      let!(:therapist) { create(:therapist, telehealth: false) }
      let!(:therapist2) { create(:therapist, telehealth: true) }
      let(:result) { Therapist.search(params) }

      it "returns only the telehealth therapists" do
        expect(result[:page].first[:data]).to eq(therapist2)
        expect(result[:page].size).to eq(1)
      end
    end

    context "when offices are provided" do
      let!(:office) { create(:office) }
      let!(:therapist) { create(:therapist, offices: [office]) }
      let!(:therapist2) { create(:therapist) }
      let(:params) { { offices: ["The Bronx"] } }
      let(:result) { Therapist.search(params) }

      it "returns only the therapists with offices" do
        expect(result[:page].first[:data]).to eq(therapist)
        expect(result[:page].size).to eq(1)
      end
    end

    context "when insurance providers are provided" do
      let!(:insurance_provider) { create(:insurance_provider) }
      let!(:therapist) { create(:therapist, insurance_providers: [insurance_provider]) }
      let!(:therapist2) { create(:therapist) }
      let(:params) { { insurance_providers: ["Blue Cross"] } }
      let(:result) { Therapist.search(params) }

      it "returns only the therapists with insurance providers" do
        expect(result[:page].first[:data]).to eq(therapist)
        expect(result[:page].size).to eq(1)
      end
    end
  end
end


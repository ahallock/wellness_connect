require 'rails_helper'

RSpec.describe Api::TherapistsController, type: :controller do
  describe '#index' do
    context "when params are invalid" do
      it 'raises an error' do
        expect { get :index, params: { telehealth: "foo" } }.to raise_error(ActionController::BadRequest)
      end
    end

    context 'when params are valid' do
      it 'returns the therapists' do
        get :index
        expect(response).to have_http_status(:ok)
      end
    end
  end
end

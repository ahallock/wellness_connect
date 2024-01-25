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

  has_and_belongs_to_many :credentials
  has_and_belongs_to_many :insurance_providers
  has_and_belongs_to_many :offices

  def self.search(params, options = {})
    query = Therapist
    query = 
      query
      .preload(:offices)
      .preload(:insurance_providers)
      .preload(:credentials)

    query = query.where(telehealth: true) if params[:telehealth] == true

    if params[:offices].present?
      query =
        query
          .joins(:offices_therapists)
          .joins(:offices)
          .where(offices: { name: params[:offices] })
    end

    if params[:insurance_providers].present?
      query =
        query
          .joins(:insurance_providers_therapists)
          .joins(:insurance_providers)
          .where(insurance_providers: { name: params[:insurance_providers] })
    end

    RailsCursorPagination::Paginator.new(query, **params.slice(:before, :after)).fetch(with_total: true)
  end
end

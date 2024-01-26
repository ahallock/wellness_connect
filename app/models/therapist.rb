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

  def self.search(params, options = {limit: 10})
    query = Therapist
    query = 
      query
      .preload(:offices)
      .preload(:insurance_providers)
      .preload(:credentials)

    query = query.where(telehealth: true) if params[:telehealth] == true

    if params[:office].present?
      query =
        query
          .joins(:offices)
          .where(offices: { name: params[:office] })
    end

    if params[:insurance_provider].present?
      query =
        query
          .joins(:insurance_providers)
          .where(insurance_providers: { name: params[:insurance_provider] })
    end

    opts = options.merge(params.slice(:before, :after))

    RailsCursorPagination::Paginator.new(query, **opts).fetch(with_total: true)
  end
end

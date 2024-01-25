class AddInitialInsuranceProviders < ActiveRecord::Migration[7.1]
  def up
    InsuranceProvider.create(name: "UnitedHealth Group", slug: "unitedhealth")
    InsuranceProvider.create(name: "Optum", slug: "optum")
    InsuranceProvider.create(name: "Elevance Health", slug: "elevance")
    InsuranceProvider.create(name: "Centene", slug: "centene")
    InsuranceProvider.create(name: "Kaiser Permanente", slug: "kaiser")
    InsuranceProvider.create(name: "Humana", slug: "humana")
    InsuranceProvider.create(name: "CVS Health", slug: "cvs")
    InsuranceProvider.create(name: "HCSC", slug: "hcsc")
    InsuranceProvider.create(name: "Cigna", slug: "cigna")
    InsuranceProvider.create(name: "Molina Healthcare", slug: "molina")
    InsuranceProvider.create(name: "GuideWell", slug: "guidewell")
  end

  def down
    InsuranceProvider.delete_all
  end
end

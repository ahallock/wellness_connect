class AddInitialCredentials < ActiveRecord::Migration[7.1]
  def up
    Credential.create(name: "Licensed Professional Counselor", abbreviation: "LPC")
    Credential.create(name: "Licensed Marriage and Family Therapist", abbreviation: "LMFT")
    Credential.create(name: "Licensed Clinical Social Worker ", abbreviation: "LCSW")
    Credential.create(name: "Psychologist", abbreviation: "Ph.D.")
    Credential.create(name: "Psychologist", abbreviation: "Psy.D.")
    Credential.create(name: "Psychiatrist", abbreviation: "M.D.")
    Credential.create(name: "Psychiatrist", abbreviation: "D.O.")
    Credential.create(name: "Licensed Professional Clinical Counselor", abbreviation: "LPCC")
    Credential.create(name: "Certified Alcohol and Drug Counselor", abbreviation: "CADC")
    Credential.create(name: "Master of Social Work", abbreviation: "MSW")
    Credential.create(name: "Licensed Social Worker", abbreviation: "LSW")
  end

  def down
    Credential.delete_all
  end
end

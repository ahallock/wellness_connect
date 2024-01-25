require 'csv'

desc "Load sample therapists from CSV"

task :load_sample_therapists => :environment do
  offices = Office.all
  insurance_providers = InsuranceProvider.all
  credentials = Credential.all

  file_path = File.join(Rails.root, "lib", "tasks", "sample_therapists.csv")
  CSV.foreach(file_path, headers: true) do |row|
    therapist_offices = row["offices"].split(",").map{ |office_name| offices.find{ |o| o.name == office_name } }
    therapist_insurance_providers = row["insurance_providers"].split(",").map{ |provider_name| insurance_providers.find{ |p| p.name == provider_name } }
    therapist_credentials = row["credentials"].split(",").map{ |abbreviation| credentials.find{ |c| c.abbreviation == abbreviation } }
    Therapist.create!(
      first_name: row["first_name"],
      last_name: row["last_name"],
      telehealth: row["telehealth"],
      profession: row["profession"],
      license_valid: row["license_valid"],
      website: "https://example.com",
      email: "therapist@example.com",
      bio: row["bio"],
      phone: "+1555555555",
      avatar_url: row["gender"] == "male" ? "https://xsgames.co/randomusers/avatar.php?g=male" : "https://xsgames.co/randomusers/avatar.php?g=female",
      offices: therapist_offices,
      insurance_providers: therapist_insurance_providers,
      credentials: therapist_credentials
    )
  end
end

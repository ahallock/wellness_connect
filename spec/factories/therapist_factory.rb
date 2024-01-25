FactoryBot.define do
  factory :therapist do
    first_name { "John" }
    last_name  { "Doe" }
    telehealth { false }
    profession { "Doctor" }
    license_valid { true }
    website { "https://example.com" }
    email { "qB7kT@example.com" }
    bio { "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
    phone { "+1234567890" }
    avatar_url { "https://example.com/avatar.jpg" }
  end
end

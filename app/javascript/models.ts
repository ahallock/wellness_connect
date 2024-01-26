export interface Therapist {
  id: number;
  first_name: string;
  last_name: string;
  telehealth: boolean;
  profession: string;
  license_valid: boolean;
  website: string;
  email: string;
  bio: string;
  phone: string;
  avatar_url: string;
}

export interface Office {
  slug: string;
  name: string;
}

export interface InsuranceProvider {
  slug: string;
  name: string;
}

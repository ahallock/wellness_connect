const BASE_PATH = "/api";

import { InsuranceProvider, Office, Therapist, SearchResult } from "@/types";

export const fetchOffices = async () => {
  const response = await fetch(`${BASE_PATH}/offices`);
  return (await response.json()) as Office[];
}

export const fetchInsuranceProviders = async () => {
  const response = await fetch(`${BASE_PATH}/insurance_providers`);
  return (await response.json()) as InsuranceProvider[];
}

export const fetchTherapists = async (query: URLSearchParams) => {
  const response = await fetch(`${BASE_PATH}/therapists?${query.toString()}`);
  return await (response.json()) as SearchResult<Therapist>;
}

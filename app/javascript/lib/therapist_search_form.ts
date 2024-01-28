import { SearchState } from "@/lib/therapist_search_reducer";

export const buildQueryParams = (searchForm: SearchState) => {
  const params = new URLSearchParams();

  if (searchForm.telehealth) {
    params.append("telehealth", "true");
  }

  if (searchForm.office) {
    params.append("office", searchForm.office);
  }

  if (searchForm.insuranceProvider) {
    params.append("insurance_provider", searchForm.insuranceProvider);
  }

  if (searchForm.after) {
    params.append("after", searchForm.after);
  }

  if (searchForm.before) {
    params.append("before", searchForm.before);
  }

  return params;
}

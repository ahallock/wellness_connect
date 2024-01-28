import React, { useEffect, useReducer, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { InsuranceProviderCombobox } from "@/components/InsuranceProviderCombobox";
import { OfficeCombobox }from "@/components/OfficeCombobox";
import TherapistList from "@/components/TherapistList";
import Pagination, { PaginationProps } from "@/components/Pagination";
import { InsuranceProvider, Office, Therapist, SearchResult } from "@/types";
import { fetchOffices, fetchInsuranceProviders, fetchTherapists } from "@/lib/api";
import { buildQueryParams, SearchForm } from "@/lib/therapist_search_form";
import therapistSearchReducer from "@/lib/therapist_search_reducer";

const TherapistSearch = () => {
  const [searchForm, dispatch] = useReducer(therapistSearchReducer, {
    telehealth: false,
    office: null,
    insuranceProvider: null,
    after: null,
    before: null
  })

  const { data: searchResult, isLoading } = useQuery({
    queryKey: ["therapists", { searchForm }],
    queryFn: () => fetchTherapists(buildQueryParams(searchForm))
  })

  const { data: insuranceProviders } = useQuery({
    queryKey: ["insuranceProviders"],
    queryFn: fetchInsuranceProviders
  });

  const { data: offices } = useQuery({
    queryKey: ["offices"],
    queryFn: fetchOffices
  });

  return (
    <>
      <div className="flex items-center gap-2 mb-6 px-4 py-3 sm:px-6">
        <OfficeCombobox
          offices={offices || []}
          onChange={(slug) => { dispatch({ type: "set_office", payload: offices?.find(office => office.slug === slug)?.name }) }} />
        <InsuranceProviderCombobox
          insuranceProviders={insuranceProviders || []}
          onChange={(slug) => { dispatch({ type: "set_insurance_provider", payload: insuranceProviders?.find(insuranceProvider => insuranceProvider.slug === slug)?.name }) }} />
        <div className="flex items-center space-x-2">
          <Switch id="telehealth" checked={searchForm.telehealth} onCheckedChange={() => dispatch({ type: "toggle_telehealth" })} />
          <Label htmlFor="telehealth">Offers remote sessions</Label>
        </div>
      </div>

      <TherapistList isLoading={isLoading} therapists={searchResult?.data || []} />

      <div className="mt-6">
        {!isLoading &&
          <Pagination
            total={searchResult.total}
            hasPreviousPage={searchResult.pagination.has_previous_page}
            hasNextPage={searchResult.pagination.has_next_page}
            startCursor={searchResult.pagination.start_cursor}
            endCursor={searchResult.pagination.end_cursor}
            onNextPage={() => dispatch({ type: "set_after", payload: searchResult.pagination.end_cursor })}
            onPreviousPage={() => dispatch({ type: "set_before", payload: searchResult.pagination.start_cursor })}
          />
        }
      </div>
    </>
  )  
}

export default TherapistSearch

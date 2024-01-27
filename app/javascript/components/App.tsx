import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import TherapistList from "@/components/TherapistList";
import Pagination, { PaginationProps } from "@/components/Pagination";
import { OfficeCombobox }from "@/components/OfficeCombobox";
import { InsuranceProviderCombobox } from "@/components/InsuranceProviderCombobox";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Toaster } from "@/components/ui/sonner"
import { InsuranceProvider, Office, Therapist } from "@/models";
import { toast } from "sonner"

interface AppProps {
  arg: string;
}

const BASE_PATH = "/api"

interface SearchResult {
  total: number;
  data: Therapist[];
  page_info: {
    has_previous_page: boolean;
    has_next_page: boolean;
    start_cursor: string;
    end_cursor: string;
  }
}

interface SearchForm {
  telehealth: boolean;
  office: string | null;
  insurance_provider: string | null;
  after: string | null;
  before: string | null;
  data: Therapist[] | null;
  total: number | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
  shouldFetch: boolean;
}

const App = ({ arg }: AppProps) => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [insuranceProviders, setInsuranceProviders] = useState<InsuranceProvider[]>([]);
  const [searchForm, setSearchForm] = useState<SearchForm>({
    telehealth: false,
    office: null,
    insuranceProvider: null,
    after: null,
    before: null,
    data: null,
    total: null,
    hasPreviousPage: false,
    hasNextPage: false,
    startCursor: null,
    endCursor: null,
    shouldFetch: true,
  });

  const handleTelehealthChange = (toggle: boolean) => {
    setSearchForm({ ...searchForm, telehealth: toggle, before: null, after: null, shouldFetch: true });
  }

  const handleOfficeChange = (val: string) => {
    const office = offices.find((office) => office.slug === val)?.name;
    setSearchForm({ ...searchForm, office: office, before: null, after: null, shouldFetch: true });
  }

  const handleInsuranceProviderChange = (val: string) => {
    const insuranceProvider = insuranceProviders.find((insuranceProvider) => insuranceProvider.slug === val)?.name;
    setSearchForm({ ...searchForm, insuranceProvider: insuranceProvider, before: null, after: null, shouldFetch: true });
  }

  const handleNextPage = (val: string) => {
    setSearchForm({ ...searchForm, after: val, before: null, shouldFetch: true });
  }

  const handlePreviousPage = (val: string) => {
    setSearchForm({ ...searchForm, before: val, after: null, shouldFetch: true });
  }

  useEffect(() => {
    const fetchOffices = async() => {
      try {
        const response = await fetch(`${BASE_PATH}/offices`);
        const result = await response.json() as Office[];
        setOffices(result);
      } catch (e: any) {
        toast("Something went wrong")
      } 
    }

    fetchOffices();
  }, [])

  useEffect(() => {
    const fetchInsuranceProviders = async() => {
      try {
        const response = await fetch(`${BASE_PATH}/insurance_providers`);
        const result = await response.json() as InsuranceProvider[];
        setInsuranceProviders(result);
      } catch (e: any) {
        toast("Something went wrong")
      } 
    }

    fetchInsuranceProviders();
  }, [])

  const buildQueryParams = () => {
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

  useEffect(() => {
    const fetchTherapists = async() => {
      try {
        const params = buildQueryParams();
        const response = await fetch(`${BASE_PATH}/therapists?${params.toString()}`);
        const result = await response.json() as SearchResult;
        setSearchForm(prev => ({
          ...prev,
          data: result.data,
          total: result.total,
          hasPreviousPage: result.page_info.has_previous_page,
          hasNextPage: result.page_info.has_next_page,
          startCursor: result.page_info.start_cursor,
          endCursor: result.page_info.end_cursor,
          shouldFetch: false
        }));
      } catch (e: any) {
        toast("Something went wrong")
      }
    }

    if (searchForm.shouldFetch) {
      fetchTherapists();
    }
  }, [searchForm.shouldFetch]);
    
  return (
    <>
      <div className="flex items-center gap-2 mb-6 px-4 py-3 sm:px-6">
        <OfficeCombobox offices={offices} onChange={handleOfficeChange} />
        <InsuranceProviderCombobox insuranceProviders={insuranceProviders} onChange={handleInsuranceProviderChange} />
        <div className="flex items-center space-x-2">
          <Switch id="telehealth" checked={searchForm.telehealth} onCheckedChange={handleTelehealthChange} />
          <Label htmlFor="telehealth">Offers remote sessions</Label>
        </div>
      </div>

      <TherapistList isLoading={searchForm.shouldFetch} therapists={searchForm.data || []} />

      <div className="mt-6">
        {!searchForm.shouldFetch &&
          <Pagination
            total={searchForm.total}
            hasPreviousPage={searchForm.hasPreviousPage}
            hasNextPage={searchForm.hasNextPage}
            startCursor={searchForm.startCursor}
            endCursor={searchForm.endCursor}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        }
      </div>
      <Toaster />
    </>
  )
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  createRoot(rootEl).render(<App />);
});

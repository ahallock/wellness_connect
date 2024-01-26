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

const App = ({ arg }: AppProps) => {
  const [searchResult, setSearchResult] = useState<SearchResult>({});
  const [isLoading, setIsLoading] = useState(false);
  const [telehealth, setTelehealth] = useState(false);
  const [office, setOffice] = useState<string | null>(null);
  const [offices, setOffices] = useState<Office[]>([]);
  const [insuranceProvider, setInsuranceProvider] = useState<string | null>(null);
  const [insuranceProviders, setInsuranceProviders] = useState<InsuranceProvider[]>([]);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const handleTelehealthChange = (toggle: boolean) => {
    setTelehealth(toggle);
  }

  const handleOfficeChange = (val: string) => {
    setOffice(offices.find((office) => office.slug === val)?.name)
  }

  const handleInsuranceProviderChange = (val: string) => {
    setInsuranceProvider(insuranceProviders.find((insuranceProvider) => insuranceProvider.slug === val)?.name)
  }

  const handleNextPage = (val: string) => {
    setPreviousPage(null);
    setNextPage(val);
  }

  const handlePreviousPage = (val: string) => {
    setNextPage(null);
    setPreviousPage(val);
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
    if (telehealth) {
      params.append("telehealth", "true");
    }
    if (office) {
      params.append("office", office);
    }
    if (insuranceProvider) {
      params.append("insurance_provider", insuranceProvider);
    }
    if (nextPage) {
      params.append("after", nextPage);
    }
    if (previousPage) {
      params.append("before", previousPage);
    }
    return params;
  }

  useEffect(() => {
    const fetchTherapists = async() => {
      setIsLoading(true);
      try {
        const params = buildQueryParams();
        const response = await fetch(`${BASE_PATH}/therapists?${params.toString()}`);
        const result = await response.json() as SearchResult;
        setSearchResult(result);
      } catch (e: any) {
        toast("Something went wrong")
      } finally {
        setIsLoading(false);
      }
    }
    fetchTherapists();
  }, [telehealth, offices, office, insuranceProviders, insuranceProvider, previousPage, nextPage]);
    
  return (
    <>
      <div className="flex items-center gap-2 mb-6 px-4 py-3 sm:px-6">
        <OfficeCombobox offices={offices} onChange={handleOfficeChange} />
        <InsuranceProviderCombobox insuranceProviders={insuranceProviders} onChange={handleInsuranceProviderChange} />
        <div className="flex items-center space-x-2">
          <Switch id="telehealth" checked={telehealth} onCheckedChange={handleTelehealthChange} />
          <Label htmlFor="telehealth">Offers remote sessions</Label>
        </div>
      </div>

      <TherapistList isLoading={isLoading} therapists={searchResult.data || []} />

      <div className="mt-6">
        {!isLoading &&
          <Pagination
            total={searchResult.total}
            hasPreviousPage={searchResult.page_info?.has_previous_page}
            hasNextPage={searchResult.page_info?.has_next_page}
            startCursor={searchResult.page_info?.start_cursor}
            endCursor={searchResult.page_info?.end_cursor}
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

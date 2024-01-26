import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import TherapistList from "@/components/TherapistList";
import Pagination from "@/components/Pagination";
import { OfficeCombobox }from "@/components/OfficeCombobox";
import { InsuranceProviderCombobox } from "@/components/InsuranceProviderCombobox";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Toaster } from "@/components/ui/sonner"
import { Therapist } from "@/models";
import { toast } from "sonner"

interface AppProps {
  arg: string;
}

const BASE_PATH = "/api"

interface SearchResult {
  total: number;
  data: Therapist[];
}

const App = ({ arg }: AppProps) => {
  const [searchResult, setSearchResult] = useState<SearchResult>({});
  const [isLoading, setIsLoading] = useState(false);
  const [telehealth, setTelehealth] = useState(false);

  const handleTelehealthChange = (toggle: boolean) => {
    setTelehealth(toggle);
  }

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_PATH}/therapists?telehealth=${telehealth}`);
        const result = await response.json() as SearchResult;
        setSearchResult(result);
      } catch (e: any) {
        toast("Something went wrong")
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [telehealth]);
    
  return (
    <>
      <div className="flex items-center gap-2 mb-6 px-4 py-3 sm:px-6">
        <OfficeCombobox />
        <InsuranceProviderCombobox />
        <div className="flex items-center space-x-2">
          <Switch id="telehealth" checked={telehealth} onCheckedChange={handleTelehealthChange} />
          <Label htmlFor="telehealth">Offers remote sessions</Label>
        </div>
      </div>

      <TherapistList isLoading={isLoading} therapists={searchResult.data || []} />

      <div className="mt-6">
        {!isLoading && <Pagination total={searchResult.total} />}
      </div>
      <Toaster />
    </>
  )
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  createRoot(rootEl).render(<App />);
});

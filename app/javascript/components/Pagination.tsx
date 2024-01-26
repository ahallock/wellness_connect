import * as React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  total: number;
}

const Pagination = ({ total }: PaginationProps) => {
  return (
   <nav
      className="flex items-center justify-between bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
    <div className="hidden sm:block">
      <p className="text-sm text-gray-700">
        <span className="font-medium">{total}</span> results
      </p>
    </div>
    <div className="flex flex-1 justify-between sm:justify-end gap-2">
      <Button variant="outline">Previous</Button>
      <Button variant="outline">Next</Button>
    </div>
  </nav>
  ) 
}

export default Pagination

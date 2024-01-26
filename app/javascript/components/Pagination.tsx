import * as React from "react";
import { Button } from "@/components/ui/button";

export interface PaginationProps {
  total: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
  onNextPage: (cursor: string) => void;
  onPreviousPage: (cursor: string) => void;
}

const Pagination = ({ total, hasPreviousPage, hasNextPage, startCursor, endCursor, onNextPage, onPreviousPage }: PaginationProps) => {
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
      {hasPreviousPage && <Button variant="outline" onClick={() => onPreviousPage(startCursor)}>Previous</Button>}
      {hasNextPage && <Button variant="outline" onClick={() => onNextPage(endCursor)}>Next</Button>}
    </div>
  </nav>
  ) 
}

export default Pagination

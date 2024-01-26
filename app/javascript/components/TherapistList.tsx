import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Therapist } from "@/models";
import SkeletonRow from "@/components/ui/skeleton_row"

const TherapistList = ({ therapists, isLoading }: { therapists: Therapist[], isLoading: boolean }) => {
  return (
    <>
      {isLoading ? (
        <>
          <SkeletonRow />
          <div className="mt-6">
            <SkeletonRow />
          </div>
          <div className="mt-6">
            <SkeletonRow />
          </div>
          <div className="mt-6">
            <SkeletonRow />
          </div>
        </>
       ) : (
        <ul
          role="list"
          className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
        >
          {therapists.map((therapist) => (
            <li key={`therapist-${therapist.id}`} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
              <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={therapist.avatar_url} alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={therapist.website}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {therapist.first_name} {therapist.last_name}
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    {therapist.profession}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <ChevronRight className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>
       )}
    </>
  )
}

export default TherapistList

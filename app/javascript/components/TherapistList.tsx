import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Therapist } from "@/models";
import SkeletonRow from "@/components/ui/skeleton_row"
import TherapistSlideover from "@/components/TherapistSlideover"

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
            <TherapistSlideover key={`therapist-${therapist.id}`} therapist={therapist} />
          ))}
        </ul>
       )}
    </>
  )
}

export default TherapistList

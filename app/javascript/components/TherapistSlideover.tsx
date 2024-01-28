import React from 'react'
import { ChevronRight } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Therapist } from '@/types'

const TherapistSlideover = ({ therapist }: { therapist: Therapist }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <li key={`therapist-row-${therapist.id}`} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={therapist.avatar_url} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <span className="absolute inset-x-0 -top-px bottom-0" />
                {therapist.first_name} {therapist.last_name}
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
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl p-0">
        <SheetHeader className="px-4 py-6 sm:px-6">
          <SheetTitle>
            Profile
          </SheetTitle>
        </SheetHeader>
        <div>
          <div className="pb-1 sm:pb-6">
            <div>
              <div className="relative h-40 sm:h-56">
                <img className="absolute h-full w-full object-cover" src={therapist.avatar_url} alt=""/>
              </div>
              <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                <div className="sm:flex-1">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{therapist.first_name} {therapist.last_name}</h3>
                      <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                        <span className="sr-only">Online</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{therapist.email}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                    <button type="button" className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1">Message</button>
                    <a href={`tel:${therapist.phone}`} className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Call</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
              <div>
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Profession</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <p>{therapist.profession}</p>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Credentials</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {therapist.credentials.map((credential) => credential.abbreviation).join(', ')}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Bio</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <p>{therapist.bio}</p>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Offices</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{therapist.offices.map((office) => office.name).join(', ')}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Website</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <a href={therapist.website} target="_blank" rel="noreferrer">{therapist.website}</a>
                 </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Insurance</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {therapist.insurance_providers.map((insurance) => insurance.name).join(', ')}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Offers Remote Sessions (telehealth)</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {therapist.telehealth ? 'Yes' : 'No'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )   
}

export default TherapistSlideover

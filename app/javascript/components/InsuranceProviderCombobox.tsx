import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { InsuranceProvider } from "@/models"

export function InsuranceProviderCombobox({ insuranceProviders, onChange }: { insuranceProviders: InsuranceProvider[], onChange: (val: string) => void }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? insuranceProviders.find((insuranceProvider) => insuranceProvider.slug === value)?.name
            : "Insurance"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search insurance..." />
          <CommandEmpty>No insurance found.</CommandEmpty>
          <CommandGroup>
            {insuranceProviders.map((insuranceProvider) => (
              <CommandItem
                key={insuranceProvider.slug}
                value={insuranceProvider.slug}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  onChange(currentValue === value ? null : currentValue)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === insuranceProvider.slug ? "opacity-100" : "opacity-0"
                  )}
                />
                {insuranceProvider.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

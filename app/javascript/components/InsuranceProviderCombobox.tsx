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

const insurance_providers = [
  {
    value: "humana",
    label: "Humana",
  },
  {
    value: "bluecross",
    label: "Blue Cross",
  },
]

export function InsuranceProviderCombobox() {
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
            ? insurance_providers.find((insurance_provider) => insurance_provider.value === value)?.label
            : "Insurance"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search insurance..." />
          <CommandEmpty>No insurance_provider found.</CommandEmpty>
          <CommandGroup>
            {insurance_providers.map((insurance_provider) => (
              <CommandItem
                key={insurance_provider.value}
                value={insurance_provider.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === insurance_provider.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {insurance_provider.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}



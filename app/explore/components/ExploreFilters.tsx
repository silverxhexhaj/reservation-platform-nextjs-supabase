"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ExploreFiltersProps {
  categories: string[]
}

export function ExploreFilters({ categories }: ExploreFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
      <Input
        placeholder="Search businesses..."
        className="flex-1"
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => {
          const newQs = createQueryString("search", e.target.value)
          router.push(`/explore${newQs ? `?${newQs}` : ""}`)
        }}
      />
      
      <Select
        defaultValue={searchParams.get("category") ?? "all"}
        onValueChange={(value) => {
          const newQs = createQueryString("category", value)
          router.push(`/explore${newQs ? `?${newQs}` : ""}`)
        }}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem 
              key={category} 
              value={category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}
            >
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="secondary"
        onClick={() => router.push("/explore")}
      >
        Reset Filters
      </Button>
    </div>
  )
} 
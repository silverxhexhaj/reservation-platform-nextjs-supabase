"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useCallback } from "react"
import { Input } from "@/app/components/ui/input"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { FilterModal } from "./FilterModal"

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
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex gap-3 w-full"
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          placeholder="Search businesses..."
          className="w-full pl-10 pr-4"
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => {
            router.push(`/pages/public/explore?search=${e.target.value}`)
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <FilterModal categories={categories} />
      </motion.div>
    </motion.div>
  )
} 
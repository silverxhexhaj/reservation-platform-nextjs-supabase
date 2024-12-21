"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useCallback } from "react"
import { Input } from "@/app/components/ui/input"
import { motion } from "framer-motion"

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
      className="flex flex-col sm:flex-row gap-4"
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1"
      >
        <Input
          placeholder="Search businesses..."
          className="w-full"
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => {
            const newQs = createQueryString("search", e.target.value)
            router.push(`/explore${newQs ? `?${newQs}` : ""}`)
          }}
        />
      </motion.div>
    </motion.div>
  )
} 
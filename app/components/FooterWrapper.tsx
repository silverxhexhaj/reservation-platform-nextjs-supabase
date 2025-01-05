'use client'

import { usePathname } from 'next/navigation'
import { Footer } from './Footer'

export function FooterWrapper() {
  const pathname = usePathname()
  // Hide footer only on private/business pages
  const hideFooter = pathname.includes('/private/business')
  
  if (hideFooter) {
    return null
  }
  
  return <Footer />
} 
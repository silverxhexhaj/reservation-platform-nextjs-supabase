import type { Metadata, Viewport } from 'next'
import { sharedMetadata, sharedViewport } from '@/app/config/shared-metadata'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Sign In - Noorlife',
}

export const viewport: Viewport = sharedViewport 
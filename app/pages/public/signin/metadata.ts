import type { Metadata, Viewport } from 'next'
import { sharedMetadata, sharedViewport } from '@/app/config/shared-metadata'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Sign In - Nooor',
  description: 'Sign in to your account',
}

export const viewport: Viewport = sharedViewport 
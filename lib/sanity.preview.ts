// This file should only be imported by client components, it'll throw if imported to a Server Component

import { createPreviewHook } from '../components/PreviewMode/createPreviewStore'
import { sanityConfig } from './config'

export const usePreview = createPreviewHook({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  documentLimit: 5000,
  subscriptionThrottleMs: 1,
})

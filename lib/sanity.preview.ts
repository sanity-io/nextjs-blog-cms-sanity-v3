import { createPreviewHook } from '../components/PreviewMode/createPreviewStore'
import { sanityConfig } from './config'

export const usePreview = createPreviewHook({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  documentLimit: 5000,
  subscriptionThrottleMs: 1,
})

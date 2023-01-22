import type {ComponentType} from 'react'
import {Plugin as Plugin_2} from 'sanity'

declare interface VisionConfig {
  defaultApiVersion: string
  defaultDataset?: string
}

export declare const visionTool: Plugin_2<void | VisionToolConfig>

export declare interface VisionToolConfig extends Partial<VisionConfig> {
  name?: string
  title?: string
  icon?: ComponentType
}

export {}

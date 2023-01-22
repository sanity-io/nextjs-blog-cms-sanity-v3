export interface SanityProjectDetails {
  projectId: string
  dataset: string
}

export interface PathBuilderOptions extends Partial<SanityProjectDetails> {
  useVanityName?: boolean
}

export type SanityAssetIdParts = SanityFileAssetIdParts | SanityImageAssetIdParts
export type SanityAssetUrlParts = SanityFileUrlParts | SanityImageUrlParts

export interface SanityImageAssetIdParts {
  type: 'image'
  assetId: string
  extension: string
  width: number
  height: number
}

export interface SanityImageUrlParts extends SanityProjectDetails, SanityImageAssetIdParts {
  vanityFilename?: string
}

export interface ImageUrlBuilderOptions extends Partial<SanityProjectDetails> {
  assetId: string
  extension: string
  metadata: {
    dimensions: {
      width: number
      height: number
    }
  }

  // Serves of aliases of eachother, prefers `vanityFilename` if both are set
  originalFilename?: string
  vanityFilename?: string
}

export interface SanityFileAssetIdParts {
  type: 'file'
  assetId: string
  extension: string
}

export interface SanityFileUrlParts extends SanityProjectDetails, SanityFileAssetIdParts {
  vanityFilename?: string
}

export interface FileUrlBuilderOptions extends Partial<SanityProjectDetails> {
  assetId: string
  extension: string

  // Serves of aliases of eachother, prefers `vanityFilename` if both are set
  originalFilename?: string
  vanityFilename?: string
}

export type SanityAssetSource = SanityFileSource | SanityImageSource

export type SanityFileSource =
  | string
  | SanityReference
  | SanityFileAsset
  | SanityAssetIdStub
  | SanityAssetUrlStub
  | SanityAssetPathStub
  | SanityFileObjectStub

export type SanityImageSource =
  | string
  | SanityReference
  | SanityImageAsset
  | SanityAssetIdStub
  | SanityAssetUrlStub
  | SanityAssetPathStub
  | SanityImageObjectStub

export type SanitySwatchName =
  | 'darkMuted'
  | 'darkVibrant'
  | 'dominant'
  | 'lightMuted'
  | 'lightVibrant'
  | 'muted'
  | 'vibrant'

export interface Rectangle {
  x: number
  y: number
  width: number
  height: number
}

export interface AbsoluteRectangle {
  top: number
  left: number
  right: number
  bottom: number
}

export interface SanityReference {
  _ref: string
  _weak?: boolean
}

export interface SanityAssetIdStub {
  _id: string
}

export interface SanityAssetPathStub {
  path: string
}

export interface SanityAssetUrlStub {
  url: string
}

export interface SanityAsset {
  _id: string
  _type: string
  url: string
  path: string
  assetId: string
  extension: string
  originalFilename?: string
}

export type SanityImageAsset = SanityAsset & {
  _type: 'sanity.imageAsset'
  metadata: SanityImageMetadata
}

export type SanityFileAsset = SanityAsset & {
  _type: 'sanity.fileAsset'
  metadata: {[key: string]: unknown}
}

export interface SanityImageMetadata {
  dimensions: SanityImageDimensions
  lqip?: string
  blurHash?: string
  palette?: SanityImagePalette
  [key: string]: unknown
}

export interface SanityImageSize {
  height: number
  width: number
}

export type SanityImageDimensions = SanityImageSize & {
  aspectRatio: number
}

export interface SanityImageCrop {
  _type?: string
  left: number
  bottom: number
  right: number
  top: number
}

export interface SanityImageHotspot {
  _type?: string
  width: number
  height: number
  x: number
  y: number
}

export interface SanityFileObjectStub {
  _type?: string
  asset:
    | SanityReference
    | SanityFileAsset
    | SanityAssetIdStub
    | SanityAssetPathStub
    | SanityAssetUrlStub
  [key: string]: unknown
}

export interface SanityImageObjectStub {
  _type?: string
  asset:
    | SanityReference
    | SanityImageAsset
    | SanityAssetIdStub
    | SanityAssetPathStub
    | SanityAssetUrlStub
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
  [key: string]: unknown
}

export interface ResolvedSanityImage {
  _type?: string
  asset: SanityImageAsset
  crop: SanityImageCrop
  hotspot: SanityImageHotspot
  [key: string]: unknown
}

export interface ResolvedSanityFile {
  _type?: string
  asset: SanityFileAsset
  [key: string]: unknown
}

export type SanityAssetObjectStub = SanityFileObjectStub | SanityImageObjectStub

export interface SanityImagePalette {
  _type?: string
  darkMuted?: SanityImageSwatch
  darkVibrant?: SanityImageSwatch
  dominant?: SanityImageSwatch
  lightMuted?: SanityImageSwatch
  lightVibrant?: SanityImageSwatch
  muted?: SanityImageSwatch
  vibrant?: SanityImageSwatch
  [key: string]: unknown
}

export interface SanityImageSwatch {
  background: string
  foreground: string
  population: number
  title?: string
}

export interface SanityImageFitResult {
  width?: number
  height?: number
  rect: Rectangle
}

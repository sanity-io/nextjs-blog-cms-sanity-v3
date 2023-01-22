import type {
  FileUrlBuilderOptions,
  ImageUrlBuilderOptions,
  PathBuilderOptions,
  SanityAssetSource,
  SanityFileUrlParts,
  SanityImageUrlParts,
} from './types'
import {pathPattern, fileAssetFilenamePattern, imageAssetFilenamePattern, cdnUrl} from './constants'
import {isAssetObjectStub, isAssetPathStub, isAssetUrlStub, isReference} from './asserters'
import {getForgivingResolver, UnresolvableError} from './utils'

/**
 * Builds the base image path from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID, dimensions and extension
 * @param options - Project ID and dataset the image belongs to, along with other options
 * @return string
 */
export function buildImagePath(
  asset: ImageUrlBuilderOptions | SanityImageUrlParts,
  options?: PathBuilderOptions
): string {
  const projectId = options?.projectId || asset.projectId
  const dataset = options?.dataset || asset.dataset
  if (!projectId || !dataset) {
    throw new Error('Project details (projectId and dataset) required to resolve path for image')
  }

  const dimensions =
    'metadata' in asset ? asset.metadata.dimensions : {width: asset.width, height: asset.height}
  const originalFilename = 'originalFilename' in asset ? asset.originalFilename : undefined
  const {assetId, extension, vanityFilename} = asset
  const {width, height} = dimensions
  const vanity = getVanityStub(originalFilename, vanityFilename, options)

  return `images/${projectId}/${dataset}/${assetId}-${width}x${height}.${extension}${vanity}`
}

/**
 * Builds the base image URL from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID, dimensions and extension
 * @param options - Project ID and dataset the image belongs to
 * @return string
 */
export function buildImageUrl(
  asset: ImageUrlBuilderOptions | SanityImageUrlParts,
  options?: PathBuilderOptions
): string {
  return `${cdnUrl}/${buildImagePath(asset, options)}`
}

/**
 * Builds the base file path from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID, dimensions and extension
 * @param options - Project ID and dataset the file belongs to, along with other options
 * @return string
 */
export function buildFilePath(
  asset: FileUrlBuilderOptions | SanityFileUrlParts,
  options?: PathBuilderOptions
): string {
  const projectId = options?.projectId || asset.projectId
  const dataset = options?.dataset || asset.dataset
  if (!projectId || !dataset) {
    throw new Error('Project details (projectId and dataset) required to resolve path for file')
  }

  const originalFilename = 'originalFilename' in asset ? asset.originalFilename : undefined
  const {assetId, extension, vanityFilename} = asset
  const vanity = getVanityStub(originalFilename, vanityFilename, options)

  return `files/${projectId}/${dataset}/${assetId}.${extension}${vanity}`
}

/**
 * Builds the base file URL from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID and extension
 * @param options - Project ID and dataset the file belongs to, along with other options
 * @return string
 */
export function buildFileUrl(asset: FileUrlBuilderOptions, project?: PathBuilderOptions): string {
  return `${cdnUrl}/${buildFilePath(asset, project)}`
}

/**
 * Checks whether or not the given URL contains an asset path
 *
 * @param url - URL or path name
 * @returns Whether or not it contained an asset path
 */
function hasPath(urlOrPath: string): boolean {
  return pathPattern.test(tryGetUrlPath(urlOrPath) || '')
}

/**
 * Tries to get the asset path from a given asset source
 *
 * @param src - The source image to infer an asset path from
 * @returns A path if resolvable, undefined otherwise
 */
export function tryGetAssetPath(src: SanityAssetSource): string | undefined {
  if (isAssetObjectStub(src)) {
    return tryGetAssetPath(src.asset)
  }

  if (isReference(src)) {
    return undefined
  }

  if (typeof src === 'string') {
    return hasPath(src) ? getUrlPath(src) : undefined
  }

  if (isAssetPathStub(src)) {
    return src.path
  }

  if (isAssetUrlStub(src)) {
    return getUrlPath(src.url)
  }

  return undefined
}

/**
 * Strips the CDN URL and query params from a URL, eg:
 * `https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` =>
 * `images/project/dataset/filename-200x200.jpg`
 *
 * @param url - URL to get path name from
 * @returns The path of a CDN URL
 * @throws If URL is not a valid Sanity asset URL
 */
export function getUrlPath(url: string): string {
  if (pathPattern.test(url)) {
    // Already just a path
    return url
  }

  if (!url.startsWith(`${cdnUrl}/`)) {
    throw new UnresolvableError(`Failed to resolve path from URL "${url}"`)
  }

  const qsPos = url.indexOf('?')
  const toIndex = qsPos === -1 ? undefined : qsPos
  return url.slice(cdnUrl.length + 1, toIndex)
}

/**
 * See {@link getUrlPath}
 *
 * @inheritFrom {@link getUrlPath}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetUrlPath = getForgivingResolver(getUrlPath)

/**
 * Strips the CDN URL, path and query params from a URL, eg:
 * `https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` =>
 * `filename-200x200.jpg`
 *
 * @param url - URL to get filename from
 * @returns The filename of an URL, if URL matches the CDN URL
 * @throws If URL is not a valid Sanity asset URL
 */
export function getUrlFilename(url: string): string {
  const path = tryGetUrlPath(url) || url
  const filename = path.replace(/^(images|files)\/[a-z0-9]+\/[a-z0-9][-\w]\/*/, '')
  if (!isValidFilename(filename)) {
    throw new UnresolvableError(`Failed to resolve filename from URL "${url}"`)
  }

  return filename
}

/**
 * See {@link getUrlFilename}
 *
 * @inheritFrom {@link getUrlFilename}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 */
export const tryGetUrlFilename = getForgivingResolver(getUrlFilename)

/**
 * Checks whether or not a given filename matches the expected Sanity asset filename pattern
 *
 * @param filename - Filename to check for validity
 * @returns Whether or not the specified filename is valid
 */
export function isValidFilename(filename: string): boolean {
  return fileAssetFilenamePattern.test(filename) || imageAssetFilenamePattern.test(filename)
}

/**
 * Get the "path stub" at the end of the path, if the user hasn't explicitly opted out of this behavior
 */
function getVanityStub(
  originalFilename: string | undefined,
  vanityFilename: string | undefined,
  options?: PathBuilderOptions
): string {
  const vanity = vanityFilename || originalFilename
  return options?.useVanityName === false || !vanity ? '' : `/${vanity}`
}

import {fileAssetIdPattern, imageAssetIdPattern} from './constants'
import type {
  SanityAssetIdStub,
  SanityAssetObjectStub,
  SanityAssetPathStub,
  SanityAssetUrlStub,
  SanityFileAsset,
  SanityImageAsset,
  SanityReference,
} from './types'

/**
 * Checks whether or not the given source is a Sanity reference
 * (an object containing _ref string key)
 *
 * @param ref - Possible reference
 * @returns Whether or not the passed object is a reference
 */
export function isReference(ref: unknown): ref is SanityReference {
  return isObject(ref) && typeof (ref as SanityReference)._ref === 'string'
}

/**
 * Checks whether or not the given source is an asset ID stub
 * (an object containing an `_id` property)
 *
 * @param stub - Possible asset id stub
 * @returns Whether or not the passed object is an object id stub
 */
export function isAssetIdStub(stub: unknown): stub is SanityAssetIdStub {
  return isObject(stub) && typeof (stub as SanityAssetIdStub)._id === 'string'
}

/**
 * Checks whether or not the given source is an asset path stub
 * (an object containing a `path` property)
 *
 * @param stub - Possible asset path stub
 * @returns Whether or not the passed object is an object path stub
 */
export function isAssetPathStub(stub: unknown): stub is SanityAssetPathStub {
  return isObject(stub) && typeof (stub as SanityAssetPathStub).path === 'string'
}

/**
 * Checks whether or not the given source is an asset URL stub
 * (an object containing a `url` property)
 *
 * @param stub - Possible asset url stub
 * @returns Whether or not the passed object is an object url stub
 */
export function isAssetUrlStub(stub: unknown): stub is SanityAssetUrlStub {
  return isObject(stub) && typeof (stub as SanityAssetUrlStub).url === 'string'
}

/**
 * Checks whether or not the given source is a (partial) sanity file asset document.
 * Only checks the `_type` property, all other properties _may_ be missing
 *
 * @param src - Source to check
 * @returns Whether or not the given source is a file asset
 */
export function isSanityFileAsset(src: unknown): src is SanityFileAsset {
  return isObject(src) && (src as SanityFileAsset)._type === 'sanity.fileAsset'
}

/**
 * Checks whether or not the given source is a (partial) sanity image asset document.
 * Only checks the `_type` property, all other properties _may_ be missing
 *
 * @param src - Source to check
 * @returns Whether or not the given source is a file asset
 */
export function isSanityImageAsset(src: unknown): src is SanityImageAsset {
  return isObject(src) && (src as SanityImageAsset)._type === 'sanity.imageAsset'
}

/**
 * Checks whether or not the given document ID is a valid Sanity image asset document ID
 *
 * @param documentId - Document ID to check
 * @returns Whether or not the given document ID is a Sanity image asset document ID
 */
export function isImageAssetId(documentId: string): boolean {
  return imageAssetIdPattern.test(documentId)
}

/**
 * Checks whether or not the given document ID is a valid Sanity file asset document ID
 *
 * @param documentId - Document ID to check
 * @returns Whether or not the given document ID is a Sanity file asset document ID
 */
export function isFileAssetId(documentId: string): boolean {
  return fileAssetIdPattern.test(documentId)
}

/**
 * Checks whether or not the given document ID is a valid Sanity asset document ID (file or image)
 *
 * @param documentId - Document ID to check
 * @returns Whether or not the given document ID is a Sanity asset document ID (file or image)
 */
export function isAssetId(documentId: string): boolean {
  return isImageAssetId(documentId) || isFileAssetId(documentId)
}

/**
 * Checks whether or not the given source is an asset object stub
 *
 * @param stub - Possible asset object stub
 * @returns Whether or not the passed object is an object stub
 */
export function isAssetObjectStub(stub: unknown): stub is SanityAssetObjectStub {
  const item = stub as SanityAssetObjectStub
  return isObject(item) && item.asset && typeof item.asset === 'object'
}

/**
 * Checks whether or not the passed object is an object (and not `null`)
 *
 * @param obj Item to check whether or not is an object
 * @returns Whether or not `obj` is an object
 * @internal
 */
export function isObject(obj: unknown): obj is object {
  return obj !== null && !Array.isArray(obj) && typeof obj === 'object'
}

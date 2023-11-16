export interface author {
  _type: 'author'
  _id: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  name: string
  picture: {
    _type: 'image'
    asset: {
      _ref: 'sanity.imageAsset'
      _type: 'reference'
    }
    crop: {
      _type: 'sanity.imageCrop'
      top: number
      bottom: number
      left: number
      right: number
    }
    hotspot: {
      _type: 'sanity.imageHotspot'
      x: number
      y: number
      height: number
      width: number
    }
    alt: string
  }
}
export interface post {
  _type: 'post'
  _id: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: { _type: 'slug'; current: string; source: string }
  content: {
    _type: 'image'
    asset: {
      _ref: 'sanity.imageAsset'
      _type: 'reference'
    }
    crop: {
      _type: 'sanity.imageCrop'
      top: number
      bottom: number
      left: number
      right: number
    }
    hotspot: {
      _type: 'sanity.imageHotspot'
      x: number
      y: number
      height: number
      width: number
    }
    caption: string
    alt: string
  }[]
  excerpt: string
  coverImage: {
    _type: 'image'
    asset: {
      _ref: 'sanity.imageAsset'
      _type: 'reference'
    }
    crop: {
      _type: 'sanity.imageCrop'
      top: number
      bottom: number
      left: number
      right: number
    }
    hotspot: {
      _type: 'sanity.imageHotspot'
      x: number
      y: number
      height: number
      width: number
    }
  }
  date: string
  author: {
    _key: string
    _type: 'reference'
    _ref: 'author'

    _strengthenOnPublish: {
      template: {
        id: 'undefined'
      }
      type: 'undefined'
      weak: false
    }
  }
}
export interface settings {
  _type: 'settings'
  _id: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  title: string
  ogImage: { title: string }
}
export interface sanity$imageAsset {
  _type: 'sanity.imageAsset'
  _id: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  originalFilename: string
  label: string
  title: string
  description: string
  altText: string
  sha1hash: string
  extension: string
  mimeType: string
  size: number
  assetId: string
  uploadId: string
  path: string
  url: string
  metadata: {
    _type: 'sanity.imageMetadata'
    location: { _type: 'geopoint'; lat: number; lng: number; alt: number }
    dimensions: {
      _type: 'sanity.imageDimensions'
      height: number
      width: number
      aspectRatio: number
    }
    palette: {
      _type: 'sanity.imagePalette'
      darkMuted: {
        _type: 'sanity.imagePaletteSwatch'
        background: string
        foreground: string
        population: number
        title: string
      }
      lightVibrant: {
        _type: 'sanity.imagePaletteSwatch'
        background: string
        foreground: string
        population: number
        title: string
      }
      darkVibrant: {
        _type: 'sanity.imagePaletteSwatch'
        background: string
        foreground: string
        population: number
        title: string
      }
      vibrant: {
        _type: 'sanity.imagePaletteSwatch'
        background: string
        foreground: string
        population: number
        title: string
      }
      dominant: {
        _type: 'sanity.imagePaletteSwatch'
        background: string
        foreground: string
        population: number
        title: string
      }
      lightMuted: {
        _type: 'sanity.imagePaletteSwatch'
        background: string
        foreground: string
        population: number
        title: string
      }
      muted: {
        _type: 'sanity.imagePaletteSwatch'
        background: string
        foreground: string
        population: number
        title: string
      }
    }
    lqip: string
    blurHash: string
    hasAlpha: boolean
    isOpaque: boolean
  }
  source: {
    _type: 'sanity.assetSourceData'
    name: string
    id: string
    url: string
  }
}
export interface sanity$fileAsset {
  _type: 'sanity.fileAsset'
  _id: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  originalFilename: string
  label: string
  title: string
  description: string
  altText: string
  sha1hash: string
  extension: string
  mimeType: string
  size: number
  assetId: string
  path: string
  url: string
  source: {
    _type: 'sanity.assetSourceData'
    name: string
    id: string
    url: string
  }
}

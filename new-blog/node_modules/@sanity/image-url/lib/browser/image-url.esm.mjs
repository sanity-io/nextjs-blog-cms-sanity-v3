function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var example = 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg';
function parseAssetId(ref) {
  var _ref$split = ref.split('-'),
      id = _ref$split[1],
      dimensionString = _ref$split[2],
      format = _ref$split[3];

  if (!id || !dimensionString || !format) {
    throw new Error("Malformed asset _ref '" + ref + "'. Expected an id like \"" + example + "\".");
  }

  var _dimensionString$spli = dimensionString.split('x'),
      imgWidthStr = _dimensionString$spli[0],
      imgHeightStr = _dimensionString$spli[1];

  var width = +imgWidthStr;
  var height = +imgHeightStr;
  var isValidAssetId = isFinite(width) && isFinite(height);

  if (!isValidAssetId) {
    throw new Error("Malformed asset _ref '" + ref + "'. Expected an id like \"" + example + "\".");
  }

  return {
    id: id,
    width: width,
    height: height,
    format: format
  };
}

var isRef = function isRef(src) {
  var source = src;
  return source ? typeof source._ref === 'string' : false;
};

var isAsset = function isAsset(src) {
  var source = src;
  return source ? typeof source._id === 'string' : false;
};

var isAssetStub = function isAssetStub(src) {
  var source = src;
  return source && source.asset ? typeof source.asset.url === 'string' : false;
}; // Convert an asset-id, asset or image to an image record suitable for processing
// eslint-disable-next-line complexity


function parseSource(source) {
  if (!source) {
    return null;
  }

  var image;

  if (typeof source === 'string' && isUrl(source)) {
    // Someone passed an existing image url?
    image = {
      asset: {
        _ref: urlToId(source)
      }
    };
  } else if (typeof source === 'string') {
    // Just an asset id
    image = {
      asset: {
        _ref: source
      }
    };
  } else if (isRef(source)) {
    // We just got passed an asset directly
    image = {
      asset: source
    };
  } else if (isAsset(source)) {
    // If we were passed an image asset document
    image = {
      asset: {
        _ref: source._id || ''
      }
    };
  } else if (isAssetStub(source)) {
    // If we were passed a partial asset (`url`, but no `_id`)
    image = {
      asset: {
        _ref: urlToId(source.asset.url)
      }
    };
  } else if (typeof source.asset === 'object') {
    // Probably an actual image with materialized asset
    image = _extends({}, source);
  } else {
    // We got something that does not look like an image, or it is an image
    // that currently isn't sporting an asset.
    return null;
  }

  var img = source;

  if (img.crop) {
    image.crop = img.crop;
  }

  if (img.hotspot) {
    image.hotspot = img.hotspot;
  }

  return applyDefaults(image);
}

function isUrl(url) {
  return /^https?:\/\//.test("" + url);
}

function urlToId(url) {
  var parts = url.split('/').slice(-1);
  return ("image-" + parts[0]).replace(/\.([a-z]+)$/, '-$1');
} // Mock crop and hotspot if image lacks it


function applyDefaults(image) {
  if (image.crop && image.hotspot) {
    return image;
  } // We need to pad in default values for crop or hotspot


  var result = _extends({}, image);

  if (!result.crop) {
    result.crop = {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    };
  }

  if (!result.hotspot) {
    result.hotspot = {
      x: 0.5,
      y: 0.5,
      height: 1.0,
      width: 1.0
    };
  }

  return result;
}

var SPEC_NAME_TO_URL_NAME_MAPPINGS = [['width', 'w'], ['height', 'h'], ['format', 'fm'], ['download', 'dl'], ['blur', 'blur'], ['sharpen', 'sharp'], ['invert', 'invert'], ['orientation', 'or'], ['minHeight', 'min-h'], ['maxHeight', 'max-h'], ['minWidth', 'min-w'], ['maxWidth', 'max-w'], ['quality', 'q'], ['fit', 'fit'], ['crop', 'crop'], ['saturation', 'sat'], ['auto', 'auto'], ['dpr', 'dpr'], ['pad', 'pad']];
function urlForImage(options) {
  var spec = _extends({}, options || {});

  var source = spec.source;
  delete spec.source;
  var image = parseSource(source);

  if (!image) {
    throw new Error("Unable to resolve image URL from source (" + JSON.stringify(source) + ")");
  }

  var id = image.asset._ref || image.asset._id || '';
  var asset = parseAssetId(id); // Compute crop rect in terms of pixel coordinates in the raw source image

  var cropLeft = Math.round(image.crop.left * asset.width);
  var cropTop = Math.round(image.crop.top * asset.height);
  var crop = {
    left: cropLeft,
    top: cropTop,
    width: Math.round(asset.width - image.crop.right * asset.width - cropLeft),
    height: Math.round(asset.height - image.crop.bottom * asset.height - cropTop)
  }; // Compute hot spot rect in terms of pixel coordinates

  var hotSpotVerticalRadius = image.hotspot.height * asset.height / 2;
  var hotSpotHorizontalRadius = image.hotspot.width * asset.width / 2;
  var hotSpotCenterX = image.hotspot.x * asset.width;
  var hotSpotCenterY = image.hotspot.y * asset.height;
  var hotspot = {
    left: hotSpotCenterX - hotSpotHorizontalRadius,
    top: hotSpotCenterY - hotSpotVerticalRadius,
    right: hotSpotCenterX + hotSpotHorizontalRadius,
    bottom: hotSpotCenterY + hotSpotVerticalRadius
  }; // If irrelevant, or if we are requested to: don't perform crop/fit based on
  // the crop/hotspot.

  if (!(spec.rect || spec.focalPoint || spec.ignoreImageParams || spec.crop)) {
    spec = _extends({}, spec, fit({
      crop: crop,
      hotspot: hotspot
    }, spec));
  }

  return specToImageUrl(_extends({}, spec, {
    asset: asset
  }));
} // eslint-disable-next-line complexity

function specToImageUrl(spec) {
  var cdnUrl = (spec.baseUrl || 'https://cdn.sanity.io').replace(/\/+$/, '');
  var filename = spec.asset.id + "-" + spec.asset.width + "x" + spec.asset.height + "." + spec.asset.format;
  var baseUrl = cdnUrl + "/images/" + spec.projectId + "/" + spec.dataset + "/" + filename;
  var params = [];

  if (spec.rect) {
    // Only bother url with a crop if it actually crops anything
    var _spec$rect = spec.rect,
        left = _spec$rect.left,
        top = _spec$rect.top,
        width = _spec$rect.width,
        height = _spec$rect.height;
    var isEffectiveCrop = left !== 0 || top !== 0 || height !== spec.asset.height || width !== spec.asset.width;

    if (isEffectiveCrop) {
      params.push("rect=" + left + "," + top + "," + width + "," + height);
    }
  }

  if (spec.bg) {
    params.push("bg=" + spec.bg);
  }

  if (spec.focalPoint) {
    params.push("fp-x=" + spec.focalPoint.x);
    params.push("fp-y=" + spec.focalPoint.y);
  }

  var flip = [spec.flipHorizontal && 'h', spec.flipVertical && 'v'].filter(Boolean).join('');

  if (flip) {
    params.push("flip=" + flip);
  } // Map from spec name to url param name, and allow using the actual param name as an alternative


  SPEC_NAME_TO_URL_NAME_MAPPINGS.forEach(function (mapping) {
    var specName = mapping[0],
        param = mapping[1];

    if (typeof spec[specName] !== 'undefined') {
      params.push(param + "=" + encodeURIComponent(spec[specName]));
    } else if (typeof spec[param] !== 'undefined') {
      params.push(param + "=" + encodeURIComponent(spec[param]));
    }
  });

  if (params.length === 0) {
    return baseUrl;
  }

  return baseUrl + "?" + params.join('&');
}

function fit(source, spec) {
  var cropRect;
  var imgWidth = spec.width;
  var imgHeight = spec.height; // If we are not constraining the aspect ratio, we'll just use the whole crop

  if (!(imgWidth && imgHeight)) {
    return {
      width: imgWidth,
      height: imgHeight,
      rect: source.crop
    };
  }

  var crop = source.crop;
  var hotspot = source.hotspot; // If we are here, that means aspect ratio is locked and fitting will be a bit harder

  var desiredAspectRatio = imgWidth / imgHeight;
  var cropAspectRatio = crop.width / crop.height;

  if (cropAspectRatio > desiredAspectRatio) {
    // The crop is wider than the desired aspect ratio. That means we are cutting from the sides
    var height = Math.round(crop.height);
    var width = Math.round(height * desiredAspectRatio);
    var top = Math.max(0, Math.round(crop.top)); // Center output horizontally over hotspot

    var hotspotXCenter = Math.round((hotspot.right - hotspot.left) / 2 + hotspot.left);
    var left = Math.max(0, Math.round(hotspotXCenter - width / 2)); // Keep output within crop

    if (left < crop.left) {
      left = crop.left;
    } else if (left + width > crop.left + crop.width) {
      left = crop.left + crop.width - width;
    }

    cropRect = {
      left: left,
      top: top,
      width: width,
      height: height
    };
  } else {
    // The crop is taller than the desired ratio, we are cutting from top and bottom
    var _width = crop.width;

    var _height = Math.round(_width / desiredAspectRatio);

    var _left = Math.max(0, Math.round(crop.left)); // Center output vertically over hotspot


    var hotspotYCenter = Math.round((hotspot.bottom - hotspot.top) / 2 + hotspot.top);

    var _top = Math.max(0, Math.round(hotspotYCenter - _height / 2)); // Keep output rect within crop


    if (_top < crop.top) {
      _top = crop.top;
    } else if (_top + _height > crop.top + crop.height) {
      _top = crop.top + crop.height - _height;
    }

    cropRect = {
      left: _left,
      top: _top,
      width: _width,
      height: _height
    };
  }

  return {
    width: imgWidth,
    height: imgHeight,
    rect: cropRect
  };
} // For backwards-compatibility

var validFits = ['clip', 'crop', 'fill', 'fillmax', 'max', 'scale', 'min'];
var validCrops = ['top', 'bottom', 'left', 'right', 'center', 'focalpoint', 'entropy'];
var validAutoModes = ['format'];

function isSanityModernClientLike(client) {
  return client && 'config' in client ? typeof client.config === 'function' : false;
}

function isSanityClientLike(client) {
  return client && 'clientConfig' in client ? typeof client.clientConfig === 'object' : false;
}

function rewriteSpecName(key) {
  var specs = SPEC_NAME_TO_URL_NAME_MAPPINGS;

  for (var _iterator = _createForOfIteratorHelperLoose(specs), _step; !(_step = _iterator()).done;) {
    var entry = _step.value;
    var specName = entry[0],
        param = entry[1];

    if (key === specName || key === param) {
      return specName;
    }
  }

  return key;
}

function urlBuilder(options) {
  // Did we get a modernish client?
  if (isSanityModernClientLike(options)) {
    // Inherit config from client
    var _options$config = options.config(),
        apiUrl = _options$config.apiHost,
        projectId = _options$config.projectId,
        dataset = _options$config.dataset;

    var apiHost = apiUrl || 'https://api.sanity.io';
    return new ImageUrlBuilder(null, {
      baseUrl: apiHost.replace(/^https:\/\/api\./, 'https://cdn.'),
      projectId: projectId,
      dataset: dataset
    });
  } // Did we get a SanityClient?


  var client = options;

  if (isSanityClientLike(client)) {
    // Inherit config from client
    var _client$clientConfig = client.clientConfig,
        _apiUrl = _client$clientConfig.apiHost,
        _projectId = _client$clientConfig.projectId,
        _dataset = _client$clientConfig.dataset;

    var _apiHost = _apiUrl || 'https://api.sanity.io';

    return new ImageUrlBuilder(null, {
      baseUrl: _apiHost.replace(/^https:\/\/api\./, 'https://cdn.'),
      projectId: _projectId,
      dataset: _dataset
    });
  } // Or just accept the options as given


  return new ImageUrlBuilder(null, options);
}
var ImageUrlBuilder = /*#__PURE__*/function () {
  function ImageUrlBuilder(parent, options) {
    this.options = void 0;
    this.options = parent ? _extends({}, parent.options || {}, options || {}) // Merge parent options
    : _extends({}, options || {}); // Copy options
  }

  var _proto = ImageUrlBuilder.prototype;

  _proto.withOptions = function withOptions(options) {
    var baseUrl = options.baseUrl || this.options.baseUrl;
    var newOptions = {
      baseUrl: baseUrl
    };

    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        var specKey = rewriteSpecName(key);
        newOptions[specKey] = options[key];
      }
    }

    return new ImageUrlBuilder(this, _extends({
      baseUrl: baseUrl
    }, newOptions));
  } // The image to be represented. Accepts a Sanity 'image'-document, 'asset'-document or
  // _id of asset. To get the benefit of automatic hot-spot/crop integration with the content
  // studio, the 'image'-document must be provided.
  ;

  _proto.image = function image(source) {
    return this.withOptions({
      source: source
    });
  } // Specify the dataset
  ;

  _proto.dataset = function dataset(_dataset2) {
    return this.withOptions({
      dataset: _dataset2
    });
  } // Specify the projectId
  ;

  _proto.projectId = function projectId(_projectId2) {
    return this.withOptions({
      projectId: _projectId2
    });
  } // Specify background color
  ;

  _proto.bg = function bg(_bg) {
    return this.withOptions({
      bg: _bg
    });
  } // Set DPR scaling factor
  ;

  _proto.dpr = function dpr(_dpr) {
    // A DPR of 1 is the default - so only include it if we have a different value
    return this.withOptions(_dpr && _dpr !== 1 ? {
      dpr: _dpr
    } : {});
  } // Specify the width of the image in pixels
  ;

  _proto.width = function width(_width) {
    return this.withOptions({
      width: _width
    });
  } // Specify the height of the image in pixels
  ;

  _proto.height = function height(_height) {
    return this.withOptions({
      height: _height
    });
  } // Specify focal point in fraction of image dimensions. Each component 0.0-1.0
  ;

  _proto.focalPoint = function focalPoint(x, y) {
    return this.withOptions({
      focalPoint: {
        x: x,
        y: y
      }
    });
  };

  _proto.maxWidth = function maxWidth(_maxWidth) {
    return this.withOptions({
      maxWidth: _maxWidth
    });
  };

  _proto.minWidth = function minWidth(_minWidth) {
    return this.withOptions({
      minWidth: _minWidth
    });
  };

  _proto.maxHeight = function maxHeight(_maxHeight) {
    return this.withOptions({
      maxHeight: _maxHeight
    });
  };

  _proto.minHeight = function minHeight(_minHeight) {
    return this.withOptions({
      minHeight: _minHeight
    });
  } // Specify width and height in pixels
  ;

  _proto.size = function size(width, height) {
    return this.withOptions({
      width: width,
      height: height
    });
  } // Specify blur between 0 and 100
  ;

  _proto.blur = function blur(_blur) {
    return this.withOptions({
      blur: _blur
    });
  };

  _proto.sharpen = function sharpen(_sharpen) {
    return this.withOptions({
      sharpen: _sharpen
    });
  } // Specify the desired rectangle of the image
  ;

  _proto.rect = function rect(left, top, width, height) {
    return this.withOptions({
      rect: {
        left: left,
        top: top,
        width: width,
        height: height
      }
    });
  } // Specify the image format of the image. 'jpg', 'pjpg', 'png', 'webp'
  ;

  _proto.format = function format(_format) {
    return this.withOptions({
      format: _format
    });
  };

  _proto.invert = function invert(_invert) {
    return this.withOptions({
      invert: _invert
    });
  } // Rotation in degrees 0, 90, 180, 270
  ;

  _proto.orientation = function orientation(_orientation) {
    return this.withOptions({
      orientation: _orientation
    });
  } // Compression quality 0-100
  ;

  _proto.quality = function quality(_quality) {
    return this.withOptions({
      quality: _quality
    });
  } // Make it a download link. Parameter is default filename.
  ;

  _proto.forceDownload = function forceDownload(download) {
    return this.withOptions({
      download: download
    });
  } // Flip image horizontally
  ;

  _proto.flipHorizontal = function flipHorizontal() {
    return this.withOptions({
      flipHorizontal: true
    });
  } // Flip image vertically
  ;

  _proto.flipVertical = function flipVertical() {
    return this.withOptions({
      flipVertical: true
    });
  } // Ignore crop/hotspot from image record, even when present
  ;

  _proto.ignoreImageParams = function ignoreImageParams() {
    return this.withOptions({
      ignoreImageParams: true
    });
  };

  _proto.fit = function fit(value) {
    if (validFits.indexOf(value) === -1) {
      throw new Error("Invalid fit mode \"" + value + "\"");
    }

    return this.withOptions({
      fit: value
    });
  };

  _proto.crop = function crop(value) {
    if (validCrops.indexOf(value) === -1) {
      throw new Error("Invalid crop mode \"" + value + "\"");
    }

    return this.withOptions({
      crop: value
    });
  } // Saturation
  ;

  _proto.saturation = function saturation(_saturation) {
    return this.withOptions({
      saturation: _saturation
    });
  };

  _proto.auto = function auto(value) {
    if (validAutoModes.indexOf(value) === -1) {
      throw new Error("Invalid auto mode \"" + value + "\"");
    }

    return this.withOptions({
      auto: value
    });
  } // Specify the number of pixels to pad the image
  ;

  _proto.pad = function pad(_pad) {
    return this.withOptions({
      pad: _pad
    });
  } // Gets the url based on the submitted parameters
  ;

  _proto.url = function url() {
    return urlForImage(this.options);
  } // Alias for url()
  ;

  _proto.toString = function toString() {
    return this.url();
  };

  return ImageUrlBuilder;
}();

export { urlBuilder as default };
//# sourceMappingURL=image-url.esm.mjs.map

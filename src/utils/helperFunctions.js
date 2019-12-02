import message from 'antd/lib/message';
/**
 * Image base64 to file object
 * @param base64
 * @param fileName
 * @returns {*}
 */
export function imageBase64ToFile(base64, fileName) {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) { //eslint-disable-line
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}

export function shareFacebook(url, callback) {
  FB.ui({
    method: 'share',
    href: url || window.location.href,
  }, response => {
    if (callback) {
      if (response && !response.error_code) return callback(true);
      callback(false);
    }
  });
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function autoAddLetterToEndIfNotExist(string, char) {
  if (string.charAt(string.length - 1) !== char) {
    string += char; //eslint-disable-line
  }
  return string;
}

export function copyInputValueToClipboard(inputId) {
  const input = document.getElementById(inputId);
  input.select();
  document.execCommand('copy');
  message.success('Đã sao chép, Ctr + V để sử dụng!');
}

/**
 * Read file from input file event
 * @param event
 * @param callback
 */
export function readFileFromInputEvent(event, callback) {
  const reader = new FileReader();
  const file = event.target.files[0];

  if (!file) return;

  document.getElementById(event.target.id).value = '';

  reader.onload = img => {
    callback(img.target.result);
  };
  reader.readAsDataURL(file);
}

export function findHashTags(searchText) {
  const regexp = /\B\#\w\w+\b/g; //eslint-disable-line
  let results = searchText.match(regexp);
  if (results) {
    results = results.map(tag => tag.replace('#', ''));
    return results;
  }
  return [];
}

export function imageCDNProcessor(imageUrl) {
  if (!imageUrl) return imageUrl;
  if (imageUrl.indexOf('https://s3-ap-southeast-1.amazonaws.com/show-kite-prod/') > -1 && process.env.REACT_APP_NODE_ENV === 'production') {
    imageUrl = imageUrl.replace('https://s3-ap-southeast-1.amazonaws.com/show-kite-prod/', process.env.REACT_APP_CLOUD_FRONT_DOMAIN); // eslint-disable-line
    return imageUrl;
  }
  if (imageUrl.indexOf('https://show-kite-prod.s3-ap-southeast-1.amazonaws.com/') > -1 && process.env.REACT_APP_NODE_ENV === 'production') {
    imageUrl = imageUrl.replace('https://show-kite-prod.s3-ap-southeast-1.amazonaws.com/', process.env.REACT_APP_CLOUD_FRONT_DOMAIN); // eslint-disable-line
    return imageUrl;
  }
  return imageUrl;
}

export function getImageThumb(entity, thumbKey, type = 'small', fallbackField = 'logo') {
  if (!entity[thumbKey] || typeof entity[thumbKey] === 'undefined') return entity[fallbackField];
  if (!entity[thumbKey][type]) return entity[fallbackField];
  return entity[thumbKey][type];
}

/* eslint-disable */
export function getYoutubeVideoId(url) {
  var i, r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  r = url.match(rx);
  if (!r || typeof r === 'undefined') return false;
  return r[1];
}
/* eslint-enable */

export function soundCloudEmbedUrlBuilder(url) {
  return `https://w.soundcloud.com/player/?url=${url}`;
}

export function getParameterByName(name, url) {
  const str = (!url) ? window.location.href : url;
  name = name.replace(/[\[\]]/g, "\\$&"); //eslint-disable-line
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), //eslint-disable-line
    results = regex.exec(str);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " ")); //eslint-disable-line
}

export default function (imageUrl) {
  if (!imageUrl) return imageUrl;
  if (imageUrl.indexOf('https://s3-ap-southeast-1.amazonaws.com/chamhoi-production/') > -1 && process.env.REACT_APP_NODE_ENV === 'production') {
    imageUrl = imageUrl.replace('https://s3-ap-southeast-1.amazonaws.com/chamhoi-production/', process.env.REACT_APP_CLOUD_FRONT_DOMAIN); // eslint-disable-line
    return imageUrl;
  }
  if (imageUrl.indexOf('https://chamhoi-production.s3-ap-southeast-1.amazonaws.com/') > -1 && process.env.REACT_APP_NODE_ENV === 'production') {
    imageUrl = imageUrl.replace('https://chamhoi-production.s3-ap-southeast-1.amazonaws.com/', process.env.REACT_APP_CLOUD_FRONT_DOMAIN); // eslint-disable-line
    return imageUrl;
  }
  return imageUrl;
}

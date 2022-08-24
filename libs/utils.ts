function get_redis_url() {
  if (process.env.NODE_ENV === "production") {
    return process.env.REDIS_URL;
  } else {
    return process.env.DEV_REDIS_URL;
  }
}

function getCorrectUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  } else {
    return "http://" + url;
  }
}

export { get_redis_url, getCorrectUrl };

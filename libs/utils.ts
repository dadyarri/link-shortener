function get_redis_url() {
  if (process.env.NODE_ENV === "production") {
    return process.env.REDIS_URL;
  } else {
    return process.env.DEV_REDIS_URL;
  }
}

export { get_redis_url };

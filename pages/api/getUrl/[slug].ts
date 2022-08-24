import { createClient } from "redis";
import { getRedisUrl } from "../../../libs/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = createClient({
    url: getRedisUrl()
  });

  let { slug } = req.query;
  slug = slug as string;

  client.on("error", err => {
    console.error("Redis client error: ", err);
  });

  await client.connect();

  const longUrl = await client.hGet(slug, "url");
  if (longUrl) {
    return res.status(200).json({ url: longUrl });
  } else {
    return res.status(404).json({ error: "Not found" });
  }
}

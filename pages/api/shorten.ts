import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";
import { getRedisUrl } from "../../libs/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const client = createClient({
      url: getRedisUrl()
    });

    client.on("error", err => {
      console.error("Redis client error: ", err);
    });

    await client.connect();

    // check if the slug is already registered
    const link = await client.hVals(req.body.slug);

    if (link.length > 0) {
      return res
        .status(409)
        .json({ error: "Слаг уже занят", pos: "slug-input" });
    }

    // save the link
    await client.hSet(req.body.slug, {
      url: req.body.url
    });

    await client.disconnect();

    return res.status(200).json({
      slug: req.body.slug,
      url: req.body.url
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}

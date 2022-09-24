import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";
import { getRedisUrl } from "../../libs/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") {
    const origin = req.headers.origin;
    if (origin) {
      return res
        .status(200)
        .setHeader("Access-Control-Allow-Origin", origin)
        .setHeader("Access-Control-Allow-Methods", "Content-Type")
        .setHeader("Content-Type", "application/json");
    }
  }

  if (req.method === "POST") {
    const client = createClient({
      url: getRedisUrl()
    });

    client.on("error", err => {
      console.error("Redis client error: ", err);
    });

    await client.connect();

    // check if the slug is already registered
    try {
      const link = await client.hVals(req.body.slug);

      if (link.length > 0) {
        return res
          .status(409)
          .json({ error: "Слаг уже занят", pos: "slug-input" });
      }
    } catch (TypeError) {
      return res.status(400).json({
        error: "Invalid slug",
        slug: req.body.slug,
        type: typeof req.body.slug
      });
    }

    // save the link
    await client.hSet(req.body.slug, {
      url: req.body.url
    });

    await client.disconnect();

    return res.status(200).json({
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${req.body.slug}`
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}

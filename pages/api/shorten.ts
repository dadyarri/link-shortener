import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";
import { get_redis_url } from "../../libs/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(get_redis_url());

    const client = createClient({
      url: get_redis_url()
    });

    client.on("error", err => {
      console.error("Redis client error: ", err);
    });

    await client.connect();

    const length = await client.lLen("links");

    await client.hSet(`links:${length}`, {
      slug: req.body.slug,
      url: req.body.url
    });
    await client.lPush("links", `links:${length}`);

    await client.disconnect();

    return res.status(200).json({
      message: req.body
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}

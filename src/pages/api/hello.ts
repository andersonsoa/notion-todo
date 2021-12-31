// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { notion } from "../../lib/notion";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    res.status(200).json(data);
  } catch {
    res.status(400).json({ error: "um erro aconteceu" });
  }
}

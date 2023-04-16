import { Product } from "@/lib/models/product";
import { mongooseConnect } from "@/lib/mongooseConn";
import { IProductCreateResponse } from "@/types/products";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProductCreateResponse>
) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    try {
      const data = await Product.create(req.body);
      res
        .status(201)
        .json({ success: true, message: "Successfully Created", data });
    } catch (err: any) {
      res
        .status(500)
        .json({ success: false, message: err.message, data: null });
    }
  }
}

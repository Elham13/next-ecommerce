import { Product } from "@/lib/models/product";
import { mongooseConnect } from "@/lib/mongooseConn";
import { IProductResponse } from "@/types/products";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProductResponse>
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
  } else if (method === "GET") {
    const { start, limit } = req.query;
    let skip = 0;
    let limit1 = 10;
    if (typeof start === "string") {
      skip = parseInt(start);
    }
    if (typeof limit === "string") {
      limit1 = parseInt(limit);
    }

    try {
      const count = await Product.count();
      const data = await Product.find({})
        .skip(limit1 * skip)
        .limit(limit1)
        .sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        message: "Fetched successfully",
        data,
        count,
      });
    } catch (err: any) {
      res
        .status(500)
        .json({ success: false, message: err.message, data: null });
    }
  } else if (method === "DELETE") {
    try {
      await Product.deleteOne({ _id: req.query.id });
      res
        .status(201)
        .json({
          success: true,
          message: `Product Deleted successfully`,
          data: null,
        });
    } catch (err: any) {
      res
        .status(500)
        .json({ success: false, message: err.message, data: null });
    }
  }
}

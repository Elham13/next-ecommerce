import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import Link from "next/link";
import { PRODUCTS } from "@/utils/endpoints";
import { toast } from "react-toastify";
import { IPagination } from "@/types/common";
import { IProduct, IProductResponse } from "@/types/products";
import CommonTable from "@/components/Table/CommonTable";
import { ICommonTableRow } from "@/types/table";

const tableHeadings: string[] = ["Name", "Price", "Description", "Actions"];

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [pagination, setPagination] = useState<IPagination>({
    limit: 10,
    start: 0,
  });

  const getProducts = async () => {
    setLoading(true);
    const url = `${PRODUCTS}?start=${pagination.start}&limit=${pagination.limit}`;
    try {
      const { data } = await axios.get<IProductResponse>(url);
      setProducts(data.data);
      setCount(data.count || 0);
    } catch (err: any) {
      const message = err.response
        ? err.response.status === 404
          ? err.message
          : err.response.data.message
        : err.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteObj = {
    visible: true,
    onClick: async (id: string) => {
      try {
        const { data } = await axios.delete<IProductResponse>(
          `${PRODUCTS}?id=${id}`
        );
        toast.success(data.message);
        getProducts();
      } catch (err: any) {
        const message = err.response
          ? err.response.status === 404
            ? err.message
            : err.response.data.message
          : err.message;
        toast.error(message);
      }
    },
  };

  const rows: ICommonTableRow[] = useMemo(() => {
    return [
      { accessKey: "title", type: "string" },
      { accessKey: "price", type: "string" },
      { accessKey: "description", type: "string" },
      {
        accessKey: "",
        type: "button",
        actions: {
          delete: deleteObj,
          edit: { visible: true, onClick: (id) => console.log("id: ", id) },
        },
      },
    ];
  }, []);

  useEffect(() => {
    getProducts();
  }, [pagination]);

  return (
    <Layout>
      <Link href="/products/create" className="btn-primary">
        Add new product
      </Link>

      <CommonTable
        data={products}
        headers={tableHeadings}
        loading={loading}
        count={count}
        pagination={pagination}
        setPagination={setPagination}
        rows={rows}
        hasSerialNo={true}
      />
    </Layout>
  );
};

export default Products;

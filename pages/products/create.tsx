import CircularProgress from "@/components/CircularProgress";
import Layout from "@/components/Layout";
import { IProduct, IProductResponse } from "@/types/products";
import { PRODUCTS } from "@/utils/endpoints";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const formDataInitialValues = {
  _id: "",
  title: "",
  description: "",
  price: 0,
};

const CreateProduct = () => {
  const { back: goBack } = useRouter();

  const [formData, setFormData] = useState<IProduct>(formDataInitialValues);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = name === "price" ? parseInt(e.target.value) : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData, _id: undefined };
    try {
      const { data } = await axios.post<IProductResponse>(PRODUCTS, payload);
      setFormData(formDataInitialValues);
      goBack();
      toast.success(data.message);
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

  return (
    <Layout>
      <h1 className="mb-2">Create Product</h1>

      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Name"
          name="title"
          onChange={handleChange}
          value={formData.title}
        />

        <label>Product Description</label>
        <textarea
          placeholder="Description"
          name="description"
          onChange={handleChange}
          value={formData.description}
        ></textarea>

        <label>Price (in INR)</label>
        <input
          type="number"
          placeholder="Price"
          name="price"
          onChange={handleChange}
          value={formData.price}
        />

        <button type="submit" className="btn-primary">
          {loading ? <CircularProgress height={6} width={6} /> : "Create"}
        </button>
      </form>
    </Layout>
  );
};

export default CreateProduct;

import Layout from "@/components/Layout";
import { ICreateProductValues, IProductCreateResponse } from "@/types/products";
import { CREATE_PRODUCT } from "@/utils/endpoints";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [formData, setFormData] = useState<ICreateProductValues>({
    title: "",
    description: "",
    price: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = name === "price" ? parseInt(e.target.value) : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<IProductCreateResponse>(
        CREATE_PRODUCT,
        formData
      );
      toast.success(data.message);
    } catch (err: any) {
      const message = err.response
        ? err.response.status === 404
          ? err.message
          : err.response.data.message
        : err.message;
      toast.error(message);
    }
  };

  //   useEffect(() => {
  //     console.log("formData: ", formData);
  //   }, [formData]);

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
          Create
        </button>
      </form>
    </Layout>
  );
};

export default CreateProduct;

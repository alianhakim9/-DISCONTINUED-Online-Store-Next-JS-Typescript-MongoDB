"use client";

// import CheckBox from "@/components/Checkbox";
import EmptyState from "@/components/EmptyState";
import { showToast } from "@/utils/helper";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState<Product[]>();
  const [tdStyle, _setTdStyle] = useState("border border-slate-200 p-1");
  const [query, setQuery] = useState("");
  const [orderBy, setOrderBy] = useState("desc");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(() => {
    const url = "/api/products";
    if (query) {
      axios
        .get(`${url}?q=${query}&order=${orderBy}&limit=${limit}`)
        .then((response: AxiosResponse) => {
          setProducts(response.data);
        })
        .catch((err: AxiosError) => {
          showToast(err.message, "error");
        });
    } else {
      axios
        .get(`${url}?order=${orderBy}&page=${page}&limit=${limit}`)
        .then((response: AxiosResponse) => {
          setProducts(response.data);
        })
        .catch((err: AxiosError) => {
          showToast(err.message, "error");
        });
    }
  }, [limit, orderBy, page, query]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string
  ) => {
    e.preventDefault();
    const mConfirm = confirm("Delete this product?");
    if (mConfirm) {
      await axios
        .delete(`/api/products/${productId}`)
        .then(() => {
          showToast("Product deleted", "success");
          fetchProducts();
        })
        .catch((err: AxiosError) => {
          showToast(err.message, "error");
        });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>List Product</h1>
        <Link className="btn-black" href="/dashboard/products/new">
          Add New Product
        </Link>
      </div>

      {products ? (
        <div>
          {/* filter & searching */}
          <div className="flex gap-2 items-center mt-5">
            <input
              type="text"
              placeholder="Search product"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              name="filter_by_order"
              id="filter_by_order"
              className="w-[300px]"
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="">Select order products</option>
              <option value="desc">Order by latest</option>
              <option value="asc">Order by oldest</option>
              <option value="lowest-price">Order by lowest Price</option>
              <option value="highest-price">Order by highest Price</option>
            </select>
            <select
              name="total_product_to_show"
              id="total_product_to_show"
              value={limit}
              onChange={(e) => setLimit(Number.parseInt(e.target.value))}
              className="max-w-[200px]"
            >
              <option value="5">Limit product</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>

          <table className="table-auto border border-slate-200 w-full mt-4">
            <thead className="bg-black text-white">
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Product Price</th>
                <th>User Action</th>
                {/* <th>Checkbox</th> */}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td className={`${tdStyle} text-center`}>{index + 1}</td>
                  <td className={tdStyle}>{product.name}</td>
                  <td className={tdStyle}>{product.description}</td>
                  <td className={tdStyle}>{product.price}</td>
                  <td className={`${tdStyle} text-center`}>
                    <Link href={`/dashboard/products/edit/${product.id}`}>
                      Edit
                    </Link>
                    <button
                      className="ml-4"
                      onClick={(e) => deleteProduct(e, product.id)}
                    >
                      Delete
                    </button>
                  </td>
                  {/* <td className={`${tdStyle} p-0 m-0`}>
                    <CheckBox name={product.name} />
                  </td> */}
                </tr>
              ))}
              {products?.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <EmptyState
                      title="Product is empty, Add new product"
                      actionTitle="here"
                      destination="/dashboard/products/new"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* <div className="flex items-center mt-4 gap-4">
            <button
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
              className="bg-gray-200 p-2"
            >
              Previous
            </button>
            <p className="rounded-full bg-gray-200 px-5 py-2">{page}</p>
            {totalData && totalData >= PAGE_SIZE && (
              <button
                onClick={() => setPage(page + 1)}
                className="bg-black text-white p-2"
              >
                Next
              </button>
            )}
          </div> */}
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Input from "../moleculs/Input";
import { Helmet } from "react-helmet";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [purchase, setPurchase] = useState("");
  const [sell, setSell] = useState("");
  const [stok, setStok] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const response = await axios.get(
      `https://app-c8f8ca2d-2b0f-41c7-930c-039bcbaa2e4c.cleverapps.io/product/${id}`
    );
    setTitle(response.data.name);
    setPurchase(response.data.purchase_price);
    setSell(response.data.selling_price);
    setStok(response.data.stok);
    setFile(response.data.image);
    setPreview(response.data.url);
  };

  const loadImage = (e: any) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateProduct = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("purchase", purchase);
    formData.append("selling", sell);
    formData.append("stok", stok);
    try {
      await axios.patch(
        `https://app-c8f8ca2d-2b0f-41c7-930c-039bcbaa2e4c.cleverapps.io/product/${id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      setTitle("");
      setSell("");
      setPurchase("");
      setPreview("");
      setStok("");
      setFile("");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center">
      <Helmet>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/Union.svg"
        />
        <title>Edit Product</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-fuchsia-500 mb-5">Edit Product</h1>
      <div className="flex gap-10 justify-center items-center">
        <form
          onSubmit={updateProduct}
          className="w-full max-w-md"
        >
          <Input
            title="Product Name"
            placeholder="Product Name"
            type="text"
            onchange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Input
            title="Purchase Price"
            placeholder="Purchase Price"
            type="number"
            onchange={(e) => setPurchase(e.target.value)}
            value={purchase}
          />
          <Input
            title="Selling Price"
            placeholder="Selling Price"
            type="number"
            onchange={(e) => setSell(e.target.value)}
            value={sell}
          />
          <Input
            title="Stok"
            placeholder="Stok"
            type="number"
            onchange={(e) => setStok(e.target.value)}
            value={stok}
          />
          <Input
            title="Image"
            type="file"
            onchange={loadImage}
            placeholder="Choose File"
          />
          <div className="flex gap-3 justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-xl flex gap-2 justify-center items-center">
              Update
            </button>
            <Link to="/dashboard">
              <button className="bg-slate-500 hover:bg-slate-700 text-white text-sm font-bold py-2 px-4 rounded-xl flex gap-2 justify-center items-center">
                Back
              </button>
            </Link>
          </div>
        </form>

        {preview ? (
          <figure className=" w-full">
            <img
              src={preview}
              alt="Preview Image"
            />
          </figure>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default EditProduct;

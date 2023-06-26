import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import NavbarCustom from "../components/moleculs/NavbarCustom";
import Button from "../components/moleculs/Button";
import { FaPlus, FaSearch } from "react-icons/fa";
import CardCustom from "../components/moleculs/CardCustom";
import Input from "../components/moleculs/Input";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [purchase, setPurchase] = useState("");
  const [sell, setSell] = useState("");
  const [stok, setStok] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const [errorName, setErrorName] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [nameUser, setNameUser] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const axiosJWT = axios.create();

  axiosJWT.interceptors.response.use(
    async (config) => {
      const currentDate = new Date();
      if (Number(expire) * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;

        const decoded = jwtDecode(response.data.accessToken) as {
          userName: string;
          exp: string;
        };

        setNameUser(decoded.userName);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");

      const decoded = jwtDecode(response.data.accessToken) as {
        userName: string;
        exp: string;
      };

      setNameUser(decoded.userName);
      setExpire(decoded.exp);
    } catch (e: any) {
      if (e.response) {
        navigate("/");
      }
    }
  };

  const getProducts = async () => {
    const response = await axiosJWT.get("http://localhost:5000/product");
    setProducts(response.data);
  };

  const loadImage = (e: any) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    const isNameUnique = checkIfNameUnique(title);
    if (isNameUnique) {
      // Lakukan aksi selanjutnya (misalnya, tambahkan barang ke daftar)
      console.log("Nama barang unik, lanjutkan aksi selanjutnya");
      setErrorName("");
      setTitle("");
      setIsDuplicate(false);
    } else {
      setErrorName("Nama barang sudah ada");
    }
    formData.append("file", file);
    formData.append("title", title);
    formData.append("purchase", purchase);
    formData.append("selling", sell);
    formData.append("stok", stok);

    try {
      await axios.post("http://localhost:5000/product", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
      setTitle("");
      setSell("");
      setPurchase("");
      setPreview("");
      setStok("");
      setFile("");
      setMsg("");
      getProducts();
    } catch (error: any) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    getProducts();
    handleSearch();
  }, [search]);

  const checkIfNameUnique = (name: string) => {
    const existingItems = products.map((item) => item.name);

    return !existingItems.includes(name);
  };

  const handleSearch = () => {
    const results: any = products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <div className="min-h-screen mx-40 mb-20">
      <NavbarCustom nameUser={nameUser} />
      <div className="flex gap-5 mt-5">
        <div>
          <Button
            color="green"
            title="Add Product"
            type="button"
            onclick={() => (window as any).addProduct.showModal()}
            icon={<FaPlus />}
          />
          <dialog
            id="addProduct"
            className="modal"
          >
            <form
              method="dialog"
              className="modal-box"
              onSubmit={saveProduct}
            >
              <h3 className="font-bold text-xl mb-3 text-fuchsia-500">
                Add new product
              </h3>
              <p className="text-red-500 text-sm text-center">{msg}</p>
              <p className="text-red-500 text-sm text-center">{errorName}</p>
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
              {preview ? (
                <figure className="max-w-md">
                  <img
                    src={preview}
                    alt="Preview Image"
                  />
                </figure>
              ) : (
                ""
              )}
              <div className="flex gap-3 justify-end mt-5">
                <Button
                  type="submit"
                  color="green"
                  title="Add Product"
                  disabled={!title || isDuplicate}
                />
              </div>
            </form>
            <form
              method="dialog"
              className="modal-backdrop"
            >
              <button>close</button>
            </form>
          </dialog>
        </div>
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-80 p-2.5"
            placeholder="Search for a Product"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="ml-2 p-2 rounded absolute top-0 right-1 bottom-0 text-fuchsia-500"
          >
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-10 justify-center">
        {search !== ""
          ? searchResults.map((product) => (
              <CardCustom
                getProducts={() => getProducts()}
                key={product.id}
                id={product.id}
                url={product.url}
                name={product.name}
                purchase={product.purchase_price}
                sell={product.selling_price}
                stok={product.stok}
              />
            ))
          : products.map((product) => {
              return (
                <CardCustom
                  getProducts={() => getProducts()}
                  key={product.id}
                  id={product.id}
                  url={product.url}
                  name={product.name}
                  purchase={product.purchase_price}
                  sell={product.selling_price}
                  stok={product.stok}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Dashboard;

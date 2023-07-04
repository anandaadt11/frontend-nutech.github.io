import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "./Button";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

type CardCustomProps = {
  id: number;
  url: string;
  name: string;
  purchase: number;
  sell: number;
  stok: number;
  getProducts: () => void;
};

const CardCustom = ({
  id,
  url,
  name,
  purchase,
  sell,
  stok,
  getProducts,
}: CardCustomProps) => {
  const [showModal, setShowModal] = useState(false);

  const deleteProduct = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:5000/product/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card w-80 bg-base-100 shadow-md">
      <figure className="w-full h-64">
        <img
          src={url}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>purchase: {purchase}</p>
        <p>Sell: {sell}</p>
        <p>Stok : {stok}</p>
        <div className="card-actions justify-end">
          <Link to={`/dashboard/edit/${id}`}>
            <button
              type="button"
              className={`bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-xl flex gap-2 justify-center items-center`}
            >
              <FaEdit />
              Update
            </button>
          </Link>
          <div></div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded-xl flex gap-2 justify-center items-center"
            onClick={() => setShowModal(true)}
          >
            <FaTrash />
            Delete
          </button>

          {showModal && (
            <DeleteModal
              closeModal={setShowModal}
              deleteProduct={() => deleteProduct(id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardCustom;

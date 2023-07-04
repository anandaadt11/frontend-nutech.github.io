type DeleteModalProps = {
  closeModal: any;
  deleteProduct: any;
};

const DeleteModal = ({ closeModal, deleteProduct }: DeleteModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 -z-20"></div>
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Delete Confirmation</h2>
        <p>Are you sure you want to delete this item?</p>

        <div className="flex justify-end mt-6 gap-3">
          <button
            className="bg-slate-500 hover:bg-slate-700 text-white text-sm font-bold py-2 px-4 rounded-xl flex gap-2 justify-center items-center"
            onClick={() => closeModal(false)}
          >
            Cancel
          </button>

          <button
            className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded-xl flex gap-2 justify-center items-center"
            onClick={() => deleteProduct()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

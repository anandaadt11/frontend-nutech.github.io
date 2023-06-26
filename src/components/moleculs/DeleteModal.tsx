import React from "react";
import Button from "./Button";

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
          <Button
            type="button"
            title="Cancel"
            color="slate"
            onclick={() => closeModal(false)}
          />

          <Button
            type="button"
            title="Delete"
            color="red"
            onclick={() => deleteProduct()}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

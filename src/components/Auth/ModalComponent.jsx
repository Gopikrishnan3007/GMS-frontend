// ModalComponent.jsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ModalComponent = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Message</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-700">{message}</p>
        <button onClick={onClose} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;

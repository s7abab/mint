import React from 'react';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-white border-b p-4 flex items-center justify-between">
      <div className="flex items-center">
    <BsArrowLeftSquareFill className='hover:scale-105 transition-transform' size={35} onClick={()=>navigate("/counselor/messages")} />
        <div className="ml-auto flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">
            <i className="far fa-video"></i>
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <i className="fas fa-phone-alt"></i>
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <i className="fas fa-info-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

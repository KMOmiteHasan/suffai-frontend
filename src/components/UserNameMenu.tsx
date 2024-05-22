import React from "react";
import { CircleUserIcon } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const UserNameMenu = () => {
  const { user, logout } = useAuth0();
  return (
    <>
      <Link to="" className="header-btn flex mr-6" title="Go to your profile">
        <CircleUserIcon className="text-black mx-4 ml-0 w-8 h-8" />
        Hello {user?.name}
      </Link>
      <button className="header-btn mr-6" onClick={() => logout()}>
        Log Out
      </button>
      {/* <AuthLinks status={status} userName={userName} /> */}
      <Link to="/cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-white font-semibold"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        {/* {cartProducts?.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
              {cartProducts.length}
            </span>
          )} */}
      </Link>
    </>
  );
};

export default UserNameMenu;

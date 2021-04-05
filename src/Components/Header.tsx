import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

// Logo
import { ReactComponent as Logo } from "../assets/logo.svg";

// TS
import { ILink } from "../utils/types";

const Header: FC = (): ReactElement => {
  const Links: ILink[] = [
    {
      path: "/search",
      title: "Search",
    },
    {
      path: "/",
      title: "Board",
      class: "mx-4",
    },
    {
      path: "/login",
      title: "Login",
      class: "font-bold",
    },
  ];
  return (
    <div className="w-full h-24 flex items-center justify-between">
      <Logo className="w-10 h-10 overflow-visible" />
      <ul className="flex">
        {Links?.length >= 1 &&
          Links.map((link: ILink, i: number) => (
            <li key={i}>
              <Link
                className={`text-blue-navy ${link?.class || ""}`.trim()}
                to={link.path}
              >
                {link.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Header;

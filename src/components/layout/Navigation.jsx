"use client";

import * as React from "react";
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
  List,
  Button,
} from "@material-tailwind/react";
import { Menu as MenuIcon, Xmark } from "iconoir-react";
import { AuthStore } from "../../store/UseAuthStore";
import { useNavigate } from "react-router-dom";
const LINKS = [
  {
    title: "Movies",
  },
  {
    title: "Series",
  },
];

function NavList() {
  const Navigate = useNavigate();
  return (
    <>
      {LINKS.map(({ title }) => (
        <List.Item key={title}>
          <Typography
            type="medium"
            className="text-white cursor-pointer"
            onClick={() => Navigate(`/${title}`)}
          >
            {title}
          </Typography>
        </List.Item>
      ))}
    </>
  );
}
export default function Navigation() {
  const Authenticated = AuthStore.getState().isAuthenticated;
  const logout = AuthStore((state) => state.logout);
  const Navigate = useNavigate();
  const handleLogout = () => {
    logout();
    Navigate("/");
  };
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar
      className="mx-auto w-full border-none shadow-none bg-transparent text-white"
      fullWidth
      color="black"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Typography
            type="small"
            className="ml-2 mr-2 block py-1 font-semibold cursor-pointer"
            onClick={() => Navigate("/")}
          >
            FMovies
          </Typography>
          <hr className="mx-1 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
          <div className="hidden lg:block">
            <List className="mt-4 flex flex-col gap-1 lg:mt-0 lg:flex-row lg:items-center text-white">
              <NavList />
            </List>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {Authenticated ? (
            <IconButton
              className="ml-2"
              size="sm"
              variant="ghost"
              color="secondary"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
            </IconButton>
          ) : (
            <Button
              className=" text-white bg-inherit border-none"
              onClick={() => Navigate("/Login")}
            >
              Login
            </Button>
          )}
          <IconButton
            size="sm"
            variant="ghost"
            color="secondary"
            onClick={() => setOpenNav(!openNav)}
            className="ml-auto mr-2 grid lg:hidden"
          >
            {openNav ? (
              <Xmark className="h-4 w-4 text-white" />
            ) : (
              <MenuIcon className="h-4 w-4 text-white" />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

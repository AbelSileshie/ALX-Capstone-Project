"use client";

import * as React from "react";
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
  Card,
  List,
  Avatar,
  Menu,
  Tooltip,
  Accordion,
  Button,
} from "@material-tailwind/react";
import {
  Archive,
  HeadsetHelp,
  LogOut,
  Menu as MenuIcon,
  MultiplePages,
  NavArrowDown,
  ProfileCircle,
  Rocket,
  SelectFace3d,
  Settings,
  UserCircle,
  Xmark,
} from "iconoir-react";
import { AuthStore } from "../../store/UseAuthStore";
import { useNavigate } from "react-router-dom";
const LINKS = [
  {
    icon: ProfileCircle,
    title: "Account",
  },
  {
    icon: SelectFace3d,
    title: "Blocks",
  },
  {
    icon: Archive,
    title: "Docs",
  },
];

function NavList() {
  return (
    <>
      {LINKS.map(({ icon: Icon, title, href }) => (
        <List.Item key={title} as="a" href={href}>
          <List.ItemStart className="mr-1.5">
            <Icon className="h-4 w-4" />
          </List.ItemStart>
          <Typography type="small">{title}</Typography>
        </List.Item>
      ))}
    </>
  );
}

const MenuItem = React.forwardRef(function MenuItem(
  { title, description, ...rest },
  ref
) {
  return (
    <Menu.Item ref={ref} {...rest} className="flex-col items-start">
      <Typography color="default" className="font-semibold">
        {title}
      </Typography>
      <Typography type="small" className="text-foreground">
        {description}
      </Typography>
    </Menu.Item>
  );
});

export default function Navigation() {
  const Authenticated = AuthStore.getState().isAuthenticated;
  console.log(Authenticated);
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
      className="mx-auto w-full border-none shadow-none bg-transparent"
      fullWidth
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
            <List className="mt-4 flex flex-col gap-1 lg:mt-0 lg:flex-row lg:items-center">
              <NavList />
            </List>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="ml-2" />
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
            <Button onClick={() => Navigate("/Login")}>Login</Button>
          )}
          <IconButton
            size="sm"
            variant="ghost"
            color="secondary"
            onClick={() => setOpenNav(!openNav)}
            className="ml-auto mr-2 grid lg:hidden"
          >
            {openNav ? (
              <Xmark className="h-4 w-4" />
            ) : (
              <MenuIcon className="h-4 w-4" />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <Accordion>
          <Accordion.Item value="react" className="mt-2 border-none">
            <Accordion.Trigger className="p-0">
              <List.Item className="w-full">
                <List.ItemStart className="me-1.5">
                  <MultiplePages className="h-4 w-4" />
                </List.ItemStart>
                <Typography type="small">Pages</Typography>
                <List.ItemEnd className="ps-1">
                  <NavArrowDown className="h-3.5 w-3.5 group-data-[open=true]:rotate-180" />
                </List.ItemEnd>
              </List.Item>
            </Accordion.Trigger>
            <Accordion.Content>
              <MenuItem
                title="@material-tailwind/html"
                description="Learn how to use @material-tailwind/html, packed with rich components and widgets."
              />
              <MenuItem
                title="@material-tailwind/react"
                description="Learn how to use @material-tailwind/react, packed with rich components for React."
              />
              <MenuItem
                title="Material Tailwind PRO"
                description="A complete set of UI Elements for building faster websites in less time."
              />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

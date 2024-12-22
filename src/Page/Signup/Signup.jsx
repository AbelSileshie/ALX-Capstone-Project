"use client";

import * as React from "react";
import {
  Button,
  Input,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { GoogleCircle, Eye, EyeClosed } from "iconoir-react";
export default function Authentication4() {
  const navigate = useNavigate();
  const [inputType, setInputType] = React.useState("password");

  return (
    <div className="grid place-items-center min-w-screen min-h-screen p-4">
      <div className="w-full max-w-md mx-auto p-4">
        <Typography as="h2" type="h4" className="mb-2 text-center">
          Sign Up
        </Typography>
        <Typography type="lead" className="text-foreground text-center">
          Enter your email and password to sign Up
        </Typography>
        <form action="#" className="mt-12">
          <div className="mb-6 space-y-1.5">
            <Typography
              as="label"
              htmlFor="email"
              type="small"
              color="default"
              className="font-semibold"
            >
              Email
            </Typography>
            <Input
              size="lg"
              id="email"
              type="email"
              placeholder="someone@example.com"
            />
          </div>
          <div className="mb-6 space-y-1.5">
            <Typography
              as="label"
              htmlFor="password"
              type="small"
              color="default"
              className="font-semibold"
            >
              Password
            </Typography>
            <Input
              size="lg"
              id="password"
              type={inputType}
              placeholder="********"
            >
              <Input.Icon
                as={IconButton}
                type="button"
                variant="ghost"
                placement="end"
                color="secondary"
                className="data-[placement=end]:right-1.5 !absolute select-auto z-10 pointer-events-auto"
                onClick={() =>
                  setInputType(inputType === "password" ? "text" : "password")
                }
              >
                {inputType === "password" ? (
                  <EyeClosed className="h-6 w-6" />
                ) : (
                  <Eye className="h-6 w-6" />
                )}
              </Input.Icon>
            </Input>
          </div>
          <div className="mb-6 text-end">
            <Typography
              color="primary"
              as="a"
              href="#"
              className="font-semibold"
            >
              Forgot Password?
            </Typography>
          </div>
          <Button size="lg" isFullWidth>
            Sign Up
          </Button>
        </form>
        <div className="my-6">
          <Button size="lg" variant="outline" color="secondary" isFullWidth>
            <GoogleCircle className="w-5 h-5 mr-2" /> Sign up with Google
          </Button>
        </div>
        <Typography className="flex items-center justify-center gap-1 text-foreground">
          already registered?
          <Typography
            color="primary"
            as="a"
            href="#"
            className="font-semibold"
            onClick={() => navigate("/Login")}
          >
            Login
          </Typography>
        </Typography>
      </div>
    </div>
  );
}

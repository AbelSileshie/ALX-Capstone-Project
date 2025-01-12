"use client";

import * as React from "react";
import {
  Button,
  Input,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "iconoir-react";
import { Spiner } from "../../components/layout/Spiner";
import { Suspense } from "react";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import { AuthStore } from "../../store/UseAuthStore";
import { loginUser } from "../../Services/LoginService";
import { Signupendpoint } from "../../utils/APIPath";

export default function Authentication4() {
  const navigate = useNavigate();
  const [inputType, setInputType] = React.useState("password");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const setLogin = AuthStore((state) => state.setLogin);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    setLoading(true);
    const endpoint = Signupendpoint;
    loginUser(email, password, Signupendpoint)
      .then((data) => {
        if (data && data?.id) {
          setLogin(data);
        } else {
        }
      })
      .then(() => {
        navigate("/Login");
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Suspense fallback={<Spiner />}>
      <div className="sticky top-0 left-0 w-full z-50 bg-black/25 shadow-md p-2">
        <Navigation />
      </div>
      <main>
        <section className="flex-grow bg-black/40 text-white">
          <div className="grid place-items-center min-w-screen min-h-screen p-4">
            <div className="w-full max-w-md mx-auto p-4">
              <Typography as="h2" type="h4" className="mb-2 text-center">
                Sign Up
              </Typography>
              <Typography type="lead" className="text-white text-center">
                Enter your email and password to sign Up
              </Typography>
              <form onSubmit={handleSubmit} className="mt-12">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6 space-y-1.5">
                  <Typography
                    as="label"
                    htmlFor="password"
                    type="small"
                    color="default"
                    className="font-semibold color-white"
                  >
                    Password
                  </Typography>
                  <Input
                    size="lg"
                    id="password"
                    type={inputType}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  >
                    <Input.Icon
                      as={IconButton}
                      type="button"
                      variant="ghost"
                      placement="end"
                      color="secondary"
                      className="data-[placement=end]:right-1.5 !absolute select-auto z-10 pointer-events-auto"
                      onClick={() =>
                        setInputType(
                          inputType === "password" ? "text" : "password"
                        )
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
                <Button size="lg" isFullWidth type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Sign Up"}
                </Button>
              </form>
              <div className="my-6"></div>
              <Typography className="flex items-center justify-center gap-1 text-white">
                already registered?
                <Typography
                  color="primary"
                  as="a"
                  href="#"
                  className="font-semibold text-white"
                  onClick={() => navigate("/Login")}
                >
                  Login
                </Typography>
              </Typography>
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-auto bg-black p-8">
        <Footer />
      </footer>
    </Suspense>
  );
}

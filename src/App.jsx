import "./App.css";
import { lazy, Suspense } from "react";
import Navigation from "./components/layout/Navigation.jsx";
import Footer from "./components/layout/Footer.jsx";
import Home from "./Page/Home/Home.jsx";
import { AuthStore } from "./store/UseAuthStore.js";
const Error404 = lazy(() => import("./components/error/Error404.jsx"));
const Login = lazy(() => import("./Page/Login/Login.jsx"));

function App() {
  const saveddata = AuthStore((state) => state.user);
  const savedtoken = AuthStore((state) => state.token);
  console.log(saveddata, savedtoken);
  return (
    <>
      <Suspense fallback={<Error404 />}>
        <nav className="relative top-0 mx-auto w-full p-1">
          <div className="h-auto w-full">
            <Navigation />
          </div>
        </nav>
        <main>
          <section className="flex-grow pt-2 p-8V">
            <Home />
          </section>
          <section></section>
        </main>
        <footer className="mt-auto bg-white p-8">
          <Footer />
        </footer>
      </Suspense>
    </>
  );
}

export default App;

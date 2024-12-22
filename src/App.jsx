import "./App.css";
import { lazy, Suspense } from "react";
import Navigation from "./components/layout/Navigation.jsx";
import Footer from "./components/layout/Footer.jsx";
import Home from "./Page/Home/Home.jsx";
import { Spiner } from "./components/layout/Spiner.jsx";
import { AuthStore } from "./store/UseAuthStore.js";
const Error404 = lazy(() => import("./components/error/Error404.jsx"));
const Login = lazy(() => import("./Page/Login/Login.jsx"));

function App() {
  const saveddata = AuthStore((state) => state.user);
  const savedtoken = AuthStore((state) => state.token);
  console.log(saveddata, savedtoken);
  return (
    <>
      <Suspense fallback={<Spiner />}>
        <div className="relative flex flex-col h-full w-full">
          <nav className="sticky top-0 mx-auto w-full h-full">
            <div className="h-auto w-full overflow-hidden">
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
        </div>
      </Suspense>
    </>
  );
}

export default App;

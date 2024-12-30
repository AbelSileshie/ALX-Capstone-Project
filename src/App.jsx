import "./App.css";
import { lazy, Suspense } from "react";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import { AuthStore } from "./store/UseAuthStore";
import Error404 from "./components/error/Error404";
import { Spiner } from "./components/layout/Spiner";

// Lazy load components for better performance
const Home = lazy(() => import("./Page/Home/Home"));

function App() {
  const savedData = AuthStore((state) => state.user);
  const savedToken = AuthStore((state) => state.token);

  console.log(savedData, savedToken);

  return (
    <>
      <Suspense fallback={<Spiner />}>
        <div className="sticky top-0 left-0 w-full z-50 bg-white shadow-md p-2 bg-transparent">
          <Navigation />
        </div>
        <main className="pb-8">
          <section className="flex-grow pt-2 p-2">
            <Home />
          </section>
        </main>
        <footer className="mt-auto bg-white p-8">
          <Footer />
        </footer>
      </Suspense>
    </>
  );
}

export default App;

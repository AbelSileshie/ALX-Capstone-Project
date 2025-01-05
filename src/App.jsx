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
  const savedToken = AuthStore.getState().token;
  const data = AuthStore((state) => state.data);
  console.log("saved Data", savedData);
  console.log("saved Token", savedToken);

  return (
    <>
      <Suspense fallback={<Spiner />}>
        <div className="sticky top-0 left-0 w-full z-50 bg-white shadow-md p-2 bg-transparent">
          <Navigation />
        </div>
        <main className="w-full pb-8">
          <section className="w-full flex-grow pt-2 p-2">
            <Home />
          </section>
        </main>
        <footer className="w-full mt-auto bg-white p-8">
          <Footer />
        </footer>
      </Suspense>
    </>
  );
}

export default App;

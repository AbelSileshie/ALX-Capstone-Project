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
  const Token = AuthStore.getState().token;
  const user_id = AuthStore.getState().user_id;
  console.log("saved Data", savedData?.id);
  console.log("saved Token", savedData?.id);
  console.log("saved user_id", user_id);
  // console.log("Data", data.user.id);

  return (
    <>
      <Suspense fallback={<Spiner />}>
        <div className="sticky top-0 left-0 w-full z-50  shadow-md p-2 bg-black">
          <Navigation />
        </div>
        <main className="w-full pb-8 bg-black color-white">
          <section className="w-full flex-grow pt-2 p-2">
            <Home />
          </section>
        </main>
        <footer className="w-full mt-auto p-8 bg-black/90">
          <Footer />
        </footer>
      </Suspense>
    </>
  );
}

export default App;

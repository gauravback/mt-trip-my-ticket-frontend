import { Toaster } from "react-hot-toast";
import "./App.css";
import { AllRoutes } from "./Pages/AllRoutes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
  return (
    <>
      <Toaster />
      <AllRoutes />
    </>
  );
}

export default App;

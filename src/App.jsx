import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import Header from "./components/Header/Header";
import ListProperty from "./components/UploadProperty/ListProperty/ListProperty";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/Signup";
import Footer from "./components/Footer/Footer";

 function App() {
  return (

    <BrowserRouter>
          <Header />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/properties/:id" element={<PropertyDetails />}  />
        <Route path="/list-property"  element={<ListProperty />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
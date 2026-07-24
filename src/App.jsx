import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import Header from "./components/Header/Header";
import ListProperty from "./components/UploadProperty/ListProperty/ListProperty";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Footer from "./components/Footer/Footer";
import PropertyListingPage from "./pages/PropertyListingPage/PropertyListingPage";
import Dashboard from "./pages/UserDashBoard/Dashboard";
import AboutUs from "./pages/FooterPages/AboutUs";
import Terms from "./pages/FooterPages/Terms";
import PrivacyPolicy from "./pages/FooterPages/PrivacyPolicy";
import ContactUs from "./pages/FooterPages/ContactUs";
 
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
        <Route path="/properties" element={<PropertyListingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />


        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/privacy-policy"  element={<PrivacyPolicy />} />
        <Route path="/contactus" element={<ContactUs />} />


      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
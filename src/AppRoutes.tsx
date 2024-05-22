import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "./pages/Home";
import About from "./pages/About";
import PartnerWithUs from "./pages/PartnerWithUs";
import PlaceOrder from "./pages/PlaceOrder";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ExploreStores from "./components/ExploreStores";
import PrepareBasket from "./components/PrepareBasket";
import SetupProfile from "./pages/SetupProfile";
import SelectStore from "./pages/SelectStore";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route path="/user-profile" element={<span>USER PROFILE PAGE</span>} />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      {/* <Route path="/placeorder" element={<Layout><About/></Layout>} /> */}
      <Route
        path="/placeorder/explore-stores"
        element={
          <Layout>
            <PlaceOrder>
              <ExploreStores />
            </PlaceOrder>
          </Layout>
        }
      />
      <Route
        path="/placeorder/prepare-basket"
        element={
          <Layout>
            <PlaceOrder>
              <PrepareBasket />
            </PlaceOrder>
          </Layout>
        }
      />
      <Route
        path="/partner"
        element={
          <Layout>
            <PartnerWithUs />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/setup-profile"
        element={
          <Layout>
            <SetupProfile />
          </Layout>
        }
      />
      <Route
        path="/select-store"
        element={
          <Layout>
            <SelectStore />
          </Layout>
        }
      />
      {/* <Route path="/terms" element={<Layout><About/></Layout>} /> */}
      {/* <Route path="/privacy" element={<Layout><About/></Layout>} /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

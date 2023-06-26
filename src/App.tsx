import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import EditProduct from "./components/organisms/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/dashboard/edit/:id"
          element={<EditProduct />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

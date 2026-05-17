import { Outlet } from "react-router";
import "./App.css";
import { Footer } from "./component/Footer/Footer";
import { Header } from "./component/Header/Header";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );
  return (
    <>
      <Header token={token} setToken={setToken} />
      <Outlet context={{ token, setToken }} />
      <Footer />
    </>
  );
}

export default App;

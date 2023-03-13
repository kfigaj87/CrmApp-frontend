import axios from "axios";
import AppNav from "./components/AppNav";
import AppRoutes from "./routes/AppRoutes";
import { Container } from "react-bootstrap";

import { useState } from "react";

import backgroundImage from "./assets/wall.jpg";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  axios.defaults.baseURL = "http://localhost:3005/api";

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        // height: "100vh",
      }}
    >
      <Container>
        <AppNav user={user} setUser={setUser} />
        <AppRoutes user={user} setUser={setUser} />
      </Container>
    </div>
  );
}

export default App;

import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import config from "../config";

const Login = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputData = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData((data) => {
      return { ...data, [name]: target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${config.api.url}/user/login`, formData).then((res) => {
      if (!res.data.error) {
        localStorage.setItem("user", JSON.stringify(res.data));
        props.setUser(res.data);
      }
    });
  };

  return (
    <Form className="w-50 mx-auto" onSubmit={handleSubmit}>
      {props.user && <Navigate to="/crm/customers" />}
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Login</Form.Label>
        <Form.Control
          name="username"
          type="text"
          placeholder="Login"
          value={formData.username}
          onChange={handleInputData}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Hasło</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Hasło"
          value={formData.password}
          onChange={handleInputData}
        />
      </Form.Group>
      <Button type="submit">Zaloguj</Button>
    </Form>
  );
};

export default Login;

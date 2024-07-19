import React, {useState} from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import axios from "axios";

const Login = ( { setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;

  const HandleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post(url, {username, password});
          console.log(response.data)
          setToken(response.data.data.token);
      } catch (error) {
          setError(error.response.data.message);
      }
  }

  return (

      <div>
          <div className="login-container">
              <Form onSubmit={HandleLogin}>
                  <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                  />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                  />
                  </Form.Group>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <Button variant="primary" type="submit">
                  Login
                  </Button>
              </Form>
          </div>
      </div>
  );
}

export default Login;

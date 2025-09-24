// import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const showToast = (msg) => {
        return (
            <Toast>
            <Toast.Body>{msg}</Toast.Body>
            </Toast>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
      try {
        const res = await fetch(`http://localhost:3100/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: formData.email,
                password: formData.password
            })
      })
      const resp = await res.json()
      setFormData({
        email: "",
        password: ""
      })
    //   e.preventDefault()
      localStorage.setItem('token', resp.token)
      localStorage.setItem('customID', resp.customID)
      showToast("Login successful")
      navigate("/llmArena/playground")
      } catch(err) {
        showToast(`${err.msg}`)
      }
    }

    return (
        <div className="login-form container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="john.doe@example.com" required name='email' value={formData?.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="******" required name='password' value={formData?.password} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" className='mx-1'>Login</Button>
                <Button variant="primary" type="button" onClick={() => navigate('/register')}>Register</Button>
            </Form>
        </div>
    )
}

export default Login;
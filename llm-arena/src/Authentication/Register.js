import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

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
        const res = await fetch(`http://localhost:3100/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                firstName: formData.firstname,
                lastName: formData.lastname,
                email: formData.email,
                password: formData.password
            })
      })
      const resp = await res.json()
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      })
      showToast("Registration successful")
      navigate('/login')
      } catch(err) {
        showToast(`${err.msg}`)
      }
    }

    return (
        <div className="flex justify-content-center w-full border-red-100">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstname">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control type="text" placeholder="John" required name='firstname' value={formData?.firstname} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastname">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type="text" placeholder="Doe" required name='lastname' value={formData?.lastname} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="john.doe@example.com" required name='email' value={formData?.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="******" required name='password' value={formData?.password} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Register</Button>
            </Form>
        </div>
    )
}

export default Register;
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import axiosInstance from "../../axiosConfig";

const CustomerModal = ({ show, handleClose, customer, refreshCustomers }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (customer) {
            setName(customer.name);
            setEmail(customer.email);
        }
    }, [customer]);

    const handleSubmit = async () => {
        try {
            if (customer) {
                await axiosInstance.put(`${import.meta.env.VITE_BACKEND_URL}/customers/${customer.customerId}`, { name, email });
            } else {
                await axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/customers`, { name, email });
            }
            refreshCustomers();
            handleClose();
        } catch (error) {
            if (error.response && error.response.data.fieldErrors) {
                setErrors(error.response.data.fieldErrors);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{customer ? 'Edit Customer' : 'Add Customer'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                        <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={!!errors.email}

                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {customer ?  'Update' : 'Save'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CustomerModal;
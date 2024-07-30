import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import CustomerModal from './CustomerModal';
import axiosInstance from '../../axiosConfig';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const url = `${import.meta.env.VITE_BACKEND_URL}/customers`;

  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5);
  
  const [responseMessage, setResponseMessage] = useState('');
  const [responseError, setResponseError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await axiosInstance.get(url);
    setCustomers(response.data.data);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setShowModal(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleDeleteCustomer = async (id) => {
    if (confirm('Are you sure to delete this data?')) {
      await axiosInstance.delete(`${import.meta.env.VITE_BACKEND_URL}/customers/${id}`);
      fetchCustomers();
    }
  };

  const handleCloseModal = () => setShowModal(false);

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Customers</h1>
      <Button onClick={handleAddCustomer}>Add Customer</Button>
      {(responseError || responseMessage)
        ? <Alert className='mt-2' variant = {responseError ? "danger" : "success"} dismissible>
        {responseError ? responseError : responseMessage}
        </Alert> : ''
      }
      <div className='table-responsive'>
      <Table striped bordered hover className='mt-2'>
        <thead>
          <tr>
            <th className='text-center'>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer, index) => (
            <tr key={customer.customerId}>
              <td className='text-center'>{ indexOfFirstCustomer + (index+1) }</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditCustomer(customer)}>Edit</Button>
                <Button className='mx-2' variant="danger" onClick={() => handleDeleteCustomer(customer.customerId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: Math.ceil(customers.length / customersPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      </div>
      <CustomerModal show={showModal} handleClose={handleCloseModal} customer={selectedCustomer} refreshCustomers={fetchCustomers} setResponseError = {setResponseError} setResponseMessage = {setResponseMessage} />
    </div>
  );
};

export default CustomerList;
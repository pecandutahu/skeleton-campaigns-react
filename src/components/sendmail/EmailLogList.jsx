import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import SendEmailModal from './SendEmailModal';
import { format } from 'date-fns';
import axiosInstance from '../../axiosConfig';

const EmailLogList = () => {
  const [emailLogs, setEmailLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(5);

  useEffect(() => {
    fetchEmailLogs();
  }, []);

  const fetchEmailLogs = async () => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/email-mass-log`);

    setEmailLogs(response.data.data);
  };

  const handleSendEmail = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = emailLogs.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
        <h1>Email Mass Log</h1>
        <Button className='mt-2' onClick={handleSendEmail}>Send Mass Email</Button>
        <div className="table-responsive mt-2">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Date</th>
                    <th>To</th>
                    <th>Subject</th>
                    <th>Content</th>
                </tr>
                </thead>
                <tbody>
                {currentLogs.map((log, index) => (
                    <tr key={log.emailMasLogId}>
                        <td> { indexOfFirstLog + (index + 1) } </td>
                        <td> { format(new Date(log.createdAt), 'MMMM d, yyyy h:mm a') } </td>
                        <td> { log.email } </td>
                        <td> { log.subject } </td>
                        <td> { log.content } </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Pagination>
                {Array.from({ length: Math.ceil(emailLogs.length / logsPerPage) }, (_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                </Pagination.Item>
                ))}
            </Pagination>
            <SendEmailModal show={showModal} handleClose={handleCloseModal} refreshEmailLogs={fetchEmailLogs} />
        </div>
    </div>
  );
};

export default EmailLogList;

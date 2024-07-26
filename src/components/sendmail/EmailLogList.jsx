import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, Form } from 'react-bootstrap';
import axiosInstance from '../../axiosConfig';
import SendEmailModal from './SendEmailModal';
import { format } from 'date-fns';

const EmailLogList = () => {
  const [emailLogs, setEmailLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('createdAt');
  const [filterColumn, setFilterColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEmailLogs();
  }, [currentPage, sortColumn, filterColumn, filterValue]);

  const fetchEmailLogs = async () => {
    const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/email-mass-log`, {
      params: {
        sortBy: sortColumn,
        filterColumn: filterColumn || undefined,
        filterValue: filterValue || undefined,
        page: currentPage,
        limit: logsPerPage
      }
    });
    setEmailLogs(response.data.data.content);
    setTotalPages(response.data.data.totalPages);
  };

  const handleSendEmail = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSortChange = (e) => {
    setSortColumn(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterColumn(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = emailLogs.slice(indexOfFirstLog, indexOfLastLog);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Email Mass Log</h1>
      <Button className='mt-2' onClick={handleSendEmail}>Send Mass Email</Button>
      <div className="mt-2">
        <Form inline>
          <Form.Group controlId="formSortBy">
            <Form.Label className="mr-2">Sort By</Form.Label>
            <Form.Control as="select" value={sortColumn} onChange={handleSortChange} className="mr-3">
              <option value="createdAt">Date</option>
              <option value="status">Status</option>
              <option value="email">To</option>
              <option value="subject">Subject</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formFilterColumn">
            <Form.Label className="mr-2">Filter Column</Form.Label>
            <Form.Control as="select" value={filterColumn} onChange={handleFilterChange} className="mr-3">
              <option value="">None</option>
              <option value="status">Status</option>
              <option value="email">To</option>
              <option value="subject">Subject</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formFilterValue">
            <Form.Label className="mr-2">Filter Value</Form.Label>
            <Form.Control type="text" value={filterValue} onChange={handleFilterValueChange} className="mr-3"/>
          </Form.Group>
        </Form>
      </div>
      <div className="table-responsive mt-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>To</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {emailLogs.map((log, index) => (
              <tr key={log.emailMasLogId}>
                <td> {currentPage * logsPerPage - logsPerPage + (index + 1)} </td>
                <td> {format(new Date(log.createdAt), 'MMMM d, yyyy h:mm a')} </td>
                <td> {log.email} </td>
                <td> {log.subject} </td>
                <td> {log.status} </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
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

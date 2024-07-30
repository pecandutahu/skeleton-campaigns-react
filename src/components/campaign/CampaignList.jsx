import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, Alert } from 'react-bootstrap';
import axios from 'axios';
import CampaignModal from './CampaignModal';
import axiosInstance from '../../axiosConfig';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(5);
  const [responseMessage, setResponseMessage] = useState('');
  const [responseError, setResponseError] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/campaigns`);
    setCampaigns(response.data.data);
  };

  const handleAddCampaign = () => {
    setSelectedCampaign(null);
    setShowModal(true);
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const handleDeleteCampaign = async (id) => {
    if (confirm("Are you sure to delete this data?")) {
      try {
        const response = await axiosInstance.delete(`${import.meta.env.VITE_BACKEND_URL}/campaigns/${id}`);
        fetchCampaigns();
        
        if(response.data.messages) {
          setResponseMessage(response.data.messages);
        }else{
          setResponseMessage("Data deleted successfuly");
        }

      } catch (error) {
        if(error.response && error.response.errors && error.response.messages) {
          setResponseMessage(error.response.messages);
          setResponseError(error.response.errors);
        }
      }

    }
  };

  const handleCloseModal = () => setShowModal(false);

  // Pagination logic
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Campaigns</h1>
      
      <Button onClick={handleAddCampaign}>Add Campaign</Button>
      {(responseError || responseMessage)
        ? <Alert className='mt-2' variant = {responseError ? "danger" : "success"} dismissible>
        {responseError ? responseError : responseMessage}
        </Alert> : ''
      }
      
      <div className="row mt-2">
        <div className="col-md-12">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Content</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCampaigns.map((campaign, index) => (
                  <tr key={campaign.campaignId}>
                    <td>{indexOfFirstCampaign + index + 1}</td>
                    <td>{campaign.campaignName}</td>
                    {/* <td>{campaign.campaignContent}</td> */}
                    <td dangerouslySetInnerHTML={{__html: "<iframe height='300' width='600' srcdoc='" + campaign.campaignContent + "'></iframe>"}} />
                    <td>
                      <Button className='mx-2' variant="warning" onClick={() => handleEditCampaign(campaign)}>Edit</Button>
                      <Button variant="danger" onClick={() => handleDeleteCampaign(campaign.campaignId)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {Array.from({ length: Math.ceil(campaigns.length / campaignsPerPage) }, (_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>
      </div>
      <CampaignModal show={showModal} handleClose={handleCloseModal} campaign={selectedCampaign} refreshCampaign={fetchCampaigns} setResponseError={setResponseError} setResponseMessage={setResponseMessage} />
    </div>
  );
};

export default CampaignList;

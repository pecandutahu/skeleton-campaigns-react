import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import CampaignModal from './CampaignModal';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(5);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaigns`);
    setCampaigns(response.data);
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
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/campaigns/${id}`);
    fetchCampaigns();
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
                    <td>{campaign.campaignContent}</td>
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
      <CampaignModal show={showModal} handleClose={handleCloseModal} campaign={selectedCampaign} refreshCampaign={fetchCampaigns} />
    </div>
  );
};

export default CampaignList;

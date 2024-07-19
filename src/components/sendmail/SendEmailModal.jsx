import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axiosInstance from '../../axiosConfig';

const SendEmailModal = ({ show, handleClose, refreshEmailLogs }) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const response = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/campaigns`);
    setCampaigns(response.data.data.map(campaign => ({ value: campaign.campaignId, label: campaign.campaignName, content: campaign.campaignContent })));
  };

  const handleSave = async () => {
    try {
      await axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/send-mail/all`, { subject, content });
      refreshEmailLogs();
      handleClose();
    } catch (error) {
      if (error.response && error.response.data.fieldErrors) {
        setErrors(error.response.data.fieldErrors);
      }
    }
  };

  const handleCampaignChange = (selectedOption) => {
    setSelectedCampaign(selectedOption);
    setContent(selectedOption.content);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Send Mass Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              isInvalid={!!errors.subject}
            />
            <Form.Control.Feedback type="invalid">
              {errors.subject}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Campaign Content</Form.Label>
            <Select
              value={selectedCampaign}
              onChange={handleCampaignChange}
              options={campaigns}
              isInvalid={!!errors.content}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
            />
            {errors.content && <div className="invalid-feedback d-block">{errors.content}</div>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendEmailModal;

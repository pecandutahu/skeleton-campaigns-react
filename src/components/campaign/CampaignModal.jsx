import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, editorConfig } from '../../ckeditorConfig';
import 'ckeditor5/ckeditor5.css';
import axiosInstance from "../../axiosConfig";

const CampaignModal = ( { show, handleClose, campaign, refreshCampaign, setResponseError, setResponseMessage} ) => {
  const [campaignName, setCampaignName] = useState('');
  const [campaignContent, setCampaignContent] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    if (campaign) {
      setCampaignName(campaign.campaignName);
      setCampaignContent(campaign.campaignContent);
    }else{
      setCampaignName('');
      setCampaignContent('');
    }
  }, [campaign]);

  const handleSave = async () => {
    try {
      if (campaign) {
        await axiosInstance.put(`${import.meta.env.VITE_BACKEND_URL}/campaigns/${campaign.campaignId}`, { campaignName, campaignContent });
      } else {
        await axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/campaigns`, { campaignName, campaignContent });
      }
      setResponseMessage('Campaign saved successfully.');
      refreshCampaign();
      handleClose();
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.fieldErrors);
        setResponseError(error.response.data.errors);
        setResponseMessage(error.response.data.messages);
      }
    }
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{campaign ? 'Edit Campaign' : 'Add Campaign'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              isInvalid={!!errors.campaignName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.campaignName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>

            <CKEditor
              editor={ClassicEditor} config={editorConfig}
              data={campaignContent}
              onChange={(event, editor) => {
                const data = editor.getData();
                setCampaignContent(data);
              }}
            />
            {errors.campaignContent && <div className="invalid-feedback d-block">{errors.campaignContent}</div>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CampaignModal;
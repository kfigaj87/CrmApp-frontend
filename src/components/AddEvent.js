import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import config from "../config";

const AddEvent = (props) => {
  const [formData, setFormData] = useState({
    description: "",
    type: "",
    date: "",
  });

  const handleInputData = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData((data) => {
      return { ...data, [name]: target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${config.api.url}/customerEvent/add/${props.customerId}/events`,
        formData
      )
      .then((res) => {
        if (!res.data.error) {
          props.setIsAddActionModalVisible(false);
          setFormData({
            description: "",
            type: "",
            date: "",
          });
        }
      });
  };

  return (
    <Modal
      show={props.isAddActionModalVisible}
      onHide={() => props.setIsAddActionModalVisible(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Dodaj akcję</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              placeholder="Opis"
              value={formData.description}
              onChange={handleInputData}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Rodzaj akcji</Form.Label>
            <Form.Select onChange={handleInputData} name="type">
              <option>Wybierz rodzaj</option>
              <option value="call">Telefon</option>
              <option value="meeting">Spotkanie</option>
              <option value="email">Mail</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Data</Form.Label>
            <Form.Control
              name="date"
              type="date"
              placeholder="Data"
              value={formData.date}
              onChange={handleInputData}
            />
          </Form.Group>

          <Button type="submit">Dodaj</Button>
          {` `}

          <Button
            variant="danger"
            type="button"
            onClick={() => props.setIsAddActionModalVisible(false)}
          >
            Zamknij
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEvent;

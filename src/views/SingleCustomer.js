import { useParams } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import AddEvent from "../components/AddEvent";

const SingleCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    name: "",
    address: {
      street: "",
      zipCode: "",
      city: "",
    },
    nip: "",
    events: [],
  });

  const [isAddActionModalVisible, setIsAddActionModalVisible] = useState(false);

  useEffect(() => {
    axios.get(`customer/${id}`).then((res) => {
      console.log(id);
      setCustomer(res.data);
    });
  }, [id, isAddActionModalVisible]);

  const deleteCustomerEvent = (customerEventId) => {
    axios
      .delete(`/customerEvent/delete/${id}`, {
        data: { customerEventId: customerEventId },
      })
      .then((res) => {
        console.log(res.data);
        axios.get(`customer/${id}`).then((res) => {
          console.log(id);
          setCustomer(res.data);
        });
      });
  };

  return (
    <div className="customer">
      <Card className="mb-5">
        <Card.Body>
          <Card.Title>{customer.name}</Card.Title>

          <strong>Adres</strong>
          <address>
            {customer.address.street} <br />
            {customer.address.zipCode} <br />
            {customer.address.city} <br />
          </address>

          <Card.Text>NIP: {customer.nip}</Card.Text>
        </Card.Body>
      </Card>
      <h2>Akcje</h2>
      <Table>
        <thead>
          <tr>
            <th>LP.</th>
            <th>Opis</th>
            <th>Rodzaj akcji</th>
            <th>Data</th>
            <th>Edycja</th>
          </tr>
        </thead>
        <tbody>
          {customer.events.map((event, index) => {
            return (
              <tr key={event._id}>
                <td>{index + 1}.</td>
                <td>{event.description}</td>
                <td>{event.type}</td>
                <td>{event.date}</td>
                <td>
                  <Button onClick={() => deleteCustomerEvent(event._id)}>
                    Usuń
                  </Button>{" "}
                  <Button>Edytuj</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={() => setIsAddActionModalVisible(true)}>
        Dodaj akcje
      </Button>
      <AddEvent
        isAddActionModalVisible={isAddActionModalVisible}
        setIsAddActionModalVisible={setIsAddActionModalVisible}
        customerId={customer.id}
      />
    </div>
  );
};

export default SingleCustomer;

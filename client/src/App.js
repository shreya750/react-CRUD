import React,{useState} from 'react';
import {Container, Form, Button,ListGroup,Dropdown} from 'react-bootstrap';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState(0)
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [area, setArea] = useState("")

  const [newEmail,setnewEmail] = useState("")

  const [userList, setUserList] = useState([])

  // const displayValues= () => {
  //   console.log( name, email, phone, city, state, country, area)
  // }

  const addUser= (event) => {

    console.log(name);
    event.preventDefault();
    Axios.post('http://localhost:3001/add', {
     
      name: name,
      email: email,
      phone: phone,
      city: city,
      state: state,
      country: country,
      area: area
    
    }).then(() => {
      console.log("success")
    })
  }

  const getUsers = (event) => {
    console.log("get users called");
    event.preventDefault();
    
    Axios.get('http://localhost:3001/users')
    .then((response => {
      console.log(response.data)
      setUserList(response.data);
     
    }))
  }

  const updateUsers = (id,event) => {
    //event.preventDefault();
    Axios.put('http://localhost:3001/update',{email: newEmail,id:id})
    .then((response)=> {
      console.log("update")
      setUserList(userList.map((val) => {
        return val.id == id 
        ? {
          id:val.id,
          name:val.name,
          email:val.email,
          phone: val.phone,
          city: val.city,
          state: val.state,
          country: val.country,
          area: val.area

        }
        : val;
      }))
    })
   

  }

  const deleteUser = (id,event) => {
    //event.preventDefault();
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" onChange={(event) => setName(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="number" placeholder="Enter phone number" onChange={(event) => setPhone(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter city" onChange={(event) => setCity(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="Enter State" onChange={(event) => setState(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Enter country" onChange={(event) => setCountry(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Area</Form.Label>
          <Form.Control type="text" placeholder="Enter area" onChange={(event) => setArea(event.target.value)}/>
        </Form.Group>
        <hr/>
        <Button variant = "primary" type="submit"  onClick={addUser}>
          Add User
        </Button>
        <hr/>
        <Button variant = "primary" type="submit"  onClick={getUsers}>
          Show Users
        </Button>
        <hr/>
        

        {userList.map((val,index) => {
            return (
              <div>
              
              <ListGroup as = "ul" key = {index}>
              <div>
                <input 
                  type="text" 
                  placeholder="update"
                  onChange={(event) => setnewEmail(event.target.value)}/>



                  <Button variant="secondary" onClick={() => {
                    updateUsers(val.id, EventSource);
                  }}>update</Button>

                  <Button variant="dark" onClick={()=> {deleteUser(val.id)}}>delete</Button>
                  </div>
                <ListGroup.Item variant="primary">{val.name}</ListGroup.Item>
                <ListGroup.Item variant="secondary">{val.email}</ListGroup.Item>
                <ListGroup.Item variant="secondary">{val.phone}</ListGroup.Item>
                <ListGroup.Item variant="success">{val.city}</ListGroup.Item>
                <ListGroup.Item variant="success">{val.state}</ListGroup.Item>
                <ListGroup.Item variant="success">{val.country}</ListGroup.Item>
                <ListGroup.Item variant="success">{val.area}</ListGroup.Item> 
                
                </ListGroup>
                <hr/><br/>
               
              </div>
                
            )
        })}
        <hr/>
      </Form>
    </Container>
  );
}

export default App;

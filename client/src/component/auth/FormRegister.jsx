import React, { useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FolderImage from '../img/FolderImg';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import { DataContext } from "../../context/dataContext";
import '../assets/Index.css'

function FormRegister({openLogin}) {
  const {message, setMessage} = useContext(DataContext)
  const [formRegister, setFormRegister] = useState({
    FullName: '',
    Email: '',
    Password: '',
    Phone: '',
    Address: '',
  });

  console.log(formRegister)

  const handleChange = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      const formData = new FormData();
      formData.set('fullname', formRegister.FullName);
      formData.set('email', formRegister.Email);
      formData.set('password', formRegister.Password);
      formData.set('phone', formRegister.Phone);
      formData.set('address', formRegister.Address);

      const response = await API.post('/register', formData, config);

      console.log("register success : ", response)

      const alert = (
        <Alert variant="success" className="py-1">
          Register success!
        </Alert>
      );
      setMessage(alert);
      openLogin()

    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.Message === "Email already exists") {
        const alert = (
          <Alert variant="danger" className="py-1">
            Email already exists!
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed to register!
          </Alert>
        );
        setMessage(alert);
      }
    }
  });
    
  return (
    <Form className='containerRegister' onSubmit={(e) => handleSubmit.mutate(e)}>
        <img src={FolderImage.Palm} alt="palm" style={{position:'absolute', left:'0px'}}/>
        <img src={FolderImage.Hibiscus} alt="hibiscus" style={{position:'absolute', right:'0px'}}/>
        <p style={{margin:'51px 0px 75px', textAlign:'center', fontSize:'36px'}}>Register</p>
        {message && message}
        <Form.Group style={{marginBottom:'35px'}}>
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Full Name" name="FullName"  onChange={handleChange} required />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>
        <Form.Group style={{marginBottom:'35px'}}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" name="Email" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group style={{marginBottom:'35px'}}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" name="Password" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group style={{marginBottom:'35px'}}>
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Enter Phone" name="Phone" onChange={handleChange} required/>
        </Form.Group>

        <Form.Group style={{marginBottom:'35px'}}>
            <Form.Label>Address</Form.Label>
            <Form.Control type='textarea' placeholder="Address" name="Address" style={{height:'70px'}} onChange={handleChange} required/>
        </Form.Group>

        <Button variant="primary" type="submit" style={{backgroundColor:'#FFAF00', border:'0px', width:'100%', marginBottom:'10px'}}>Register</Button>

        <div style={{textAlign:'center', fontWeight:'500'}}>Already have an account ? klik
            <button style={{border:'0px', backgroundColor:'transparent', fontWeight:'bold'}} onClick={(e) => {
              e.preventDefault()
              openLogin()
            }}>Here</button>
        </div>
    </Form>
  );
}

export default FormRegister;
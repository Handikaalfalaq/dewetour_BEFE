import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FolderImage from '../img/FolderImg';
import '../assets/Index.css'

function FormRegister({openLogin}) {
    const [formRegister, setFormRegister] = useState('')

    // const {fullName, email, password, phone, addres } = formRegister;

    const handleChange = (e) => {
        setFormRegister({
          ...formRegister,
          [e.target.name]: e.target.value,
        });
      };
      console.log(formRegister)
    
  return (
    <Form className='containerRegister'>
        <img src={FolderImage.Palm} alt="palm" style={{position:'absolute', left:'0px'}}/>
        <img src={FolderImage.Hibiscus} alt="hibiscus" style={{position:'absolute', right:'0px'}}/>
        <p style={{margin:'51px 0px 75px', textAlign:'center', fontSize:'36px'}}>Register</p>
        <Form.Group style={{marginBottom:'35px'}}>
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Full Name" name="fullName"  onChange={handleChange} required />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>
        <Form.Group style={{marginBottom:'35px'}}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" name="email" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group style={{marginBottom:'35px'}}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" name="password" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group style={{marginBottom:'35px'}}>
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Enter Phone" name="phone" onChange={handleChange} required/>
        </Form.Group>

        <Form.Group style={{marginBottom:'35px'}}>
            <Form.Label>Address</Form.Label>
            <Form.Control type='textarea' placeholder="Address" name="address" style={{height:'70px'}} onChange={handleChange} required/>
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
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FolderImage from '../img/FolderImg';
import '../assets/Index.css'

function FormLogin({getDatas, openRegister}) {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  
  return (
    <Form className='containerFormLogin' onSubmit={(e) =>{
      e.preventDefault()
      getDatas(inputEmail, inputPassword)
    } }>
        <img src={FolderImage.Palm} alt="palm" style={{position:'absolute', left:'0px'}}/>
        <img src={FolderImage.Hibiscus} alt="hibiscus" style={{position:'absolute', right:'0px'}}/>
        <p style={{margin:'51px 0px 75px 0px', textAlign:'center', fontSize:'36px'}}>Login</p>
        <Form.Group controlId="formBasicEmail" style={{marginBottom:'35px'}}>
            <Form.Label>Email</Form.Label>
            <Form.Control value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} type="text" placeholder="Enter Email" />
        </Form.Group>
        <Form.Group style={{marginBottom:'35px'}}>
            <Form.Label>Password</Form.Label>
            <Form.Control value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} type="password" placeholder="Enter Password" />
        </Form.Group>
        <Button variant="primary" type="submit" style={{backgroundColor:'#FFAF00', border:'0px', width:'100%', marginBottom:'10px'}} >Login</Button>

        <div style={{textAlign:'center', fontWeight:'500'}}>Don't have an account ? klik
            <button style={{border:'0px', backgroundColor:'transparent', fontWeight:'bold'}} onClick={(e) => {
              e.preventDefault()
              openRegister()
            }}>Here</button>
        </div>
    </Form>
  );
}

export default FormLogin;
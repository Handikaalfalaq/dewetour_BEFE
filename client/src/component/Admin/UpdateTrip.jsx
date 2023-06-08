import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/api';

function UpdateFormTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: dataCountry } = useQuery('dataCountryCache', async () => {
    const response = await API.get('/country');
    return response.data.data;
  });

  const { data: dataTripById } = useQuery('dataAllTripCache', async () => {
    const response = await API.get(`/trip/${id}`);
    return response.data.data;
  });

  const [formTrip, setFormTrip] = useState({
    title: '',
    country: '',
    accomodation: '',
    transportation: '',
    eat: '',
    day: '',
    night: '',
    duration: '',
    dateTrip: '',
    price: '',
    quotaMax: '',
    quotaFilled: 1,
    description: '',
    image: '',
  });

  useEffect(() => {
    if (dataTripById) {
      setFormTrip({
        title: dataTripById.title || '',
        country: dataTripById.country || '',
        accomodation: dataTripById.accomodation || '',
        transportation: dataTripById.transportation || '',
        eat: dataTripById.eat || '',
        day: dataTripById.day || '',
        night: dataTripById.night || '',
        duration: dataTripById.duration || '',
        dateTrip: dataTripById.dateTrip || '',
        price: dataTripById.price || '',
        quotaMax: dataTripById.quotaMax || '',
        quotaFilled: dataTripById.quotaFilled || '',
        description: dataTripById.description || '',
        image: '',
      });
    }
  }, [dataTripById]);

  const handleChange = (e) => {
    setFormTrip({
      ...formTrip,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = useMutation(async () => {
    try {
      // e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set('title', formTrip.title);
      formData.set('country_id', formTrip.country);
      formData.set('accomodation', formTrip.accomodation);
      formData.set('transportation', formTrip.transportation);
      formData.set('eat', formTrip.eat);
      formData.set('day', formTrip.day);
      formData.set('night', formTrip.night);
      formData.set('dateTrip', formTrip.dateTrip);
      formData.set('price', formTrip.price);
      formData.set('quotaMax', formTrip.quotaMax);
      formData.set('quotaFilled', formTrip.quotaFilled);
      formData.set('description', formTrip.description);
      formData.append('image', formTrip.image[0], formTrip.image[0].name);

      const response = await API.e.patch(`/trip/${id}`, formData, config);
      console.log('add trip success : ', response);

      navigate('/IncomeTrip');
    } catch (error) {
      console.log('add trip failed : ', error);
    }
  });

      
    return (
    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit.mutate(); }} style={{padding:'108px 118px', position:'relative'}}>
        <div style={{fontSize:'36px', marginBottom:'42px'}}>Add Trip</div>
        <Form.Group className="mb-3">
            <Form.Label>Title Trip</Form.Label>
            <Form.Control name="title" value={formTrip.title} onChange={handleChange} style={{width:'1204px'}} required/>
        </Form.Group>
        
        <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Select onChange={handleChange} name="country" value={formTrip.country} style={{width:'1204px'}}>
                <option>Select Country</option>
               {dataCountry?.map((item, index) => {
                return (
                <option key={index} value={item.id_country} >{item.country}</option>
                );
              })}
            </Form.Select>
        </Form.Group> 

        <Form.Group className="mb-3">
            <Form.Label>Accomodation</Form.Label>
            <Form.Control name="accomodation" value={formTrip.accomodation} onChange={handleChange} style={{width:'1204px'}} required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Transportation</Form.Label>
            <Form.Control name="transportation"  value={formTrip.transportation} onChange={handleChange} style={{width:'1204px'}} required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Eat</Form.Label>
            <Form.Control name="eat"  value={formTrip.eat} onChange={handleChange} style={{width:'1204px'}} required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Duration</Form.Label>
            <div style={{display:'flex'}}>
                <Form.Control type="number" name="day"  value={formTrip.day} onChange={handleChange}  style={{width:'228px'}} required/> Days
                <Form.Control type="number" name="night"  value={formTrip.night} onChange={handleChange} style={{width:'228px'}} required/> Night
            </div>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Date Trip</Form.Label>
            <Form.Control type="date" name="dateTrip" value={formTrip.dateTrip} onChange={handleChange} style={{width:'1204px'}} required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price"  value={formTrip.price} onChange={handleChange} style={{width:'1204px'}} required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Quota Max</Form.Label>
            <Form.Control type="number" name="quotaMax"  value={formTrip.quotaMax} onChange={handleChange} style={{width:'1204px'}} required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control name="description"  value={formTrip.description} onChange={handleChange} style={{width:'1204px', height:'117px'}} required/>
        </Form.Group>
    
        <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control name="image" onChange={handleChange} type="file" required/>
        </Form.Group>

      <Button type="submit" style={{width:'150px', position:'absolute', left:'650px', bottom:'10px', backgroundColor:'#FFAF00', border:'0px'}} >Submit</Button>
    </Form>
    );
}

export default UpdateFormTrip;


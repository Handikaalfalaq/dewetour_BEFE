import { Card } from "react-bootstrap"
import DataTour from "./assets/DataDetailTour"
import './assets/Index.css'
import { useParams } from "react-router-dom";
import React, {useState , useEffect, useContext} from 'react'
import FolderImage from './img/FolderImg'
import { useNavigate} from 'react-router-dom';
import { DataContext } from "../context/dataContext";
import Modal from 'react-bootstrap/modal';
import Carousel from 'react-bootstrap/Carousel';
import {useQuery} from 'react-query';
import { API } from '../config/api';
const dataHidden = DataTour.length - 3;

function FotoTour (){
    const {data: dataAllTrip}= useQuery("dataAllTripCache", async () => {
        const response = await API.get("/trip")
        return response.data.data
    })
    const {total, setTotal, setAmount, setDateBooking, setPaySukses, userLogin} = useContext(DataContext)
    const number = useParams("id")
    const [modalImage, setmodalImage] = useState(false);

    const navigate = useNavigate()
    const [calculation, setCalculation] = useState(1);
    const handlePlusClick = () => {
        setCalculation(calculation + 1);
    };

    const handleMinusClick = () => {
        if (calculation > 1) {
        setCalculation(calculation - 1);
        }
    };

    useEffect(() => {
        setAmount(calculation);
        setTotal(dataAllTrip[number.id].price * calculation);
      }, [calculation, number.id, setTotal, setAmount, dataAllTrip]);
      
    const handleDate = () => {
        const date = new Date();
        const formattedDate = date.toLocaleString('default', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
    setDateBooking(formattedDate);
    };

    const handleBooking = () =>{
        handleDate();
        if (userLogin === true) {
        navigate('/Payment/' + number.id);
        setPaySukses(false);




        
    } else {
        alert('Harus Login Terlebih Dahulu')
    }}

    const handleOpenImage = () => {
        setmodalImage(true)
    }

    const handleCloseImage = () => {
        setmodalImage(false)
    }
    
    return(
        <>
            <Card className="containerFotoTour">
                <div className="titleFotoTour">{dataAllTrip[number.id].title}</div>
                <p className="destinationFotoTour">{dataAllTrip[number.id].country.country}</p>

                <div className="mainFotoTour" style={{backgroundImage: `url(${dataAllTrip[number.id].image})`}}></div>
                <div className="imageFotoTour"> 

                {DataTour[number.id].Image.slice(1, 4).map((image, index) => {
                    if (index === 2) {
                        return (
                        <div key={index} className="secondaryFotoTour" style={{ backgroundImage: `url(${image})`, filter:'blur(1.5px)'}}></div>
                        );
                    } else {
                        return (
                        <div key={index} className="secondaryFotoTour" style={{ backgroundImage: `url(${image})` }}></div>
                        );
                    }
                    })} 
                    
                    <p className="dataHidden" style={{cursor:'pointer'}} onClick={handleOpenImage}> + {dataHidden}</p>
                </div>
            </Card>


            <Card style={{padding:'0px 210px', borderRadius:'0px', maxWidth:'2040px', border:'0px', margin:'auto',backgroundColor:'transparent'}}>
            <p style={{margin:'47px 0px 10px', height:'24px', fontWeight:'bold'}}>Information Trip</p>
            <div style={{display:'flex', justifyContent:'space-between'}}>
            
            <div>
                <p style={{fontSize:'12px' ,height:'18px', marginBottom:'3px', color:'#A8A8A8'}}>Accomodation</p>
                <div style={{margin:'auto', fontSize:'17px' ,height:'33px', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold'}}>
                    <p><img src={FolderImage.Calendar} alt="icon" /></p>
                    <p style={{marginLeft:'14px'}}>Hotel {dataAllTrip[number.id].night} Night</p>
                </div>
            </div>

            <div>
                <p style={{fontSize:'12px' ,height:'18px', marginBottom:'3px', color:'#A8A8A8'}}>Transportation</p>
                <div style={{margin:'auto', fontSize:'17px' ,height:'33px', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold'}}>
                    <p><img src={FolderImage.Plane} alt="icon" /></p>
                    <p style={{marginLeft:'14px'}}>{dataAllTrip[number.id].transportation}</p>
                </div>
            </div>

            <div>
                <p style={{fontSize:'12px' ,height:'18px', marginBottom:'3px', color:'#A8A8A8'}}>Eat</p>
                <div style={{margin:'auto', fontSize:'17px' ,height:'33px', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold'}}>
                    <p><img src={FolderImage.Meal} alt="icon" /></p>
                    <p style={{marginLeft:'14px'}}>{dataAllTrip[number.id].eat}</p>
                </div>
            </div>

            <div>
                <p style={{fontSize:'12px' ,height:'18px', marginBottom:'3px', color:'#A8A8A8'}}>Duration</p>
                <div style={{margin:'auto', fontSize:'17px' ,height:'33px', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold'}}>
                    <p><img src={FolderImage.Time} alt="icon" /></p>
                    <p style={{marginLeft:'14px'}}>{dataAllTrip[number.id].day} day {dataAllTrip[number.id].night} night </p>
                </div>
            </div>


            <div>
                <p style={{fontSize:'12px' ,height:'18px', marginBottom:'3px', color:'#A8A8A8'}}>Date Trip</p>
                <div style={{margin:'auto', fontSize:'17px' ,height:'33px', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold'}}>
                    <p><img src={FolderImage.Hotel} alt="icon" /></p>
                    <p style={{marginLeft:'14px'}}>{dataAllTrip[number.id].dateTrip} </p>
                </div>
            </div>

            </div>
            <div className="description">
                <p style={{fontSize:'18px', margin:'20px 0px 7px', fontWeight:'bold'}}>Description</p>
                <p style={{color:'#A8A8A8'}}>{dataAllTrip[number.id].description}</p>
            </div>
            </Card>

            <div className='containerPricePerson'>
                <div className='tablePricePerson'>
                    <div style={{display:'flex'}}>
                        <div style={{color:'#FFAF00', marginRight:'5px'}}>IDR. {dataAllTrip[number.id].price.toLocaleString()}</div>
                        <div>/ Person</div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                       
                        <button style={{border:'0px', backgroundColor:'transparent'}} onClick={handleMinusClick}><img src={FolderImage.Minus} alt="minus" /></button>

                        <div style={{margin:'0px 20px', fontSize:'18px', fontWeight:'bold'}}>{calculation}</div>
                        
                        <button style={{border:'0px', backgroundColor:'transparent'}} onClick={handlePlusClick}><img src={FolderImage.Plus} alt="Plus" /></button>

                    </div>
                </div>
                <div className='price'>
                    <div>Total :</div>
                    <div>IDR.{total.toLocaleString()}</div>
                </div>
                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                    <button className='buttonBooking' onClick={handleBooking}>BOOK NOW</button>
                </div>
            </div>

            <Modal show={modalImage} onHide={handleCloseImage} display={{alignItems:'center'}}>
                <Carousel style={{ backgroundColor:'transparent', maxWidth:'3000px', display:'flex', flexDirection:'columb', }}>
                
                {DataTour[number.id].Image.map((image,index) => {
                    return (
                    <Carousel.Item interval={1000} key={index}>
                        <div key={index} className="secondaryFotoTour" style={{ backgroundImage: `url(${image})`, backgroundSize:'cover', width:'500px', height:'400px', backgroundPosition: 'center', borderRadius:'10px'}}></div>
                    </Carousel.Item>
                    )
                })}

                </Carousel>
            </Modal>
        </>
    )
}

export default FotoTour
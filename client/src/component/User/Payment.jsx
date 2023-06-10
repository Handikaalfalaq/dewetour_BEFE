import FolderImage from "../img/FolderImg"
import '../assets/Index.css'
import { DataContext } from "../../context/dataContext";
import { useContext, useState} from "react";
import {useQuery} from 'react-query';
import { API } from '../../config/api';
import Modal from 'react-bootstrap/modal';
import jwtDecode from 'jwt-decode';


function Payment () {
    console.log("atas")
    const idToken = localStorage.getItem("token");
    const idUserByToken = jwtDecode(idToken)

    const {data: dataTransactionUser}= useQuery("dataTransactionUserCache", async () => {
        const response = await API.get(`/transactions/${idUserByToken.id}`)
        return response.data.data
    }) 
    
    const idLast = dataTransactionUser.length - 1
    const dataLast = dataTransactionUser[idLast]
    const { setAppearancePay} = useContext(DataContext);
    const [payModal, setPayModal] = useState(false);
    const [paySukses, setPaySukses] = useState(false);
    

    const handlePay = () => {
        setPayModal(true);
    }

    const handleClosePopUp = () => {
        setAppearancePay(true)
        setPayModal(false)
        setPaySukses(true);
    }

    return (
        <div style={{display:'flex'}}>
            <div style={{display:'flex', width:'1440px', height:'777px', padding:'66px 202px', backgroundColor:'#E5E5E5'}}>
                <div className="grid-container" style={{display: 'grid', gridTemplateColumns: 'auto auto', width:'1035px', height:'419px', padding:'8px 63px 17px 35px', border:'1px solid #B7B7B7', borderRadius:'10px', position:'relative', backgroundColor:'white'}}>

                    <div style={{display: 'grid', gridTemplateColumns: 'auto auto'}}>
                        <div style={{gridColumn: 'span 2'}}><img src={FolderImage.Icon} alt="icon" style={{ height: '68px'}} /></div>
                        <div>

                            <p style={{fontSize: '24px', fontWeight:'bold', margin:'0px', maxWidth:'370px'}}>{dataLast.trip.day} D/ {dataLast.trip.night} N {dataLast.trip.title}</p>

                            <p style={{fontSize: '14px', margin:'4px 0px 31px'}}>{dataLast.trip.country.country}</p>

                            {paySukses ? (
                                <p style={{width:'112px', height:'24px',fontSize: '12px', backgroundColor:'rgb(236, 122, 122, 0.3', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold', color:'#FF9900'}}>Waiting Approve</p>
                            ) : (
                                <p style={{width:'112px', height:'24px',fontSize: '12px', color:'#EC7A7A', backgroundColor:'rgb(236, 122, 122, 0.3', display:'flex', justifyContent:'center', alignItems:'center'}}>{dataLast.status}</p>
                            )}

                        </div>
                            <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gridRow: 'span 2'}}>
                            <div>
                                <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>Date Trip</p>
                                <p>{dataLast.trip.dateTrip}</p>
                            </div>

                            <div>
                                <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>Duration</p>
                                <p>{dataLast.trip.day} day {dataLast.trip.night} night </p>
                            </div>

                            <div>
                                <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>Accomodation</p>
                                <p>Hotel {dataLast.trip.night} Night</p>
                            </div>

                            <div>
                                <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>Transportation</p>
                                <p>{dataLast.trip.transportation}</p>
                            </div>
                        </div>
                    </div>


                    <div rowSpan="2" style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                        <p style={{fontWeight:'bold', fontSize:'36px', marginBottom:'4px'}}>Booking</p>
                        <p style={{margin:'0px'}}>{dataLast.trip.date}</p>
                        {/* <img style={{margin:'20px 0px 13px'}} src={FolderImage.Nota} alt="" />
                        <p style={{fontSize:'13px', color:'#818181', margin:'0px'}}>Upload payment proof</p> */}
                    </div>

                    <div className="PaymentTabel" style={{ display: 'grid', gridTemplateColumns: '10% 18% 18% 18% 18% 18%', gridColumn: 'span 2', fontSize:'18px', fontWeight:'bold'}}>
                        <div>No</div>
                        <div>Full Name</div>
                        <div>Gender</div>
                        <div>Phone</div>
                        <div></div>
                        <div></div>
                    </div>
                    
                    <div className="PaymentTabel2" style={{display: 'grid', gridTemplateColumns: '10% 18% 18% 18% 18% 18%', gridColumn: 'span 2', color:'#B1B1B1'}}>
                        <div>1</div>
                        <div>{dataLast.customerName}</div>
                        <div>{dataLast.customerGender}</div>
                        <div>{dataLast.customerPhone}</div>
                        <div style={{color:'black', fontWeight:'bold'}}>Qty</div>
                        <div style={{color:'black', fontWeight:'bold'}}>: {dataLast.amount}</div>
                    </div>

                    <div className="PaymentTabel3" style={{ display: 'grid', gridTemplateColumns: '10% 18% 18% 18% 18% 18%', gridColumn: 'span 2', fontWeight:'bold'}}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>Total</div>
                        {/* <div style={{color:'red', border:'0px'}}>: IDR.</div> */}
                        <div style={{color:'red', border:'0px'}}>: IDR.{dataLast.total.toLocaleString()}</div>
                    </div>
                    
                    {paySukses ? (
                        <div></div>
                    ): (
                        <button style={{height:'50px', width:'213px', backgroundColor:'#FFAF00', borderRadius:'4px', border:'0px', position:'absolute', bottom:'-78px', right:'0px'}} onClick={handlePay}>PAY</button>
                    )}
                    
                </div>
                <Modal show={payModal} onHide={handleClosePopUp} display={{alignItems:'center'}}>
                    <div style={{display:'flex', margin:'auto', color:'green'}}>Yourpayment will be confirmed within 1 x 24 hours</div>
                    <div style={{display:'flex', margin:'auto', color:'green'}}>To see orders click <b style={{ margin: '0px 5px', cursor:'pointer' }} onClick={handleClosePopUp }> Here </b> thank your</div>
                </Modal>
            </div>
            
        </div>
    )
}

export default Payment

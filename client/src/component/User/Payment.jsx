import FolderImage from "../img/FolderImg"
import '../assets/Index.css'
import DataTour from '../assets/DataDetailTour'
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/dataContext";
import { useContext, useState} from "react";
import Modal from 'react-bootstrap/modal';

function Payment () {
    const {total, amount, dateBooking, setDataBooking, paySukses, setPaySukses, setAppearancePay} = useContext(DataContext);
    const [payModal, setPayModal] = useState(false);
    
    const {id} = useParams()
    const DataSlice = DataTour[id].InformationTrip.slice(0, 2).concat(DataTour[id].InformationTrip.slice(3))
    const DataFilter = [DataSlice[3],DataSlice[2], DataSlice[0], DataSlice[1]]
    
    const handlePay = () => {
        setPayModal(true);
        setDataBooking(
            { 
                id : id,
                time : DataTour[id].Time,
                destination: DataTour[id].Destination ,
                country: DataTour[id].Country,
                dataTrip: DataFilter,
                amount : amount,
                total : total,
            }
        );
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

                            <p style={{fontSize: '24px', fontWeight:'bold', margin:'0px', maxWidth:'370px'}}>{DataTour[id].Time} {DataTour[id].Destination}</p>
                            <p style={{fontSize: '14px', margin:'4px 0px 31px'}}>{DataTour[id].Country}</p>

                            {paySukses ? (
                                <p style={{width:'112px', height:'24px',fontSize: '12px', backgroundColor:'rgb(236, 122, 122, 0.3', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold', color:'#FF9900'}}>Waiting Approve</p>
                            ) : (
                                <p style={{width:'112px', height:'24px',fontSize: '12px', color:'#EC7A7A', backgroundColor:'rgb(236, 122, 122, 0.3', display:'flex', justifyContent:'center', alignItems:'center'}}>Waiting Payment</p>
                            )}

                        </div>
                        <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gridRow: 'span 2'}}>
                        {DataFilter.map((item, index) => {
                            return (
                                <div key={index}>
                                    <p style={{fontWeight:'bold', marginBottom:'3px', fontSize:'18px'}}>{item[0]}</p>
                                    <p>{item[2]}</p>
                                </div>
                            )})}
                        </div>
                    </div>

                    <div rowSpan="2" style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                        <p style={{fontWeight:'bold', fontSize:'36px', marginBottom:'4px'}}>Booking</p>
                        <p style={{margin:'0px'}}>{dateBooking}</p>
                        <img style={{margin:'20px 0px 13px'}} src={FolderImage.Nota} alt="" />
                        <p style={{fontSize:'13px', color:'#818181', margin:'0px'}}>Upload payment proof</p>
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
                        <div>Handika</div>
                        <div>Male</div>
                        <div>0812345678</div>
                        <div style={{color:'black', fontWeight:'bold'}}>Qty</div>
                        <div style={{color:'black', fontWeight:'bold'}}>: {amount}</div>
                    </div>

                    <div className="PaymentTabel3" style={{ display: 'grid', gridTemplateColumns: '10% 18% 18% 18% 18% 18%', gridColumn: 'span 2', fontWeight:'bold'}}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>Total</div>
                        <div style={{color:'red', border:'0px'}}>: IDR.{total.toLocaleString()}</div>
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

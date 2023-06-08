import DataAdmin from "../assets/DataAdmin";
import "../assets/Index.css";
import FolderImage from "../img/FolderImg";
import dataModalApprove from "../assets/dataModalApprove";
import { useState } from "react";
import Modal from 'react-bootstrap/modal';

const DataList = [
  "No",
  "Usert",
  "Trip",
  "Bukti Transfer",
  "Status Payment",
  "Action",
];

function TransactionList() {
  const [numberIndex, setNumberIndex] = useState(null);
  const handleIndex = (index) => {
    setNumberIndex(index);

  };

  const handleCloseIndex = () => {
    setNumberIndex(null);
  };

  return (
    <div style={{display: "flex", flexDirection: "column", width: "1440px", backgroundColor: "transparent", zIndex: "1", padding: "105px 87px 0px"}}>
      <div style={{ fontSize: "36px" }}>Incoming Transaction</div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "auto"}} >
        {DataList.map((item, index) => (
          <div key={index}  style={{ display: "flex", alignItems: "center", borderBottom: "1px solid black", height: "73px", padding: "0px 3px", fontWeight: "bold"}}> {item} </div>
        ))}
      </div>

      {DataAdmin.map((item, index) => {
        return (
          <div key={index} style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "auto"}} >
            <div className="transactionLish">{item.No}</div>
            <div className="transactionLish">{item.Users}</div>
            <div className="transactionLish">{item.Trip}</div>
            <div className="transactionLish">{item.BuktiTransfer}</div>

            
            <div className="transactionLish" >
              {item.StatusPayment === "Approve" ? (
                <div className="transactionLish" style={{ color: '#0ACF83', border:'0px'}}>{item.StatusPayment}</div>
              ) : item.StatusPayment === "Pending" ? (
                <div className="transactionLish" style={{ color: '#F7941E' , border:'0px'}}>{item.StatusPayment}</div>
              ) : (
                <div className="transactionLish" style={{ color: '#FF0742' , border:'0px'}}>{item.StatusPayment}</div>
              )}
            </div>

            <div className="transactionLish">
              <img src={item.Action} alt={item.Action} onClick={() => handleIndex(index)} />
            </div>
          </div>
        );
      })}

      {numberIndex !== null ? 
      <Modal show={numberIndex !== null} onHide={handleCloseIndex}>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", width: "1440px"}} >
            <div className="grid-container" style={{ display: "grid", gridTemplateColumns: "auto auto", width: "1035px", padding: "8px 63px 17px 35px", border: "1px solid #B7B7B7", borderRadius: "10px", position: "absolute", backgroundColor: "white", left:"-270px", top: "100px"}}>

              <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                <div style={{ gridColumn: "span 2" }}>
                  <img src={FolderImage.Icon} alt="icon" style={{ height: "68px" }} />
                </div>
                <div>
                  <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0px",  maxWidth: "370px"}} >
                    {dataModalApprove[numberIndex].Trip }
                  </p>

                  <p style={{ fontSize: "14px", margin: "4px 0px 31px" }}>
                    {dataModalApprove[numberIndex].Country}
                  </p>

                  <p style={{width: "112px", height: "24px", fontSize: "12px", backgroundColor: "rgb(236, 122, 122, 0.3", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", color: "#FF9900"}}>
                    Waiting Approve
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "auto auto", gridRow: "span 2"}}>
                  {dataModalApprove[numberIndex].InformationTrip.map((item, index) => {
                      return (
                        <div key={index}>
                          <p style={{ fontWeight: "bold", marginBottom: "3px", fontSize: "18px"}}>
                            {item[0]}
                          </p>
                          <p>{item[2]}</p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div rowSpan="2" style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                  <p style={{fontWeight:'bold', fontSize:'36px', marginBottom:'4px'}}>Booking</p>
                  <p style={{margin:'0px'}}>{dataModalApprove[numberIndex].DateBooking}</p>
                  <img style={{margin:'20px 0px 13px'}} src={FolderImage.Nota} alt="" />
                  <p style={{fontSize:'13px', color:'#818181', margin:'0px'}}>Upload payment proof</p>
              </div>

              <div className="PaymentTabel" style={{ display: "grid", gridTemplateColumns: "10% 18% 18% 18% 18% 18%",  gridColumn: "span 2", fontSize: "18px", fontWeight: "bold"}}>
                <div>No</div>
                <div>Full Name</div>
                <div>Gender</div>
                <div>Phone</div>
                <div></div>
                <div></div>
              </div>

              <div className="PaymentTabel2" style={{ display: "grid", gridTemplateColumns: "10% 18% 18% 18% 18% 18%", gridColumn: "span 2", color: "#B1B1B1"}} >
                <div>1</div>
                <div>Handika</div>
                <div>Male</div>
                <div>0812345678</div>
                <div style={{ color: "black", fontWeight: "bold" }}>Qty</div>
                <div style={{color:'black', fontWeight:'bold'}}>: {dataModalApprove[numberIndex].Amount}</div>
              </div>

              <div className="PaymentTabel3" style={{ display: "grid", gridTemplateColumns: "10% 18% 18% 18% 18% 18%", gridColumn: "span 2", fontWeight: "bold"}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>Total</div>
                <div style={{color:'red', border:'0px'}}>: IDR.{dataModalApprove[numberIndex].Total.toLocaleString()}</div>
              </div>

              <div></div>
              
              <div style={{display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
                <div style={{backgroundColor:'#FF0742', fontSize:'18px', height:'35px', width:'100px', color:'white', fontWeight:'bold', borderRadius:'5px', textAlign:'center', paddingTop:'4px', marginRight:'30px'}}>Cancel</div>
                <div style={{backgroundColor:'#0ACF83', fontSize:'18px', height:'35px', width:'100px', color:'white', fontWeight:'bold', borderRadius:'5px', textAlign:'center', paddingTop:'4px'}}>Approve</div>
              </div>

            </div>
          </div>
        </div>
      </Modal> : <div></div>
    }
    </div>
  );
}

export default TransactionList;

import FolderImage from "../img/FolderImg"
// import DataPersonalInfo from "../assets/DataPersonalInfo"
import { API } from '../../config/api';
import { DataContext } from "../../context/dataContext";
import React, {useContext} from 'react';
import {useQuery} from 'react-query';

function PersonalInfo (){
    const {idUserLogin} = useContext(DataContext)
    
    const {data: dataProfileUser}= useQuery("dataCountryCache", async () => {
        const response = await API.get(`/user/${idUserLogin}`)
        return response.data.data
    })
    console.log(dataProfileUser)
    return (
        <div style={{display:'flex', width:'1440px', backgroundColor:'#E5E5E5', zIndex:'1'}}>
            <div style={{display:'flex', width:'1440px', backgroundColor:'#E5E5E5', zIndex:'1', paddingTop:'114px'}}>
                <div style={{height:'453px', width:'785px', backgroundColor:'white', display:'flex', margin:'auto',justifyContent:'space-around', padding:'24px 24px 21px 31px', zIndex:'1'}}>
                    <div>
                        <div style={{ fontSize:'36px', fontWeight:'bold', marginBottom:'53px'}}>Personal Info</div>
                    
                        <div style={{display:'flex' , alignItems:'center', marginBottom:'28px'}}>
                            <div style={{backgroundImage:`url(${FolderImage.Vector})`, backgroundSize:'cover', height:'30px', width:'30px', marginRight:'15px'}}></div>
                            <div>
                                <div style={{fontSize:'14px', fontWeight:'bold', }}> {dataProfileUser?.fullname}</div>
                                <div style={{fontSize:'14px', color:'#8A8C90'}}>Full Name</div>
                            </div>
                        </div>

                        <div style={{display:'flex' , alignItems:'center', marginBottom:'28px'}}>
                            <div style={{backgroundImage:`url(${FolderImage.Letter})`, backgroundSize:'cover', height:'30px', width:'30px', marginRight:'15px'}}></div>
                            <div>
                                <div style={{fontSize:'14px', fontWeight:'bold', }}> {dataProfileUser?.email}</div>
                                <div style={{fontSize:'14px', color:'#8A8C90'}}>Email</div>
                            </div>
                        </div>

                        <div style={{display:'flex' , alignItems:'center', marginBottom:'28px'}}>
                            <div style={{backgroundImage:`url(${FolderImage.Phone})`, backgroundSize:'cover', height:'30px', width:'30px', marginRight:'15px'}}></div>
                            <div>
                                <div style={{fontSize:'14px', fontWeight:'bold', }}> {dataProfileUser?.phone}</div>
                                <div style={{fontSize:'14px', color:'#8A8C90'}}>Phone Number</div>
                            </div>
                        </div>

                        <div style={{display:'flex' , alignItems:'center', marginBottom:'28px'}}>
                            <div style={{backgroundImage:`url(${FolderImage.Place})`, backgroundSize:'cover', height:'30px', width:'30px', marginRight:'15px'}}></div>
                            <div>
                                <div style={{fontSize:'14px', fontWeight:'bold', }}> {dataProfileUser?.address}</div>
                                <div style={{fontSize:'14px', color:'#8A8C90'}}>Address</div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div style={{ height: '345px', width: '280px', backgroundImage: `url(${FolderImage.FotoProfil})`, backgroundSize:'cover', backgroundPosition: 'center', borderRadius:'10px'}}></div>
                        <button style={{ height: '50px', width: '280px', borderRadius:'5px', marginTop:'13px', fontSize:'18px', backgroundColor:'#FFAF00', color:'white', border:'0px', fontWeight:'bold'}}>Change Photo Profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo


 // {/* {DataPersonalInfo.map((item, index) => {
                        //     return (
                        //     <div key={index} style={{display:'flex' , alignItems:'center', marginBottom:'28px'}}>
                        //         <div style={{backgroundImage:`url(${item.Icon})`, backgroundSize:'cover', height:'30px', width:'30px', marginRight:'15px'}}></div>
                        //         <div>
                        //             <div style={{fontSize:'14px', fontWeight:'bold', }}>{item.Data}</div>
                        //             <div style={{fontSize:'14px', color:'#8A8C90'}}>{item.Info}</div>
                        //         </div>
                        //     </div>
                        //     )
                        // })} */}
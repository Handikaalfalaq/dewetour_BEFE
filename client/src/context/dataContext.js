import React, { createContext, useState, useReducer} from 'react';

export const DataContext = createContext();

const initialState = {
    isLogin: false,
    user: {},
  };
  
const reducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "USER_SUCCESS":
    //   case "LOGIN_SUCCESS":
        localStorage.setItem("token", payload.token);
        return {
          isLogin: true,
          user: payload,
        };
      case "AUTH_ERROR":
      case "LOGOUT":
        localStorage.removeItem("token");
        return {
          isLogin: false,
          user: {},
        };
      default:
        throw new Error();
    }
  };

export const DataProvider = ({children}) => {
    const [total, setTotal] = useState('');
    const [amount, setAmount] = useState('1');
    const [dateBooking, setDateBooking] = useState('Belum ada tanggal');
    const [formLogin, setFormLogin] = useState([]);
    const [userLogin, setUserLogin] = useState(false);
    const [adminLogin, setAdminLogin] = useState(false);
    const [navbarProfile, setNavbarProfile] = useState(false);
    const [Number, setNumber] = useState('');
    const [dataBooking, setDataBooking] = useState('');
    const [paySukses, setPaySukses] = useState(false);
    const [appearancePay, setAppearancePay] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={{total, setTotal, amount, setAmount, dateBooking, setDateBooking, userLogin, setUserLogin, dataBooking, setDataBooking, paySukses, setPaySukses, adminLogin, setAdminLogin, navbarProfile, setNavbarProfile, Number, setNumber, appearancePay, setAppearancePay, state, dispatch, formLogin, setFormLogin}}>
            {children}
        </DataContext.Provider>
    );
};
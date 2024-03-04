
import AuthProvider from "./component/authContext";
import WelcomePage from "./container/welcomePage";
import SignupPage from "./container/signupPage";
import SigninPage from "./container/signinPage";
import SignupConfirmPage from "./container/signupConfirmPage";
import RecoveryPage from "./container/recoveryPage";
import RecoveryConfirmPage from "./container/recoveryConfirmPage";
import BalancePage from "./container/balancePage";
import SettingPage from "./container/settingsPage";
import NotificationsPage from "./container/notificationPage";
import SendPage from "./container/sendPage";
import ReceivePage from "./container/receivePage";
import TransactionPage from "./container/transactionPage";
import React from "react";


import { BrowserRouter, Route, Routes } from "react-router-dom";





function App() {


  
  // const authContextData = {
  //    user:null,
  //   isAuthenticated: false,
  //      accessToken:null
    
  // }

  //  const AuthContext = React.createContext(authContextData)
  
  return (
     <AuthProvider  >
       {/* <AuthContext.Provider value={authContextData } > */}
    <BrowserRouter>
     <Routes>
        <Route index element={<WelcomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/signup-confirm' element={<SignupConfirmPage />} />
        <Route path='/recovery' element={<RecoveryPage />} />
        <Route path='/recovery-confirm' element={<RecoveryConfirmPage />} />
          <Route path='/balance' element={<BalancePage />} />
          <Route path='/settings' element={<SettingPage />} />
          <Route path='/notifications' element={<NotificationsPage />} />
          <Route path='/receive' element={<ReceivePage />} />
          <Route path='/send' element={<SendPage />} />
          <Route path='/transaction' element={<TransactionPage />} />
          
      </Routes>
    </BrowserRouter>
    </AuthProvider >
    )
}

export default App;

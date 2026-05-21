 import './App.css'
import React from 'react'

import { BrowserRouter } from 'react-router-dom'


import HeaderBar from './ui/HeaderBar'


import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'


import { ThemeProvider } from '@mui/material/styles'
import theme from './ui/theme'


import FooterBar from './ui/FooterBar'


import AppRoutes from './routes/AppRoutes'

import AuthContext from './contexts/AuthContext'



function App() {


 const [authState, setAuthState] = React.useState({
   authUser: null,
   redirectTo: null
 })
 const {
   authUser,
   redirectTo
 } = authState


 return (
   <>
     <ThemeProvider theme={theme}>


       <CssBaseline />


       <BrowserRouter>


         {/* Qualquer componente carregado entre <AuthContext.Provider> e
             </AuthContext.Provider> poderá acessar os dados compartilhados
             por AuthProvider por meio do 'value'
         */}
         <AuthContext.Provider value={{ authState, setAuthState }} >


           <HeaderBar />


           {/* Dentro da prop "sx", "m" significa "margin" */}
           <Box id="innerRoot" sx={{ m: '48px 24px' }}>
             <AppRoutes />
           </Box>


           <FooterBar />
        
         </AuthContext.Provider>
        
       </BrowserRouter>


     </ThemeProvider>
   </>
 )
}


export default App

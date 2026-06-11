import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { feedbackWait } from '../ui/Feedback'
import AuthContext from '../contexts/AuthContext'
import fetchAuth from '../lib/fetchAuth'
import { UserLevel } from './routes'

export default function AuthGuard({ children, userLevel = UserLevel.ANY }) {
  const { authState, setAuthState } = React.useContext(AuthContext)
  const {
    authUser
  } = authState

  const [status, setStatus] = React.useState('IDLE')
  const navigate = useNavigate()
  const location = useLocation()

  async function checkAuthUser() {
    setStatus('PROCESSING')
    feedbackWait(true)
    try {
      const user = await fetchAuth.get('/users/me')
      setAuthState({ ...authState, authUser: user })
    }
    catch (error) {
      setAuthState({ ...authState, authUser: null })
      console.error(error)
      navigate('/login', { replace: true })
    }
    finally {
      feedbackWait(false)
      setStatus('DONE')
    }
  }

  React.useEffect(() => {
    if (!location.pathname.includes('login')) {
      setAuthState({ ...authState, redirectTo: location })
    }
    checkAuthUser()
  }, [location])

  if (['IDLE', 'PROCESSING'].includes(status)) return <></>

  if (!authUser && userLevel > UserLevel.ANY) {
    console.log({ authUser, userLevel })
    return <Navigate to="/login" replace />
  }

  if (!(authUser?.is_admin) && userLevel === UserLevel.ADMIN) return (
    <Box>
      <Typography variant="h2" color="error">
        Acesso negado
      </Typography>
    </Box>
  )

  return children
}
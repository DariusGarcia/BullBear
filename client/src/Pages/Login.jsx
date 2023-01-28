import { useState, useEffect } from 'react'

import Navbar from '../Components/Layout/navbar'
import LoginForm from '../Components/LoginForm'

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    document.title = 'BullBear - Login'
  }, [])

  return (
    <>
      <Navbar />
      <LoginForm userInfo={userInfo} setUserInfo={setUserInfo} />
    </>
  )
}

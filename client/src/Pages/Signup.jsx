import { useState } from 'react'
import Navbar from '../Components/Layout/navbar'
import SignUpForm from '../Components/SignUpForm'

export default function Example() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  })

  return (
    <>
      <Navbar />
      <SignUpForm userInfo={userInfo} setUserInfo={setUserInfo} />
    </>
  )
}

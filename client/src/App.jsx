import Login from './pages/Login'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Feed from './pages/Feed'
import Messages from './pages/Messages'
import ChatBox from './pages/ChatBox'
import Connections from './pages/Connections'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import { useUser, useAuth } from '@clerk/clerk-react'
import Layout from './pages/Layout'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'

const App = () => {
  const { user } = useUser()
  const { getToken } = useAuth()

useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken()
        console.log("CLERK TOKEN FOR POSTMAN:", token)
      } catch (err) {
        console.error("Token error:", err)
      }
    }

    if (user) {
      fetchToken()
    }
  }, [user, getToken])

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:userId" element={<ChatBox />} />
          <Route path="connections" element={<Connections />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:profileId" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )
}

export default App


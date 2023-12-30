"use client"
import useLoginModal from '@/hooks/useLoginModal'
import React, { useCallback, useState } from 'react'
import Modal from '../Modal'
import Input from '../Input'

const LoginModal = () => {
  const loginModal = useLoginModal()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
        setIsLoading(true)

        // TODO: ADD LOGIN

        loginModal.onOpen()
    } catch (error) {
        console.log(error)
    }finally{
        setIsLoading(false)
    }
  },[loginModal])

  const bodyContent = (
    <div className=' flex flex-col gap-4'>
        <Input
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
        />
        <Input
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
        />
    </div>
  )

  return (
    <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        body={bodyContent}
        title="Login"
        actionLabel='Sign in'
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
    
    />
  )
}

export default LoginModal
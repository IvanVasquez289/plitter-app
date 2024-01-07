"use client"

import React, { useCallback, useState } from 'react'
import Modal from '../Modal'
import Input from '../Input'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [name,setName] = useState('')
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
        setIsLoading(true)

        // TODO: REGISTER AND LOGIN
        await axios.post('/api/register',{
            name,
            username,
            email,
            password
        })
        
        toast.success('Cuenta creada')
        registerModal.onClose()
        const res = signIn('credentials',{
            email,
            password,
            redirect: false
        })

    } catch (error) {
        console.log(error)
        toast.error('Ups! Algo salio mal.')
    }finally{
        setIsLoading(false)
    }
  },[registerModal,name,username,email,password])

  const onToggle = useCallback(()=>{
    if(isLoading) return
    
    registerModal.onClose()
    loginModal.onOpen()
  },[isLoading,registerModal,loginModal])

  const bodyContent = (
    <div className=' flex flex-col gap-4'>
        <Input
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
        />
        <Input
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
        />
        <Input
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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

  const footerContent = (
    <div className=' text-neutral-400 text-center mt-4'>
        <p>Ya tienes una cuenta?
            <span
                onClick={onToggle}
                className='
                    text-white 
                    cursor-pointer 
                    hover:underline
                '
            > Iniciar sesion
            </span>
        </p>
    </div>
  )
  return (
    <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        body={bodyContent}
        title="Crear una cuenta"
        actionLabel='Registrar'
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        footer={footerContent}
    />
  )
}

export default RegisterModal
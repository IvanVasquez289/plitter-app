"use client"
import useLoginModal from '@/hooks/useLoginModal'
import React, { useCallback, useState } from 'react'
import Modal from '../Modal'
import Input from '../Input'
import useRegisterModal from '@/hooks/useRegisterModal'
import { signIn } from 'next-auth/react'

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
        setIsLoading(true)

        // TODO: CREAR COMPONENTE ALERTA QUE MUESTRE ERRORES AL INGRESAR
        await signIn('credentials',{
          email,
          password,
        })
        loginModal.onClose()
    } catch (error) {
        console.log(error)
    }finally{
        setIsLoading(false)
    }
  },[loginModal,email,password])

  const onToggle = useCallback(()=>{
    if(isLoading) return;

    loginModal.onClose()
    registerModal.onOpen()
  },[isLoading,loginModal,registerModal])

  const bodyContent = (
    <div className=' flex flex-col gap-4'>
        <Input
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
            type='email'
        />
        <Input
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
            type='password'
        />
    </div>
  )

  const footerContent = (
    <div className=' text-neutral-400 text-center mt-4'>
        <p>Primer vez usando Twitter?
            <span
                onClick={onToggle}
                className='
                    text-white 
                    cursor-pointer 
                    hover:underline
                '
            > Registrate
            </span>
        </p>
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
        footer={footerContent}
    />
  )
}

export default LoginModal
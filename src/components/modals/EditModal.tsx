"use client"
import React, { useCallback, useEffect, useState } from 'react'

import useCurrentUser from '@/hooks/useCurrentUser'
import useUser from '@/hooks/useUser'
import useEditModal from '@/hooks/useEditModal'
import toast from 'react-hot-toast'
import axios from 'axios'
import Modal from '../Modal'
import Input from '../Input'

const EditModal = () => {

  const {data: currentUser} = useCurrentUser()
  const {mutate: mutateFetchedUser} = useUser(currentUser?.id)
  const editModal = useEditModal()

  const [profileImage,setProfileImage] = useState('')
  const [coverImage,setCoverImage] = useState('')
  const [name,setName] = useState('')
  const [username, setUsername] = useState('')
  const [bio,setBio] = useState('')

  useEffect(() => {
   setProfileImage(currentUser?.profileImage)
   setCoverImage( currentUser?.coverImage)
   setName(currentUser?.name)
   setUsername(currentUser?.username)
   setBio(currentUser?.bio)
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ])
  
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.patch('/api/edit',{
        name,
        username,
        profileImage,
        coverImage,
        bio
      })

      mutateFetchedUser()
      editModal.onClose()
      toast.success('Actualizado')
    } catch (error) {
      toast.error('Algo salio mal')
    } finally {
      setIsLoading(false)
    }
  },[bio,coverImage,editModal,mutateFetchedUser,name,profileImage,username])

  const bodyContent = (
    <div className=' flex flex-col gap-4'>
        <Input
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
            type='text'
        />
        <Input
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            disabled={isLoading}
            type='text'
        />
        <Input
            placeholder='Bio'
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            disabled={isLoading}
            type='text'
        />
      
    </div>
  )


  return (
    <Modal
      title='Edita tu perfil'
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
      actionLabel='Guardar'
      disabled={isLoading}
      onSubmit={onSubmit}
      body={bodyContent}
    />
    
  )
}

export default EditModal
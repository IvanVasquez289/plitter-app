"use client"
import Header from '@/components/Header'
import useUser from '@/hooks/useUser'
import { useParams } from 'next/navigation'
import React from 'react'
import { ClipLoader } from 'react-spinners'

const UserView = () => {
  const params = useParams()
  const userId = params.userId as string;

  const {data,isLoading} = useUser(userId)

  if(isLoading || !data){
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80}/>
      </div>
    )
  }
  // console.log(data)
  return (
    <>
      <Header label={data?.name} showBackArror/>
    </>
  )
}

export default UserView
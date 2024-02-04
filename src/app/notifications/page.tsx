"use client"
import Header from '@/components/Header'
import NotificationsFeed from '@/components/NotificationsFeed'
import { NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


const Notification = () => {
    const router = useRouter()
    useEffect(() => {
        const obtener = async () => {
            const session = await getSession()
            console.log(session?.user)
            if(!session?.user) router.push('/')

        }
        obtener()
    
    }, [router])
    
  return (
    <>
        <Header label='Notificaciones' showBackArror/>
        <NotificationsFeed/>
    </>
  )
}

export default Notification

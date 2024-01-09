"use client"
import React from 'react'
import {BsHouseFill,BsBellFill} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTweetButton from './SidebarTweetButton'

import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'

const Sidebar =  () => {
   // TODO: REEMPLAZAR EL HOOK CON EL GETSESSION QUE NOS PROPORCIONA NEXTAUTH
  const {data,error} =  useCurrentUser()
    //   console.log(data)
    //   console.log(error?.response?.data)

  const items = [
    {
        label: 'Home',
        href: '/',
        icon: BsHouseFill
    },
    {
        label: 'Notifications',
        href: '/notifications',
        icon: BsBellFill
    },
    {
        label: 'Profile',
        href: '/users/123',
        icon: FaUser
    },
  ]

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
        <div className='flex flex-col items-end'>
            <div className='space-y-2 lg:w-[230px]'>
                <SidebarLogo/>
                {items?.map( item => (
                    <SidebarItem
                        key={item.href}
                        label={item.label}
                        href={item.href}
                        icon={item.icon}
                    />
                ))}
                {data && (
                    <SidebarItem label='Logout' icon={BiLogOut} onClick={() => signOut()}/>
                )}
                <SidebarTweetButton/>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
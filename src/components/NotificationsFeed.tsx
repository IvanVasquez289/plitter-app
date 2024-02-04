import useCurrentUser from '@/hooks/useCurrentUser'
import useNotifications from '@/hooks/useNotifications'
import React, { useEffect } from 'react'
import { BsTwitter } from 'react-icons/bs'

const NotificationsFeed = () => {
  const {data: currentUser, mutate: mutateCurrentuser} = useCurrentUser()
  const {data: notifications = []} = useNotifications(currentUser?.id)

  useEffect(()=>{
    mutateCurrentuser()
  },[mutateCurrentuser])
 
  if(notifications.length === 0){
    return (
        <div className=' text-neutral-600 text-center p-6 text-xl'>
            No hay notificaciones
        </div>
    )
  }
  
  return (
    <div className='flex flex-col'>
        {notifications.map((notification: Record<string,any>) => (
            <div 
                key={notification.id}
                className='flex flex-row items-center p-6 gap-6 border-b-[1px] border-neutral-800'
            >
                <BsTwitter size={32} color={'white'}/>
                <p className='text-white'>
                    {notification.body}
                </p>
            </div>
        ))}
    </div>
  )
}

export default NotificationsFeed
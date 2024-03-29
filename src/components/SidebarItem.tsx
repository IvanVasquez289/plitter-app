import React, { useCallback } from 'react'
import useLoginModal from '@/hooks/useLoginModal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';
import { BsDot } from 'react-icons/bs';
interface SidebarItemProps {
    label :string;
    href?: string;
    icon: IconType;
    onClick?: () => void
    protectedRoute?: boolean;
    alert?: boolean;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    href,
    icon:Icon,
    onClick,
    protectedRoute,
    alert
}) => {
    
  const router = useRouter()
  const {data:session} = useSession()
  const loginModal = useLoginModal()

  const handleClick = useCallback(()=>{
    if(onClick) {
        onClick();
        return
    } 

    if(protectedRoute && !session?.user?.email){
        loginModal.onOpen()
    }else if (href){
        router.push(href)
    }
  },[href,onClick,router,protectedRoute,loginModal,session])

  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
        <div
            className='
                relative rounded-full
                h-14 w-14
                flex items-center justify-center
                p-4 hover:bg-slate-300 hover:bg-opacity-10
                cursor-pointer lg:hidden
            '
        >
            <Icon size={28} color='white'/>
            {alert ? <BsDot className='text-sky-500 absolute left-0 -top-4' size={70}/> : null}
        </div>
        <div
            className='
                relative hidden lg:flex
                items-center gap-4 p-4
                rounded-full
                hover:bg-slate-300 hover:bg-opacity-10 
                cursor-pointer
            '
        >
            <Icon size={24} color='white'/>
            <p className='hidden lg:block text-white text-xl'>
                {label}
            </p>
            {alert ? <BsDot className='text-sky-500 absolute left-0 -top-4' size={70}/> : null}
        </div>
    </div>
  )
}

export default SidebarItem
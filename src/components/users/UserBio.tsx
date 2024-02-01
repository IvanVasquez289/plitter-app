import React, { useMemo } from 'react'
import {format} from 'date-fns'

import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';

import Button from '../Button';
import {BiCalendar} from 'react-icons/bi'
import useEditModal from '@/hooks/useEditModal';
import useFollow from '@/hooks/useFollow';

interface UserBioProps {
    userId: string;
}
const UserBio: React.FC<UserBioProps> = ({userId}) => {
  const {data: currentUser} = useCurrentUser()
  const {data: fetchedUser} = useUser(userId)
  const editModal = useEditModal()
  const {isFollowing,toggleFollow} = useFollow(userId)
//   console.log(currentUser)
//   console.log(fetchedUser)
  const createdAt = useMemo(()=>{
    if(!fetchedUser?.createdAt){
        return null;
    }

    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy')
  },[fetchedUser])

  
  return (
    <div className=' border-b-[1px] border-neutral-800 pb-4'>
        <div className='flex justify-end p-2'>
            {currentUser?.id === fetchedUser?.id ? (
                <Button
                    onClick={editModal.onOpen}
                    label='Editar'
                    secondary
                />
            ) : (
                <Button
                    onClick={toggleFollow}
                    label={isFollowing ? 'Dejar de seguir' : 'Seguir'}
                    secondary={!isFollowing}
                    outline={isFollowing}
                />
            )}
        </div>
        <div className='mt-6 px-4'>
                <div className='flex flex-col'>
                    <p className='text-white font-semibold text-2xl'>{fetchedUser?.name}</p>
                    <p className='text-neutral-500 text-md'>@{fetchedUser?.username}</p>
                </div>
                <div className='flex flex-col mt-4'>
                    <p className='text-white'>{fetchedUser?.bio}</p>
                    <div className='flex flex-row items-center gap-2 mt-2 text-neutral-500'>
                        <BiCalendar size={24}/>
                        <p>Se unió en {createdAt}</p>
                    </div>
                </div>
                <div className='flex flex-row items-center mt-4 gap-6'>
                    <div className='flex flex-row items-center gap-1'>
                        <p className='text-white'>{fetchedUser?.followingIds.length}</p>
                        <p className='text-neutral-500'>Siguiendo</p>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <p className='text-white'>{fetchedUser?.followersCount || 0}</p>
                        <p className='text-neutral-500'>Seguidores</p>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default UserBio
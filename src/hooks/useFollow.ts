import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
    const {data: currentUser, mutate: mutateCurrentUser} = useCurrentUser()
    const {mutate: mutateFetchedUser} = useUser(userId)

    const loginModal = useLoginModal()

    // ? aqui es usememo ya que este debe retornar un valor, useCallback  no lo permite.
    const isFollowing = useMemo(()=>{
        const list =  currentUser?.followingIds || [];
        return list.includes(userId)
    },[currentUser?.followingIds, userId])

    const toggleFollow = useCallback(async ()=>{
        if(!currentUser) loginModal.onOpen()

        try {
            let request;
            let msj;
            if(isFollowing){
                request = () =>  axios.delete('/api/follow', {data: {userId}})
                msj = 'Has dejado de seguir a este usuario'
            }else{
                request = () => axios.post('/api/follow',  {userId})
                msj = 'Ahora estas siguiendo a este usuario'
            }

            await request()
            mutateCurrentUser()
            mutateFetchedUser()
            toast.success(msj)
        } catch (error) {
            toast.error('Hubo un error')
        }
    },[currentUser,isFollowing,loginModal,userId,mutateCurrentUser,mutateFetchedUser])

    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollow;
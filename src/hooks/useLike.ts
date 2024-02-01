import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import useUserPosts from "./useUserPosts";
import axios from "axios";
import toast from "react-hot-toast";
import usePosts from "./usePosts";

const useLike = ({postId,userId}: {  postId: string; userId?: string }) => {
    const {data: currentUser} = useCurrentUser()
    const {data: fetchedPost, mutate: mutateFetchedPost} = usePost(postId)
    const {mutate: mutateUserPosts} = useUserPosts(userId as string)
    const {mutate: mutateFetchedPosts} = usePosts()

    const loginModal = useLoginModal()

    const hasLiked = useMemo(()=>{
        const list = fetchedPost?.likeIds || []
        return list.includes(currentUser?.id)
    },[fetchedPost,currentUser])

    const toggleLike = useCallback(async ()=>{
        let request;

        try {
            if(!currentUser) {
                loginModal.onOpen()
                return
            }
    
            if(hasLiked){
                request = () => axios.delete('/api/like', {data: {postId}})
            }else {
                request = () => axios.post('/api/like', {postId})
            }
    
            await request()
            mutateFetchedPost()
            mutateUserPosts()
            mutateFetchedPosts()
            toast.success('Success')
        } catch (error) {
            toast.error('Hubo un error')
        }

    },[currentUser,hasLiked,loginModal,mutateFetchedPost,mutateUserPosts,postId, mutateFetchedPosts])

    return {
        hasLiked,
        toggleLike
    }

}

export default useLike;
"use client"
import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import usePosts from '@/hooks/usePosts';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import Button from './Button';
import Avatar from './Avatar';
import useUserPosts from '@/hooks/useUserPosts';
import usePost from '@/hooks/usePost';

interface FormProps {
    placeholder: string; 
    isComment?: boolean;
    postId?: string
}
const Form: React.FC<FormProps> = ({placeholder,isComment,postId}) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const {data: currentUser} = useCurrentUser()
  const {mutate: mutatePosts} = usePosts()
  const {mutate: mutateFetchedPost} = usePost(postId as string)

  const [body,setBody] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  const onSubmit = useCallback( async ()=>{
    try {
      if(body.trim() === ''){
        return toast.error("Todos los campos son obligatorios")
      }
      setIsLoading(true)
      let request;
      let msj;

      if(isComment){
        request = () => axios.post('/api/comments',{body,postId})
        msj ="Comentario agregado"
      }else{
        request = () => axios.post('/api/posts',{body})
        msj ="Publicación agregada"
      }
      // await axios.post('/api/posts',{body})
      await request()
      mutatePosts()
      setBody('')
      mutateFetchedPost()
      toast.success(msj)
    } catch (error) {
      toast.error('Hubo un error')
    }finally{
      setIsLoading(false)
    }
  },[body, mutatePosts,isComment,postId,mutateFetchedPost])

  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
      {currentUser ? (
        <div className='flex flex-row gap-4'>
          <div>
            <Avatar userId={currentUser?.id}/>
          </div>
          <div className='w-full'>
            <textarea
              disabled={isLoading}
              onChange={e => setBody(e.target.value)}
              value={body}
              placeholder={placeholder}
              className=' 
                disabled:opacity-80 
                peer 
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500
                text-white
              '
            ></textarea>
            <hr 
              className='
                opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition
              '
            />
            <div className='mt-4 flex flex-row justify-end'>
              <Button disabled={isLoading || !body} onClick={onSubmit} label='Tweet'/>
            </div>
          </div>
        </div>
      ) : (
        <div className='py-8'>
          <h1 className=' text-white text-2xl text-center mb-4 font-bold'>
            Bienvenido a Twitter
          </h1>
          <div className='flex flex-row items-center justify-center gap-4 '>
            <Button label='Iniciar sesion' onClick={loginModal.onOpen}/>
            <Button label='Registrate' onClick={registerModal.onOpen} secondary/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Form
"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import usePost from '@/hooks/usePost'
import { ClipLoader } from 'react-spinners'
import Header from '@/components/Header'
import PostItem from '@/components/posts/PostItem'
import Form from '@/components/Form'
import CommentFeed from '@/components/posts/CommentFeed'


const PostView = () => {
  const params = useParams()
  const postId = params.postId;
  const {data: fetchedPost, isLoading} = usePost(postId as string)
//   console.log(fetchedPost)
  if(isLoading){
    return (
        <div className='flex items-center justify-center h-full'>
            <ClipLoader color='lightblue' size={80}/>
        </div>
    )
  }

  return (
    <>
      <Header label='Tweet' showBackArror/>   
      <PostItem data={fetchedPost}/>
      <Form placeholder='Tweetea tu comentario' isComment postId={postId as string}/>
      <CommentFeed comments={fetchedPost?.comments}/>
    </>
  )
}

export default PostView
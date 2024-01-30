"use client"
import React, { useState,useEffect } from 'react'
import useUserPosts from '@/hooks/useUserPosts';
import PostItem from './PostItem';
import usePosts from '@/hooks/usePosts';

interface PostFeedProps {
    userId?: string;
}
const PostFeed: React.FC<PostFeedProps> = ({userId}) => {
  
  const {data: userPosts = []} = useUserPosts(userId as string)
  const {data: allPosts = []} = usePosts()
  
  let posts;

  if(userId){
    posts =  userPosts;
  }else {
    posts= allPosts;
  }


  return (
    <>
        {posts.map((post: Record<string,any>) => (
            <PostItem
                userId={userId}
                key={post.id}
                data={post}
            />
        ))}
    </>
  )
}

export default PostFeed
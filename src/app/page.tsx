import Form from '@/components/Form'
import Header from '@/components/Header'
import PostFeed from '@/components/posts/PostFeed'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Header label={'Home'}/>
      <Form placeholder='Que esta pasando?'/>
      <PostFeed/>
    </>
  )
}

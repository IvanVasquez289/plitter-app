import FollowBar from '@/components/FollowBar'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Modal from '@/components/Modal'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import { Toaster } from 'react-hot-toast'
import Providers from './Providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Toaster/>
          <LoginModal/>
          <RegisterModal/>
          <div className='h-screen bg-black'>
            <div className='h-full container mx-auto xl:px-32 max-w-6xl'>
              <div className='grid grid-cols-4 h-full'>
                <Sidebar/>
                <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>
                  {children}
                </div>
                <FollowBar/>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

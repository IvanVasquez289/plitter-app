import FollowBar from '@/components/FollowBar'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Modal from '@/components/Modal'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <Modal isOpen title='Test Modal' actionLabel='Submit'/> */}
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
      </body>
    </html>
  )
}

import React, { ReactNode } from 'react'

const ViewCard = ({children}:{children: ReactNode}):React.JSX.Element => {
  return (
    <div className='flex w-full items-center justify-center h-full'>{children}</div>
  )
}

export default ViewCard
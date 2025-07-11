'use client' // Error boundaries must be Client Components

import { useEffect, useState } from 'react'


type errorType = {
  error: Error & { digest?: string };
  reset?: () => void;
}


export default function Error({
  error,
  reset,
}: errorType) {


  const [message, setMessageError] = useState<string>()
  useEffect(() => {
    console.error(error)
    setMessageError(error.message || 'An unexpected error occurred')
  }, [error])


  return (
    <div className='justify-center items-center flex flex-col h-screen bg-gray-100'>
      <h2 className='text-[24px] font-bold'>Something went wrong!</h2>
      <h2 className="text-lg mb-4 text-red-500">{message}</h2>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
        onClick={() => reset?.()} 
      >
        Try again
      </button>
    </div>
  )
}
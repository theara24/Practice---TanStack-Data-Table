import { UserType } from '@/types/userType'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CardUser({id, firstName, lastName, email, image, username}: UserType) {
  return (
    <Link href={`/user/${id}`} key={id} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full overflow-hidden transition-all duration-300 hover:shadow-indigo-500/50 dark:hover:shadow-blue-900/50">
        <div className="relative h-32 bg-gradient-to-r from-indigo-600 to-blue-700">
            <Image 
            src={image} 
            alt={`${firstName} ${lastName}`}
            width={300}
            height={300}
            unoptimized
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 transition-transform duration-300 hover:scale-105"
            />
        </div>
        <div className="pt-16 pb-6 px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{firstName} {lastName}</h1>
            <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">Software Developer</p>
            <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">{email}</p>
            <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">{username}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Passionate about creating user-friendly web applications and solving complex problems.</p>
            
            <div className="flex justify-center space-x-2">
                <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full transition-colors duration-300 hover:bg-indigo-800 hover:text-white dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-700">JavaScript</span>
                <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full transition-colors duration-300 hover:bg-indigo-800 hover:text-white dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-700">React</span>
                <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full transition-colors duration-300 hover:bg-indigo-800 hover:text-white dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-700">Node.js</span>
            </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
            <button className="w-full bg-indigo-800 text-white py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                Connect
            </button>
        </div>
    </Link>
  )
}

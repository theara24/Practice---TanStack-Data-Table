'use client'
import { UserDetailType } from "@/types/userType"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function UserDetailPage() {
    const {id} = useParams()
    console.log(id)

    const [userDetail, setUserDetail] = useState<UserDetailType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}users/${id}`)
                if (!res.ok) {
                    setUserDetail(null)
                    return
                }
                const data = await res.json()
                if (!data || !data.id) {
                    setUserDetail(null)
                } else {
                    setUserDetail(data)
                }
            } catch (error) {
                console.error('Failed to fetch product:', error)
                setUserDetail(null)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    if (loading) return <div className="text-center">Loading...</div>
    if (!userDetail) return (
        <div className="text-center text-red-500 h-screen flex justify-center items-center">
            User not found
        </div>
    )

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    This is some information about the user.
                </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Full name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {userDetail.firstName} {userDetail.lastName}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {userDetail.email}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {userDetail.phoneNumber || 'N/A'}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                           {userDetail.address ? (
                               <div>
                                <p>{userDetail.address.street}</p>
                                <p>{userDetail.address.city}, {userDetail.address.state} {userDetail.address.zipCode}</p>
                                </div>
                            ) : (
                                <span className="text-gray-500">No address provided</span>
                            )
                        } 
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
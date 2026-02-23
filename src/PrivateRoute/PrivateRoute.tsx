"use client"
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


type props = {
    children: React.ReactNode
}

const publiRoutes = [
    "/",
    "/claimly_guides",
    "/about",
    "/faq",
    "/contact",
    "/privacy_policy",
    "/terms_condition",
    "/login",
    "/register",
    "/forget_password",
    "/verify_otp",
    "/forgetpass_verify_otp",
    "/forgetNewPassSet",
    "/verify_email",
    "/reset_password"
]

const PrivateRoute = ({ children }: props) => {
    const router = useRouter()
    const pathname = usePathname()
    const [authorized, setAuthorized] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        const isPublicRoute = publiRoutes.includes(pathname) || pathname.startsWith("/claimly_guides/")

        if (isPublicRoute) {
            setAuthorized(true)
            return
        }

        if (!token) {
            setAuthorized(false)
            router.replace(`/login?redirect=${pathname}`)
        } else {
            setAuthorized(true)
        }
    }, [pathname, router])

    const isPublic = publiRoutes.includes(pathname) || pathname.startsWith("/claimly_guides/")
    if (!authorized && !isPublic) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return <>{children}</>
}

export default PrivateRoute
import React from 'react'
import { Outlet } from 'react-router-dom'

export const SignInLayout: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* You can have a background, a sidebar, or any sign-in specific structure */}
      <Outlet />
    </div>
  )
}
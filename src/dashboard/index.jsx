import React from 'react'
import AddResume from './components/AddResume'

export const Dashboard = () => {
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My resume</h2>
      <p>Start Creating AI Resume for your next Job! ⚡️</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10'>
        <AddResume/>
        </div>
    </div>
  )
}

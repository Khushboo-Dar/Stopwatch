import { useState } from 'react'
import Stopwatch from './components/Stopwatch'
export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Stopwatch />
    </div>
  )
}
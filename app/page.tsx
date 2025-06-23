// app/page.tsx

import React from 'react'
import TripForm from '@/components/TripForm'

export default function Home() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <TripForm />
    </main>
  )
}

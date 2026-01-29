import React from 'react'

export default function AdminPage() {
  const flagReview = (id: string) => {
    alert(`Flag review ${id} (stub)`)
  }

  const rewardReviewer = (address: string) => {
    alert(`Reward reviewer ${address} (stub)`)
  }

  return (
    <div>
      <h1>Admin</h1>
      <p>Simple admin panel (stubs):</p>
      <div>
        <button onClick={() => flagReview('review-1')}>Flag review-1</button>
        <button onClick={() => rewardReviewer('0x123')}>Reward 0x123</button>
      </div>
    </div>
  )
}
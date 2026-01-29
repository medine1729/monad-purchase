import React, { useState } from 'react'
import WalletConnect from '../components/WalletConnect'

export default function ProductPage() {
  const [cid, setCid] = useState('')
  const [review, setReview] = useState('')

  const submitReview = async () => {
    // This is a stub: in the real app we would upload to IPFS and call the smart contract
    alert(`Would upload review and post on-chain. Review: ${review}`)
  }

  return (
    <div>
      <h1>Product</h1>
      <WalletConnect />

      <section style={{ marginTop: 24 }}>
        <h2>Leave a review</h2>
        <textarea value={review} onChange={e => setReview(e.target.value)} rows={6} style={{ width: '100%' }} />
        <div style={{ marginTop: 8 }}>
          <button onClick={submitReview}>Submit review (stub)</button>
        </div>
        {cid && (
          <p>
            Uploaded CID: <code>{cid}</code>
          </p>
        )}
      </section>
    </div>
  )
}
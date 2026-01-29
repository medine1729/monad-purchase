import React, { useState } from 'react'

export default function WalletConnect() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  const connect = async () => {
    // Stub: In a real implementation we'd call a wallet SDK
    setConnected(true)
    setAddress('0xDEADBEEF')
  }

  const disconnect = () => {
    setConnected(false)
    setAddress(null)
  }

  return (
    <div>
      {connected ? (
        <div>
          <p>Connected: {address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet (stub)</button>
      )}
    </div>
  )
}
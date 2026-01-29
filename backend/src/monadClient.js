// Minimal Monad client abstraction (placeholder implementation).
// Requires: set USE_MONDAD=true and MONAD_RPC_URL, MONAD_PRIVATE_KEY, MONAD_ACCOUNT_ADDRESS in env to enable real-mode.
// NOTE: This is a placeholder. Replace with an official Monad JS SDK or implement proper Move tx building/signing/broadcasting.

const fetch = globalThis.fetch || require('node-fetch')

const RPC_URL = process.env.MONAD_RPC_URL || ''
const PRIVATE_KEY = process.env.MONAD_PRIVATE_KEY || ''
const ACCOUNT = process.env.MONAD_ACCOUNT_ADDRESS || ''
const USE_MONDAD = String(process.env.USE_MONDAD || 'false').toLowerCase() === 'true'

let idCounter = 1

async function sendRpc(method, params) {
  if (!RPC_URL) throw new Error('MONAD_RPC_URL not configured')
  const body = {
    jsonrpc: '2.0',
    id: idCounter++,
    method,
    params,
  }
  const res = await fetch(RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`RPC ${method} failed: ${res.status} ${res.statusText}`)
  return res.json()
}

module.exports = {
  async mintReceipt({ productId, buyer, metadata }) {
    if (!USE_MONDAD) {
      // Mock response
      return {
        success: true,
        mock: true,
        receiptId: `mock-receipt-${Date.now()}`,
        metadata,
      }
    }

    // Placeholder: build a transaction that calls the ReceiptSBT Move module to mint a receipt.
    // Real implementation: use Monad/Move SDK to create, sign and submit the transaction.
    // For now we return a descriptive placeholder and attempt an RPC broadcast if possible.

    const txPayload = {
      // This structure is a placeholder. Replace with actual signed tx bytes or RPC method expected by your Monad node.
      from: ACCOUNT,
      to: 'ReceiptSBT',
      data: { productId, buyer, metadata },
      // NOTE: real chain expects Move tx format
    }

    // If the node exposes a generic 'broadcast_tx' method or similar, call it. Adapt as needed.
    try {
      const rpcResult = await sendRpc('broadcast_tx', [txPayload])
      return { success: true, mock: false, rpcResult }
    } catch (err) {
      return { success: false, error: String(err) }
    }
  },

  async registerReview({ receiptId, cid, rating, text, reviewer }) {
    if (!USE_MONDAD) {
      return {
        success: true,
        mock: true,
        reviewId: `mock-review-${Date.now()}`,
        receiptId,
        cid,
      }
    }

    // Placeholder: build and broadcast a tx to call ReviewRegistry with (receiptId, cid)
    const txPayload = { from: ACCOUNT, to: 'ReviewRegistry', data: { receiptId, cid, rating, text, reviewer } }
    try {
      const rpcResult = await sendRpc('broadcast_tx', [txPayload])
      return { success: true, mock: false, rpcResult }
    } catch (err) {
      return { success: false, error: String(err) }
    }
  },

  async rewardReviewer({ reviewerAddress, amount }) {
    if (!USE_MONDAD) {
      return { success: true, mock: true, rewarded: reviewerAddress, amount }
    }
    const txPayload = { from: ACCOUNT, to: 'RewardToken', data: { to: reviewerAddress, amount } }
    try {
      const rpcResult = await sendRpc('broadcast_tx', [txPayload])
      return { success: true, mock: false, rpcResult }
    } catch (err) {
      return { success: false, error: String(err) }
    }
  },

  // Read-only placeholder
  async getReceipt(receiptId) {
    if (!USE_MONDAD) {
      return { receiptId, mock: true, owner: '0xMOCK', metadata: {} }
    }
    // Implement appropriate RPC query to read on-chain receipt data
    try {
      const rpcResult = await sendRpc('query_receipt', [receiptId])
      return { success: true, rpcResult }
    } catch (err) {
      return { success: false, error: String(err) }
    }
  },
}
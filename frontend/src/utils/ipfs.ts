export async function uploadToWeb3Storage(file: File, apiKey: string): Promise<string> {
  const url = 'https://api.web3.storage/upload'
  const formData = new FormData()
  formData.append('file', file)

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  })

  if (!resp.ok) throw new Error('web3.storage upload failed')
  const data = await resp.json()
  // web3.storage returns {cid: '...'}
  return data.cid || ''
}
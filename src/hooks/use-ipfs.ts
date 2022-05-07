import { create, IPFSHTTPClient } from 'ipfs-http-client'
import { useEffect, useState } from 'react'

export default function useIpfs () {
  const [url, setUrl] = useState('http://localhost:5001/api/v0');
  const [ipfs, setIpfs] = useState<IPFSHTTPClient|null>(null);
  const [initError, setError] = useState<any>();

  useEffect(() => {
    async function startIpfs () {
      try {
        console.time('IPFS Started')
        setIpfs(await create({
          url: url,
        }));
        console.timeEnd('IPFS Started')
      } catch (error) {
        console.error('IPFS init error:', error)
        setIpfs(null)
        setError(error);
      }
    }
    startIpfs();
  }, [url])

  return { ipfs, initError, setUrl };
}

import { useState, useEffect, SetStateAction } from 'react'
import { IPFS } from 'ipfs-core'
// dot-prop: used to obtain a property of an object when the name of property is a string
// here we get ipfs.id when calling dotProp.get(ipfs, cmd), with cmd = 'id'
// and we get ipfs.hash when calling with cmd = 'hash' etc.

/*
 * Pass the command you'd like to call on an ipfs instance.
 *
* callIpfs uses setState write the response as a state variable, so that your component
 * will re-render when the result 'res' turns up from the call await ipfsCmd.
 *
 */
export default function useIpfs (ipfs: IPFS) {
  const [res, setRes] = useState(null)
  useEffect(() => {
    callIpfs(ipfs, setRes)
  }, [ipfs])
  return res
}

async function callIpfs (ipfs: IPFS, setRes: { (value: SetStateAction<null>): void; (arg0: any): void }, ) {
  if(!ipfs) return;
  const result = await ipfs.id();
  setRes(result)
}

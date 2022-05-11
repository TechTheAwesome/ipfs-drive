import React from 'react';
import { useLocation } from 'react-router-dom'
import { IPFS_STORE_PATH } from '../../env';
import { useLs } from '../../hooks/useMFS';

export default function Drive(this: any) {
  const {hash} = useLocation()
  const subHash = hash.substring(1);
  const [entries, error]= useLs(IPFS_STORE_PATH+decodeURI(subHash));
  return (
    <div>
      { decodeURI(subHash)}
      {console.log(entries)}
      {error && error.toString()}
    </div>
  )
}



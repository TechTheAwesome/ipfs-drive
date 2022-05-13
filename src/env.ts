import { TSetting } from "./hooks/useSetting";

export const IPFS_STORE = 'ipfs-drive'
export const IPFS_STORE_PATH = `/${IPFS_STORE}`;
export const IPFS_CONFIG = 'store.config';
export const IPFS_CONFIG_PATH = `${IPFS_STORE_PATH}/${IPFS_CONFIG}`;
export const IPFS_KEY_NAME = 'ipfs-drive'

export const DEFAULT_SETTING: TSetting = {
  drive: [],
  key: []
}

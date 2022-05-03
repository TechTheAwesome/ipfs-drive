import * as client from "ipfs-http-client";
import all from "it-all";

let ipfsClient: undefined| client.IPFSHTTPClient;

export function InitializeIPFS() {
  ipfsClient = client.create({
    url: 'http://localhost:5001/api/v0'
  });
  TestIpfs();
}

async function TestIpfs() {
  try {
  	console.log(await all(GetIPFS().files.ls('/')));
  } catch (e) {
    console.log(e);
  }
}

export function GetIPFS() {
  return ipfsClient!;
}

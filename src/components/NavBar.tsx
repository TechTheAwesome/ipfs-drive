import { Button } from "@mui/material";
import React from "react";

export default function NavBar() {
  return (
    <nav className='container flex items-center px-6 py-6 min-w-full bg-slate-100'>
      <ul className='flex flex-1 justify-left items-center gap-10'>
        <Button variant='contained' href='/'>Home</Button>
        <Button variant='contained' href="/store">Drive</Button>
        <Button variant='contained' href="/keys">Keys</Button>
      </ul>
      <span className='text-slate-300 pr-4'>
        This site is hosted on IPFS
      </span>
    </nav>
  );
}
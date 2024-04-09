import React from "react";
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react"
import { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom"
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from 'react-redux';
import {HiUser , HiArrowSmRight} from 'react-icons/hi'

export default function DashSidebar() {
    const dispatch=useDispatch();
    const location = useLocation();
    const [tab, setTab]=useState("")
    useEffect(()=>{
        const urlParams=new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl){
            setTab(tabFromUrl);
        }
    },[location.search])
    const handleSignout=async () =>{
        try{
            const res = await fetch('/api/user/signout',{method:'POST',});
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }
            else{
                dispatch(signoutSuccess());
            }
            }catch(error){
                console.log(error.message);
        }
    }
  return (
    <Sidebar className="w-full md:w-56">
        <SidebarItems>
            <SidebarItemGroup>
                <Link to='/dashboard?tab=profile'>
                    <SidebarItem active={tab==='profile'} label={'User'} labelColor='dark' icon={HiUser} as='div' >Profile</SidebarItem>
                </Link>
                    <SidebarItem className='cursor-pointer' icon={HiArrowSmRight} onClick={handleSignout} >Logout</SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
  )
}

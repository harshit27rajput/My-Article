import React from "react";
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react"
import { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom"
import {HiUser , HiArrowSmRight} from 'react-icons/hi'

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab]=useState("")
    useEffect(()=>{
        const urlParams=new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl){
            setTab(tabFromUrl);
        }
    },[location.search])
  return (
    <Sidebar className="w-full md:w-56">
        <SidebarItems>
            <SidebarItemGroup>
                <Link to='/dashboard?tab=profile'>
                    <SidebarItem active={tab==='profile'} label={'User'} labelColor='dark' icon={HiUser} as='div' >Profile</SidebarItem>
                </Link>
                    <SidebarItem className='cursor-pointer' icon={HiArrowSmRight}>Logout</SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
  )
}

import React from 'react'
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

function Header() {
    const path = useLocation().pathname
    const {currentUser}=useSelector((s)=>s.user)
    const dispatch=useDispatch()
    const {theme}=useSelector((state)=>state.theme)

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
        }
        catch(error){
            console.error(error.message)
        }
    }
    return (

        <Navbar className='border-b-4 py-3'>
            <Link to='/' className='self-center whitespace-nowrap text-md font-semibold dark:text-white sm:text-xl'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Harshit's</span>Blog
            </Link>
            <form>
                <TextInput type='text' placeholder='Search Something' rightIcon={AiOutlineSearch} className='hidden lg:inline' />
            </form>
            <Button className='lg:hidden w-12 h-10' color='gray' pill>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 sm:inline hidden' color='gray' pill onClick={()=>dispatch(toggleTheme())} >
                {theme==="light" ?<FaMoon/> : <FaSun/>}
            </Button>
                {currentUser ? (
                    <Dropdown arrowIcon={false} inline label= {<Avatar alt='user' img={currentUser.profilePicture} rounded/>}>
                        <DropdownHeader>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                            <Link to={'/dashboard?tab=profile'}>
                                <DropdownItem>Profile</DropdownItem>
                            </Link>
                            <DropdownDivider />
                                <DropdownItem onClick={handleSignout} >Logout</DropdownItem>
                        </DropdownHeader>
                    </Dropdown>
                ):(<Link to='/register'>
                    <Button gradientDuoTone='purpleToBlue'>Register</Button>
                </Link>)}
                <Navbar.Toggle />
            </div>
            <NavbarCollapse>
                <NavbarLink active={path==='/'} as={'div'}>
                    <Link to='/'> HOME</Link>
                </NavbarLink>
                <NavbarLink active={path==='/about'} as={'div'}>
                    <Link to='/about'>ABOUT</Link>
                </NavbarLink>
                <NavbarLink active={path==='/projects'}as={'div'}>
                    <Link to='/projects'>PROJECTS</Link>
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    )
}
export default Header
import React from 'react'
import { Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'

function Header() {
    const path = useLocation().pathname
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
            <div className='flex gap-2 md:order-2'>                 <Button className='w-12 h-10 sm:inline hidden' color='gray' pill>
                <FaMoon />
            </Button>
                <Link to='/sign-in'>
                    <Button gradientDuoTone='purpleToBlue'>Sign In</Button>
                </Link>
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
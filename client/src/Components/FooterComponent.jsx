import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react'
import React from 'react'
import { Link} from 'react-router-dom'
import {BsFacebook, BsInstagram, BsTwitter, BsGithub} from 'react-icons/bs'; 

export default function FooterComponent() {
    return (
        <Footer className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-5'>
                        <Link to='/' className='self-center whitespace-nowrap text-md font-semibold dark:text-white sm:text-xl font-semibold dark:text-white'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Harshit's</span>Blog
                        </Link>
                    </div>
                    <div className='grid grid-cols-3 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                        <div>
                            <FooterTitle title='About' />
                            <FooterLinkGroup col>
                                <FooterLink href="https://github.com" target='_blank' rel='noopener noreferrer'>
                                    Project Link
                                </FooterLink>
                                <FooterLink href="https://github.com" target='_blank' rel='noopener noreferrer'>
                                    My Article
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title='Follow Us' />
                            <FooterLinkGroup col>
                                <FooterLink href="https://github.com" target='_blank' rel='noopener noreferrer'>
                                    Github
                                </FooterLink>
                                <FooterLink href="https://github.com" target='_blank' rel='noopener noreferrer'>
                                    Discord
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title='Legal' />
                            <FooterLinkGroup col>
                                <FooterLink href="https://github.com" target='_blank' rel='noopener noreferrer'>
                                    Privacy Policy
                                </FooterLink>
                                <FooterLink href="https://github.com" target='_blank' rel='noopener noreferrer'>
                                    Terms & Condition
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>
                </div>
                <FooterDivider/>
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <FooterCopyright href='#' by='Harshit Rajput' year={new Date().getFullYear()}/>
                    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                        <FooterIcon href='#' icon={BsFacebook}/>
                        <FooterIcon href='#' icon={BsInstagram}/>
                        <FooterIcon href='#' icon={BsTwitter}/>
                        <FooterIcon href='#' icon={BsGithub}/>
                    </div>
                </div>
            </div>
        </Footer>
    )
}
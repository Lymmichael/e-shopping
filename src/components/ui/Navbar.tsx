import { Link } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItem from "../NavItems";
import NavItems from "../NavItems";
import { buttonVariants } from "./button";
import Cart from "../Cart";
import { getServerSiderUser } from "@/lib/payload.utils";
import { cookies } from "next/headers";
import UserAccountNav from "../UserAccountNav";

const Navbar = async ()=>{
    
    const nextCookies =cookies()
    const { user } = await getServerSiderUser(nextCookies)


    return(
        <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
            <header className='relative bg-white'>
                <MaxWidthWrapper>
                    <div className='border-b border-gray-200'>
                        <div className='flex h-16 items-center'>
                            {/* TODO: mobile nav */}

                            <div className='ml-4 flex lg:ml-0'>
                                <a href='/'>
                                    <Icons.logo className='h-10 w-10'></Icons.logo>
                                </a>
                            </div>
                            <div className='hidden lg:ml-8 w-3/4 lg:block lg:self-stretch z-60'>
                                <NavItems />
                            </div>

                            <div className="ml-auto items-center">
                                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                                    {user?null: 
                                        <a 
                                            href='/sign-in' 
                                            className={buttonVariants({
                                                variant:'ghost'
                                            })}
                                        >
                                        Sign in
                                        </a>
                                    }
                                    {user?null:(   
                                        <span
                                            className='h-6 w-px bg-gray-200'    
                                            aria-hidden='true'
                                        />
                                    )}
                                    {user? (
                                        <UserAccountNav user={user}/>
                                    ):
                                        <a href='/sign-up' 
                                            className={buttonVariants({
                                                variant:'ghost'
                                            })}>
                                            Create account
                                        </a>
                                    }
                                    {user ? 
                                    <span
                                        className='h-6 w-px bg-gray-200'    
                                        aria-hidden='true'>
                                    </span> : null}

                                    {user ? null :(
                                    <div className='h-6 w-px bg-gray-200'>
                                    <span
                                        className='h-6 w-px bg-gray-200'    
                                        aria-hidden='true'
                                    />
                                    </div>
                                    )}
                                    <div className='ml-4 flow-root lg:mt-6'>
                                        <Cart></Cart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    )
}

export default Navbar
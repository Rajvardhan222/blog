"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useUserContext } from "@/context/user.context";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  let [isAuthenticated,setIsAuthenticated] = useState(false)
  let {userInfo,setUserInfo } = useUserContext()
    console.log(userInfo);
    useEffect(() => {
      setIsAuthenticated(userInfo?.isAuthenticated)
    console.log(userInfo);
    
     
    }, [userInfo])
    
  
    
 
  
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>
        <Link href={"/createBlog"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="create Post"
          ></MenuItem>
        </Link>
        {
            isAuthenticated === true ? 
            <MenuItem
              setActive={setActive}
              active={active}
              item="Logout"
            >
                <HoveredLink href="/" onClick = {() => {

                }}>Logout</HoveredLink>
            </MenuItem>
          : 
          (<>
          <Link href={'/signup'}>
            <MenuItem
            setActive={setActive}
            active={active}
            item="Sign up"
          ></MenuItem></Link>
<Link href={'/login'}>
          <MenuItem
          setActive={setActive}
          active={active}
          item="Login"
        ></MenuItem></Link>
        </>
          )
        }
      </Menu>
    </div>
  );
}

export default Navbar;

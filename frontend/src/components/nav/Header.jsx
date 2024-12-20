import React from "react";
import logo from "@/assets/DOrSU Hotel logo.png";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { isAuthenticated, userData, logout } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="h-[100px] w-full border-b border-slate-200 z-50 shadow-sm">
      <div className="container mx-auto h-full">
        <div className="h-full flex items-center justify-between">
          <Link to={"/"}>
            <img
              src={logo}
              alt="Website Logo"
              className="max-h-32 rounded-lg"
            />
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="link"
              size="sm"
              className="hover:no-underline hover:text-yellow-600"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              variant="link"
              size="sm"
              className="hover:no-underline hover:text-yellow-600"
              onClick={() => navigate("/rooms")}
            >
              Rooms
            </Button>

            {!isAuthenticated ? (
              <>
                <Button
                  variant="link"
                  size="sm"
                  className="hover:no-underline hover:text-yellow-600"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/register")}
                  className="hidden md:block"
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="link"
                  size="sm"
                  className="hover:no-underline hover:text-yellow-600"
                  onClick={() => navigate("/reservations")}
                >
                  Reservations
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="link"
                      size="sm"
                      className="hover:no-underline hover:text-yellow-600"
                      // onClick={() => navigate("/login")}
                    >
                      {userData.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
                    <DropdownMenuItem className={userData.role == 0 && `hidden`} onClick={()=> navigate("/transactions")}>Transactions</DropdownMenuItem>
                    <DropdownMenuItem  onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

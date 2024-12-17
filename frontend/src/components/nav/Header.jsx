import React from "react";
import logo from "@/assets/DOrSU Hotel logo.png";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <nav className="h-[100px] w-full border-b border-slate-200 z-50 shadow-sm">
      <div className="container mx-auto h-full">
        <div className="h-full flex items-center justify-between">
          <Link to={"/"}>
            <img src={logo} alt="Website Logo" className="max-h-32 rounded-lg" />
          </Link>
          <div className="flex items-center gap-2">
            {pathname !== "/login" ? (
              <Button
                variant="link"
                size="sm"
                className="hover:no-underline"
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
            ) : (
              <Button
                variant="link"
                size="sm"
                className="hover:no-underline"
                onClick={() => navigate("/register")}
              >
                Sign up
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.open("https://mail.google.com/", "_blank");
              }}
              className="hidden md:block"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

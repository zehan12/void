import { useTheme } from "@/context/theme-provider";
import { Icons } from "../svg";
import { Button } from "../ui/button";

const Header = () => {
    const isDark = useTheme().theme === "dark";
    console.log(isDark)
    return (<header className="w-full h-20 flex items-center justify-between md:justify-evenly px-10">
        <div>
            <Icons.logo width={"45"} 
                fill={isDark ? "white" : "black"}
            />
        </div>
        <div className="md:flex gap-12 hidden">
        </div>
        <div>
            <Button className="hidden md:flex font-semibold">
                Login In
            </Button>
            <div className="flex md:hidden text-primary">
                Login
            </div>
        </div>
    </header>)
};

Header.displayName = "Header";
export default Header;


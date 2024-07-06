import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

const MenuIcon = () => {
    return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Ellipsis size={29} className=" cursor-pointer p-1 rounded-full border-2 hover:outline outline-4 hover:outline-primary-foreground border-white hover:bg-primary-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuCheckboxItem className=" cursor-pointer">
                Copy Link
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>);
};

MenuIcon.displayName = "MenuIcon";
export default MenuIcon;
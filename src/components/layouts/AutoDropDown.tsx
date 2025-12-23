import { User } from '@/types';
import { Button } from '../ui/button';
import { Link ,Form} from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
 
  DropdownMenuSeparator,
  DropdownMenuShortcut,
 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from '../Icons';

interface UserProps {
    user:User;
}
function AutoDropDown({user}:UserProps) {
    if(!user) {
        return (
             <Button size='sm' asChild>
                      <Link to='/signin'>
                      Sign In
                      <span className="sr-only">Sign In</span>
                      </Link>
             </Button>
        )
    }
    const initialName = `${user.firstName.charAt(0) ?? ""} ${user.lastName.charAt(0) ?? ""}`;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarImage src={user.imageUrl} alt={user.username ?? ""} />
            <AvatarFallback>{initialName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-muted-foreground text-sm leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="#">
              <Icons.dashboard className="mr-2 size-4" aria-hidden="true" />
              Dashboard
              <DropdownMenuShortcut>⇧⌘</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.securitypasword className="mr-2 size-4" aria-hidden="true" />
            <Form action="/change-password">
              <button type="submit">Change password</button>
            </Form>

            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="#">
              <Icons.gear className="mr-2 size-4" aria-hidden="true" />
              Setting
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* <Link to='/login'>
          <Icons.exit className=' size-4 mr-2' aria-hidden='true'/>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </Link> */}
          <Form action="/logout" method="POST">
            <button type="submit" className="w-full">
              logout
            </button>
          </Form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AutoDropDown
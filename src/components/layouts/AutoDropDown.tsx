import { User } from '@/types';
import { Button } from '../ui/button';
import { Link } from 'react-router';
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
  return (
    <div>AutoDropDown</div>
  )
}

export default AutoDropDown
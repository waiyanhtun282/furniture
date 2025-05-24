

import { Button ,type ButtonProps} from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/Icons';

interface FavouriteProps extends ButtonProps {
productId:string;
rating:number
}

function AddToFavourite({productId,rating,className,...props}:FavouriteProps) {
  return (
    <div>
        <Button variant="secondary" size="icon" className={cn("size-4 shrink-0",className)}
        {...props}>
             <Icons.heart className='size-4'/>
        </Button>
    </div>
  )
}

export default AddToFavourite
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
interface RatingProps {
  rating: number;
}
function Rating({ rating }: RatingProps) {
  return (
    <div className="flex items-center space-x-1">
        {
            Array.from({length:5}).map((_,i) => (

                <Icons.star key={i} className={`"size-4" ${cn(rating >= i + 1 ? "text-yellow-500" :"text-muted-foreground")}`} />
            ))
        }
    </div>
  );
}

export default Rating;

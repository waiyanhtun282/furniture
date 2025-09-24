import { useNavigation } from "react-router";
import {useIsFetching} from  "@tanstack/react-query";


export default function ProgressBar() { 
    const navigation = useNavigation();
    const fetching = useIsFetching() > 0;

    if(fetching || navigation.state !== "idle") {    
        return (
            <div className="fixed top-0 left-0 right-0 h-1.5 z-50 w-full overflow-hidden bg-gray-200">
                <div className="absolute h-full w-2/3 animate-progress bg-green-600 "/>

                

            </div>
        )
    }
}
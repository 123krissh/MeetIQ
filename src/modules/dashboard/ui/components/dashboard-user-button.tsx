import { authClient } from "@/lib/auth-client";
import {
    Avatar,AvatarImage } from "@/components/ui/avatar";
import {ChevronDownIcon, CreditCardIcon, LogOutIcon} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import{ GeneratedAvatar} from "@/components/ui/generated-avatar"; 
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,

} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
 


export const DashboardUserButton = () => {
    const isMobile = useIsMobile();
    const router = useRouter();
    const { data , isPending } = authClient.useSession();
    
    const onLogout =  () =>{

        authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/sign-in")

                    }
                }
            })

        }

        
        

        if (isPending || !data?.user) {
            return null;
        }
        
        if(isMobile) {
            return(
                <Drawer>
                    <DrawerTrigger className="rounded-lg border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2">
                    {data.user.image ? (
                <Avatar>
                    <AvatarImage src={data.user.image}/>
                </Avatar>



             ) :  (
                <GeneratedAvatar
                  seed={data.user.name}
                  variant="initials"
                  className="size-9 mr-3" 
                />

             )}
             <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-0">
                <p className = "text-xs truncate w-full">
                    {data.user.name}
                </p>
                <p>
                    {data.user.email}
                </p>

             </div>
             <ChevronDownIcon className="size-4 shrink-0"/>

            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{data.user.name}</DrawerTitle>
                    <DrawerDescription>{data.user.email}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button
                    variant="outline"
                    onClick={() => {}}>
                        <CreditCardIcon className="size-4 text-black"/>
                        Billing
                        
                    </Button>
                    <Button
                    variant="outline"
                    onClick={onLogout}>
                        <LogOutIcon className="size-4 text-black"/>
                        Logout
                        
                    </Button>
                </DrawerFooter>
            </DrawerContent> 
                </Drawer>
            )
        }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2">
             {data.user.image ? (
                <Avatar>
                    <AvatarImage src={data.user.image}/>
                </Avatar>



             ) :  (
                <GeneratedAvatar
                  seed={data.user.name}
                  variant="initials"
                  className="size-9 mr-3" 
                />

             )}
             <div className="flex flex-col gap-0.5 text-left flex-1 min-0">
                <p className = "text-xs truncate w-full">
                    {data.user.name}
                </p>
                <p className="text-xs">
                    {data.user.email}
                </p>

             </div>
             <ChevronDownIcon className="size-4 shrink-0"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-72">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium trunctae">{data.user.name}</span>
                        <span className="text-s, font-normal text-muted-forground truncate">{data.user.email}</span>
                    </div>

                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="cursor-pointer flex item-center justify-center">
                    Billing
                    <CreditCardIcon className="siza-4"/>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer flex item-center justify-center">
                    Logout
                    <LogOutIcon className="size-4"/>
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    );
};
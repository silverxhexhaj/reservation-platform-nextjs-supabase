import { LogOut } from "lucide-react";
import { Settings } from "lucide-react";
import { User as UserIcon } from "lucide-react";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup } from "../ui/dropdown-menu";
import { authService } from "@/app/service/auth.service";
import { useRouter } from "next/navigation";
import { Profile } from "@/app/models/supabase.models";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

const profileTypeToLinks = {
    'client': {
        profile: '/pages/private/client/profile',
        settings: '/pages/private/client/settings'
    },
    'business_owner': {
        profile: '/pages/private/business/partner/profile',
        settings: '/pages/private/business/partner/settings'
    },
    'staff': {
        profile: '/pages/private/business/partner/profile',
        settings: '/pages/private/business/partner/settings'
    }
} as const;


export function UserProfileMenu({ user, profile }: { user: User | null, profile: Profile | null }) {
    const router = useRouter();

    const handleSignOut = async () => {
        await authService.signOut();
        router.push('/');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={profile?.profile_picture ?? '/avatars/01.png'} alt={profile?.first_name + ' ' + profile?.last_name} />
                        <AvatarFallback className="bg-slate-100 text-slate-600">
                            {user?.email?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user?.email?.split('@')[0]}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <Link href={profileTypeToLinks[profile?.profile_type ?? 'client'].profile}>
                        <DropdownMenuItem>
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={profileTypeToLinks[profile?.profile_type ?? 'client'].settings}>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-600" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

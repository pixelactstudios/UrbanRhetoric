// Global Imports
import { type AvatarProps } from '@radix-ui/react-avatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type User } from 'next-auth';
import { Icons } from '@/components/icons/icons';

// Internal Imports

// Types
type UserAvatarProps = AvatarProps & {
  user: Pick<User, 'image' | 'name'>;
};

// Component
const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-4 w-4"></Icons.user>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

// Exports
export default UserAvatar;

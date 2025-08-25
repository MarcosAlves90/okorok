'use client'

import React from 'react';
import Link from 'next/link';
import AvatarDisplay from '@/components/atoms/AvatarDisplay';

type User = {
    id: number;
    name: string;
    avatarUrl?: string | null;
    bio?: string | null;
};

type Props = {
    user: User;
    currentUserId: number | string | null;
};

export default function UserCard({ user, currentUserId }: Props): React.ReactElement {
    return (
        <Link
            key={user.id}
            href={String(currentUserId) === String(user.id) ? '/perfil' : `/usuarios/${user.id}`}
            className="bg-foreground text-background rounded-xl p-2 flex flex-col items-center transition-opacity text-center cursor-pointer hover:opacity-80"
        >
            <AvatarDisplay src={user.avatarUrl ?? null} alt={user.name} size={80} />
            <div className="mt-3 w-full">
                <div className="font-medium text-sm truncate">{user.name}</div>
                {user.bio && (
                    <div className="text-xs text-background/50 truncate mt-1">{user.bio}</div>
                )}
            </div>
        </Link>
    );
}

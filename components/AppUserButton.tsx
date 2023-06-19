"use client";
import { ClerkLoading, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

export default function AppUserButton() {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return <ClerkLoading />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 divide-y-[1px] divide-zinc-300">
      <div>
        <p className="mb-2 text-center">Add new subscription?</p>
        <button className="flex items-center rounded-lg bg-zinc-900 py-3 pl-4 pr-6 text-zinc-50">
          <i className="ri-add-line text-2xl" />
          New subscription
        </button>
      </div>
      <div className="flex w-full items-center px-4 py-4">
        <Image
          src={user.profileImageUrl}
          alt={`${user.username} avatar`}
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="ml-2 grow text-sm font-semibold">
          {user.username}
        </p>
        <button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <i className="ri-more-2-fill" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[220px] rounded-md bg-zinc-50 p-2 
              shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade
              "
              >
                <DropdownMenu.Item>
                  <SignOutButton
                    signOutCallback={() => router.push("/")}
                  />
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </button>
      </div>
    </div>
  );
}

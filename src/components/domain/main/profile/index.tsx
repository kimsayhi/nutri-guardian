"use client";

import DefaultProfile from "./DefaultProfile";
import EditProfileButton from "./EditProfileButton";

export default function Profile() {
  return (
    <div className="bg-primary-500 flex justify-between gap-1 rounded-lg p-4 shadow-lg">
      <DefaultProfile />
      <EditProfileButton />
    </div>
  );
}

import DefaultProfile from "@/components/main/DefaultProfile";
import EditProfileButton from "@/components/main/EditProfileButton";

export default function MainPage() {
  return (
    <>
      <main className="relative mx-auto min-h-screen w-full px-4">
        <div className="flex justify-between gap-1 py-4">
          <DefaultProfile />
          <EditProfileButton />
        </div>
      </main>
    </>
  );
}

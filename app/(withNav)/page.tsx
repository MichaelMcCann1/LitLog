import Logo from "@/components/logo/logo";
import BookSearch from "@/components/navbar/components/navBarComponents/bookSearch";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[calc(100dvh-56px)] flex flex-col items-center gap-4 px-2">
      <div className="flex flex-col gap-2 items-center mt-10 mb-20">
        <Logo size="large" />
        <p className="text-xl font-medium max-w-[250px] text-center text-sky-600">
          Explore books and track your reading
        </p>
      </div>
      <p className="max-w-[500px] py-3 text-center">
        Welcome to <b>LitLog</b>. Start tracking your reading by searching for
        books and adding books to your bookshelves.
      </p>
      <BookSearch />
      <span className="absolute bottom-4 sm:bottom-10 text-sm">
        Developed by{" "}
        <Link
          className="underline text-sky-700"
          href="https://michaelrmccann.com/"
        >
          Michael McCann
        </Link>
      </span>
    </div>
  );
}

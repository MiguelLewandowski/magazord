import Link from "next/link";

export default function RepositoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: "rgb(240, 240, 245)" }}>
      <nav className="container max-w-4xl mx-auto py-6 px-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-gray-700 text-2xl">github_explorer</span>
        </div>
        <Link
          href="/"
          className="text-2xl text-gray-500 hover:text-gray-700 flex items-center"
        >
          <span>← Voltar</span>
        </Link>
      </nav>
      {children}
    </div>
  );
}

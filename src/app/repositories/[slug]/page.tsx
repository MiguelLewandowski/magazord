import React from "react";
import {
  fetchGithubRepoDetails,
  fetchRepoIssues,
} from "@/services/githubRepoDetails";
import Image from "next/image";
import Link from "next/link";

type PageParams = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageParams) {
  const slug = params.slug;
  const decodedSlug = decodeURIComponent(slug);

  const [username, repo] = decodedSlug.split("/");

  const repoData = await fetchGithubRepoDetails(username, repo);
  const issues = await fetchRepoIssues(username, repo, 20);

  if (!repoData) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500">
          Não conseguimos carregar os dados do repositório.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto py-6">
          <div className="mb-6">
            <div className="p-8">
              <div className="flex items-center mb-15">
                {repoData.owner?.avatar_url && (
                  <div className="mr-6">
                    <Image
                      src={repoData.owner.avatar_url}
                      alt={username}
                      width={120}
                      height={120}
                      className="rounded-full"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-1">
                    {username}/{repo}
                  </h1>
                  <p className="text-gray-600 text-xl">{repoData.description || "The library for web and native user interfaces."}</p>
                </div>
              </div>

              <div className="flex gap-15">
                <div className="">
                  <div className="text-4xl font-semibold text-gray-800">
                    {repoData.stargazers_count.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Stars</div>
                </div>
                <div className="">
                  <div className="text-4xl font-semibold text-gray-800">
                    {repoData.forks_count.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Forks</div>
                </div>
                <div className="">
                  <div className="text-4xl font-semibold text-gray-800">
                    {repoData.open_issues_count.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Issues abertas</div>
                </div>
              </div>
            </div>
          </div>

          {issues && issues.length > 0 && (
            <div>
              {issues.map((issue: any, index: number) => (
                <div
                  key={issue.id}
                  className="hover:bg-gray-50 bg-white rounded-lg mt-5 pl-4"
                >
                  <Link
                    href={issue.html_url}
                    target="_blank"
                    className="p-5 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="font-semibold text-lg text-gray-800">
                          {issue.title}
                        </span>
                      </div>
                      <div className="text-md text-gray-500">{issue.user?.login}</div>
                    </div>
                    <div className="text-gray-400 ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

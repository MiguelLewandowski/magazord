import React from "react";
import {
  fetchGithubRepoDetails,
  fetchRepoIssues,
} from "@/services/githubRepoDetails";
import Image from "next/image";
import Link from "next/link";
import { GoChevronRight } from "react-icons/go";

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
        <div className="max-w-4xl mx-auto py-4 sm:py-6 px-4">
          <div className="mb-6">
            <div className="p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center mb-8 sm:mb-15">
                {repoData.owner?.avatar_url && (
                  <div className="flex justify-center sm:justify-start sm:mr-6 mb-4 sm:mb-0">
                    <div className="w-24 h-24 sm:w-[150px] sm:h-[150px] relative">
                      <Image
                        src={repoData.owner.avatar_url}
                        alt={username}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                )}
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                    {username}/{repo}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600">
                    {repoData.description || "The library for web and native user interfaces."}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-15">
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
                    {repoData.stargazers_count.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Stars</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
                    {repoData.forks_count.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Forks</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
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
                    className="p-3 sm:p-4 md:p-5 flex items-center justify-between transition-colors rounded-lg"
                  >
                    <div className="flex-1 min-w-0 pr-2 sm:pr-4">
                      <div className="flex items-center mb-1">
                        <span className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 truncate">
                          {issue.title}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">{issue.user?.login}</div>
                    </div>
                    <div className="text-gray-400 flex-shrink-0">
                      <GoChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
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

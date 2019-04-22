import * as React from "react";
import "./index.scss";
import { Query } from "react-apollo";
import { Meta } from "../components/Meta";
import { NavBar } from "../components/NavBar";
import { JobListCollection } from "../components/JobList";
import { withRouter, WithRouterProps } from "next/router";
import "../styles/common.scss";
import "../styles/job.scss";
import "../styles/markdown.scss";
import {
  getJobsQuery,
  GetJobsQueryType,
  GetJobsVariables
} from "../lib/common/queries/getJobs";
import * as Next from "next";
import { navigateToFilter } from "../lib/client/navigation";
import { PAGE_SIZE } from "../lib/common/constants";
import { filterPageData, isThereMore } from "../lib/common/pagination";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { IndexQuery } from "../lib/common/query-types";
import { getTitleForIndex } from "../lib/common/title";
import {
  EUROPE_ONLY,
  NORTH_AMERICA_ONLY,
  UK_ONLY,
  US_ONLY
} from "../lib/common/location";
import {
  AUTHENTIC_JOBS,
  STACKOVERFLOW,
  WE_WORK_REMOTELY
} from "../lib/common/sources";
import { NotFoundList } from "../components/EmptyJobs";

function loadMoreJobs(
  query: IndexQuery,
  offset: number,
  fetchMore: (options: any) => void
) {
  fetchMore({
    variables: getGetJobsQueryVariablesFromQuery(query, offset, PAGE_SIZE + 1),
    updateQuery: (
      previousResult: GetJobsQueryType,
      { fetchMoreResult }: any
    ) => {
      if (!fetchMoreResult) {
        return previousResult;
      }
      return Object.assign({}, previousResult, {
        // Append the new posts results to the old one
        getJobs: [
          ...previousResult.getJobs,
          ...filterPageData(fetchMoreResult.getJobs)
        ]
      });
    }
  });
}

export type IndexPageProps = WithRouterProps & {
  query: IndexQuery;
};

const IndexPage = ({ query, router }: IndexPageProps) => {
  return (
    <div>
      <Meta title={getTitleForIndex(query)} />
      <NavBar />
      <Query<GetJobsQueryType, GetJobsVariables>
        query={getJobsQuery}
        variables={getGetJobsQueryVariablesFromQuery(query, 0, PAGE_SIZE + 1)}
        notifyOnNetworkStatusChange={true}
      >
        {({ data, fetchMore, loading }) => {
          return (
            <div className="container">
              <Header
                onFilter={filter => navigateToFilter(filter)}
                query={query}
              />
              <div className="columns">
                <div className="column is-full">
                  {loading && (
                    <div className="box-white loading-box">
                      <i className="fas fa-spinner" /> Loading...
                    </div>
                  )}
                  <JobListCollection
                    router={router}
                    jobs={data ? data.getJobs : []}
                    onLoadMore={() =>
                      loadMoreJobs(
                        query,
                        data ? data.getJobs.length : 0,
                        fetchMore
                      )
                    }
                    loading={loading}
                    showLoadMore={
                      loading || isThereMore(data ? data.getJobs : [])
                    }
                    query={query}
                  />
                  {data && data.getJobs.length === 0 && <NotFoundList />}
                </div>
              </div>
            </div>
          );
        }}
      </Query>
      <Footer />
    </div>
  );
};

function getGetJobsQueryVariablesFromQuery(
  query: IndexQuery,
  offset: number,
  limit: number
): GetJobsVariables {
  return {
    tag: query.tag,
    limit: limit,
    offset: offset,
    anywhere: query.anywhere || undefined,
    salary: query.salary || undefined,
    excludeLocationTags: [
      query.nonorthamericaonly ? NORTH_AMERICA_ONLY : "",
      query.nousonly ? US_ONLY : "",
      query.noukonly ? UK_ONLY : "",
      query.noeuropeonly ? EUROPE_ONLY : ""
    ].filter(i => !!i),
    sources: [
      query.stackoverflow ? STACKOVERFLOW : "",
      query.weworkremotely ? WE_WORK_REMOTELY : "",
      query.authenticjobs ? AUTHENTIC_JOBS : ""
    ].filter(i => !!i)
  };
}

IndexPage.getInitialProps = async ({ query }: Next.NextContext) => {
  return {
    query: {
      filters: query.filters === "true",
      tag: query.tag,
      // default filters
      salary: query.salary === "true",
      anywhere: query.anywhere === "true",
      // location
      nousonly: query.nousonly === "true",
      nonorthamericaonly: query.nonorthamericaonly === "true",
      noukonly: query.noukonly === "true",
      noeuropeonly: query.noeuropeonly === "true",
      // source
      stackoverflow: query.stackoverflow === "true",
      weworkremotely: query.weworkremotely === "true",
      authenticjobs: query.authenticjobs === "true",
      // company
      company: query.company
    } as IndexQuery
  };
};

export default withRouter(IndexPage);

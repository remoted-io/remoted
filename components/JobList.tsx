import * as React from "react";
import "./JobList.scss";
import { JobPost } from "./JobPost";
import { Job } from "../graphql-types";

export interface JobBoardProps {
  jobs: Job[];
}
export const JobBoard = (props: JobBoardProps) => (
  <ul className="job-list">
    {props.jobs.map(j => (
      <JobPost {...j} />
    ))}
  </ul>
);

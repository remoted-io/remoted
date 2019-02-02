import { importSchema } from "graphql-import";
import { ApolloServer, gql } from "apollo-server-express";
import { JobResolvers, Resolvers } from "./types/resolver-types";
import { Request } from "express";
import { Context } from "./types/context";
import { buildDb } from "../db/build-db";
import { getJobs } from "../db/services/job-service";
import { PAGE_SIZE } from "../constants";

const typeDefs = gql(importSchema("server/graphql/schema.graphql"));

type ResolversType = Resolvers & {
  [key: string]: any;
};

const resolvers: ResolversType = {
  Query: {
    jobs: async (_parent, args) => {
      const db = await buildDb();
      const jobs = await getJobs(db, args.limit || PAGE_SIZE, args.offset || 0);
      return jobs.map(j => ({
        id: j.public_id,
        title: j.title
      }));
    }
  },
  Job: JobResolvers.defaultResolvers
};

// @ts-ignore
export function getContext({ req }: { req: Request }) {
  const context: Context = {
    authScope: {
      name: "andre"
    }
  };
  return context;
}

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: getContext
});

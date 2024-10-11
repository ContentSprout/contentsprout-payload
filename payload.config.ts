import { Posts } from "./collections/posts";
import { postgresAdapter } from "@payloadcms/db-postgres";

module.exports = {
  serverURL: "http://localhost:3000",
  collections: [Posts],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL,
    },
  }),
};

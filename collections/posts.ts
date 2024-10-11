import { CollectionConfig } from "payload/types";

export const Posts: CollectionConfig = {
  slug: "posts",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
    },
  ],
  db: {
    // Create a document in a custom db
    create: async ({ collection, data, req }) => {
      const doc = await fetch(`https://example.com/api/${collection}/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "x-app-user": `payload_${req.payload.user}`,
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());

      return doc;
    },

    // Delete a document in a custom db
    deleteOne: async ({ collection, data, req }: any) => {
      const docs = await fetch(
        `https://example.com/api/${collection}/delete/${data.id}`,
        {
          method: "DELETE",
          headers: {
            "x-app-user": `payload_${req.payload.user}`,
          },
        }
      ).then((response) => response.json());

      return docs;
    },

    // Delete many documents in a custom db
    deleteMany: async ({ collection, data, req }: any) => {
      const docs = await fetch(`https://example.com/api/${collection}/delete`, {
        method: "DELETE",
        headers: {
          "x-app-user": `payload_${req.payload.user}`,
        },
        body: JSON.stringify(data),
      }).then((response) => response.json());

      return docs;
    },

    // Find documents in a custom db
    find: async ({ collection, data, req, where, limit }: any) => {
      const docs = await fetch(`https://example.com/api/${collection}/find`, {
        headers: {
          "x-app-user": `payload_${req.payload.user}`,
        },
        body: JSON.stringify({ data, where, limit }),
      }).then((response) => response.json());

      return {
        docs,
        hasNextPage: false,
        hasPrevPage: false,
        totalDocs: 0,
        limit,
        totalPages: 0,
        page: 0,
        pagingCounter: 0,
      };
    },

    // Find one document in a custom db
    findOne: async ({ collection, data, req }: any) => {
      const doc = await fetch(
        `https://example.com/api/${collection}/find/${data.id}`,
        {
          headers: {
            "x-app-user": `payload_${req.payload.user}`,
          },
        }
      ).then((response) => response.json());

      return doc;
    },

    // Update one document in an custom db
    updateOne: async ({ collection, data, req }) => {
      const doc = await fetch(
        `https://example.com/api/${collection}/update/${data.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "x-app-user": `payload_${req.payload.user}`,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.json());

      return { ...doc, updated: true };
    },
  },
};

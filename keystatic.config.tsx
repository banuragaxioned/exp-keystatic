import { config, collection, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "banuragaxioned",
      name: "exp-keystatic",
    },
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
        related: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            age: fields.integer({ label: "Age" }),
            projects: fields.array(
              fields.relationship({
                label: "Posts",
                collection: "posts",
                validation: {
                  isRequired: true,
                },
              }),
              {
                label: "Posts",
                itemLabel: (props) => props.value ?? "Select a project",
              }
            ),
          }),
          // Labelling options
          {
            label: "Related",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),
  },
});

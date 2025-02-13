import type { EntryFieldTypes } from "contentful";

export type ProjectEntry = {
  contentTypeId: "project";
  fields: {
    name: EntryFieldTypes.Text;
    tagline: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    githubUrl?: EntryFieldTypes.Text;
    deployUrl?: EntryFieldTypes.Text;
    projectImages: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    thumbnailImage: EntryFieldTypes.AssetLink;
    slug: EntryFieldTypes.Text;
    stack: EntryFieldTypes.RichText;
  };
};

export type Thoughts = {
  contentTypeId: "thoughts";
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
    publicationDay: EntryFieldTypes.Date;
    slug: EntryFieldTypes.Text;
  };
};

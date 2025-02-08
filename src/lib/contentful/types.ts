import type { EntryFieldTypes } from "contentful";

export type Project = {
  contentTypeId: "project";
  fields: {
    name: EntryFieldTypes.Text;
    tagline: EntryFieldTypes.Text;
    githubUrl?: EntryFieldTypes.Text;
    deployUrl?: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    projectImages: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    thumnbnailImage: EntryFieldTypes.AssetLink;
  };
};

export type Thoughts = {
  contentTypeId: "thoughts";
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
    publicationDay: EntryFieldTypes.Date;
  };
};

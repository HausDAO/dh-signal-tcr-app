import { CustomFieldLego } from "./config";

export const FIELD: Record<string, CustomFieldLego> = {
  TITLE: {
    id: "title",
    type: "input",
    label: "Proposal Title",
    placeholder: "Enter title",
  },
  DESCRIPTION: {
    id: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter description",
  },
  LINK: {
    id: "link",
    type: "input",
    label: "Link",
    placeholder: "http://",
    expectType: "url",
  },
  YOUTUBE: {
    id: "youtube",
    type: "input",
    label: "YouTube (share link)",
    placeholder: "https://youtu.be/lgjguiFxtps",
    expectType: "url",
  },
  IMGUR: {
    id: "imgur",
    type: "input",
    label: "Imgur (Link to image png, jpg, gif)",
    placeholder: "https://i.imgur.com/OAMDIRE.png",
    expectType: "url",
  },
  TEST_FIELD: {
    id: "test",
    type: "input",
    label: "Test Field",
    placeholder: "Enter something",
  },
};

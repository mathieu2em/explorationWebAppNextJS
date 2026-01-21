import { groq } from "next-sanity";

export const TATTOOS_QUERY = groq`*[_type == "tattoo"] | order(order asc) {
  _id,
  title,
  alt,
  size,
  order,
  image {
    asset->{
      _id,
      url
    }
  }
}`;

export interface Tattoo {
  _id: string;
  title: string;
  alt: string;
  size: "small" | "medium" | "large";
  order: number;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

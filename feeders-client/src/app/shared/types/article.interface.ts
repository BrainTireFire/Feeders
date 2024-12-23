import {ProfileInterface} from "./profile.interface";
import {PopularTagType} from "./popularTag.type";

export interface ArticleInterface {
  title: string;
  description: string;
  body: string;
  slug: string;
  tagList: PopularTagType[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileInterface
}

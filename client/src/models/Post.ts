import {Comment} from "./Comment";
import {Report} from "./Report";
import {UserLite} from "./UserLite";

export interface Post {
  id: string,
  userLite: UserLite,
  imageUrl: string,
  animalType: string,
  animalNeed: string,
  district: string,
  addressText: string,
  locationLink: string,
  description: string,
  createdAt: string,
  modifiedAt: string,
  status: string,
  comments: Comment[];
  reports: Report[];
}
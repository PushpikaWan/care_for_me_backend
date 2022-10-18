import {Comment} from "./Comment";
import {Report} from "./Report";
import {UserLite} from "./UserLite";

export interface Post {
  id: String,
  userLite: UserLite,
  imageUrl: String,
  animalType: String,
  animalNeed: String,
  district: String,
  addressText: String,
  locationLink: String,
  description: String,
  createdAt: String,
  modifiedAt: String,
  status: String,
  comments: Comment[];
  reports: Report[];
}
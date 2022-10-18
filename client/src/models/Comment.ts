import {UserLite} from "./UserLite";
import {Report} from "./Report";

export interface Comment{
  id: String,
  userLite: UserLite,
  text: String,
  postedAt: String,
  reports: Report
}
import {UserLite} from "./UserLite";
import {Report} from "./Report";

export interface Comment{
  id: string,
  userLite: UserLite,
  text: string,
  postedAt: string,
  reports: Report[]
}
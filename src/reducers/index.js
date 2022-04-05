import { combineReducers } from "redux";

import posts from "./posts";
import user from "./users";
import error from "./users";

export default combineReducers({ posts, user, error });

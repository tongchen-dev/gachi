import { Option } from "./option";
import { requestMethod, requestOption } from "./request";

export type urls = requestOption  | URL | string | [string, requestMethod, Record<string,any>];
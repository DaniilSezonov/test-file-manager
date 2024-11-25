import type { App } from "../../../backend/src/index";
import { treaty } from "@elysiajs/eden";

const backend = treaty<App>(import.meta.env.VITE_API_ENDPOINT);
export default backend;
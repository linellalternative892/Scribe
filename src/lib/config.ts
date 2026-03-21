import config from "../../scribe.config";
import type { ScribeConfig } from "./types";

export function getConfig(): ScribeConfig {
  return config;
}

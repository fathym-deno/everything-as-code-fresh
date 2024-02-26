import {
  EverythingAsCode,
  EverythingAsCodeSources,
} from "../../../src.deps.ts";

export type GitHubAccessPluginState = {
  EaC?: EverythingAsCode & EverythingAsCodeSources;

  Username?: string;
};

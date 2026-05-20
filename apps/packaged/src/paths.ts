import { join } from "node:path";

import { resolveBundleBasePath } from "@open-design/bundle";
import { APP_KEYS } from "@open-design/sidecar-proto";

import type { PackagedConfig } from "./config.js";

export type PackagedNamespacePaths = {
  bundleActivationPath: string;
  bundleBasePath: string;
  cacheRoot: string;
  desktopIdentityPath: string;
  desktopLogPath: string;
  dataRoot: string;
  desktopLogsRoot: string;
  electronSessionDataRoot: string;
  electronUserDataRoot: string;
  headlessIdentityPath: string;
  logsRoot: string;
  namespaceRoot: string;
  resourceRoot: string;
  runtimeRoot: string;
  updateRoot: string;
  webIdentityPath: string;
};

export function resolvePackagedNamespacePaths(
  config: PackagedConfig,
  namespace = config.namespace,
  options: { bundleBasePath?: string | null; env?: NodeJS.ProcessEnv } = {},
): PackagedNamespacePaths {
  const namespaceRoot = join(config.namespaceBaseRoot, namespace);
  const dataRoot = join(namespaceRoot, "data");
  const bundleBasePath = resolveBundleBasePath({
    env: options.env,
    explicitBasePath: options.bundleBasePath ?? config.bundleBasePath,
    namespaceDataPath: dataRoot,
  });

  return {
    bundleActivationPath: join(dataRoot, "bundle-activation.json"),
    bundleBasePath,
    cacheRoot: join(namespaceRoot, "cache"),
    desktopIdentityPath: join(namespaceRoot, "runtime", "desktop-root.json"),
    desktopLogPath: join(namespaceRoot, "logs", APP_KEYS.DESKTOP, "latest.log"),
    dataRoot,
    desktopLogsRoot: join(namespaceRoot, "logs", APP_KEYS.DESKTOP),
    electronSessionDataRoot: join(namespaceRoot, "user-data", "session"),
    electronUserDataRoot: join(namespaceRoot, "user-data"),
    headlessIdentityPath: join(namespaceRoot, "runtime", "headless-root.json"),
    logsRoot: join(namespaceRoot, "logs"),
    namespaceRoot,
    resourceRoot: config.resourceRoot,
    runtimeRoot: join(namespaceRoot, "runtime"),
    updateRoot: join(namespaceRoot, "updates"),
    webIdentityPath: join(namespaceRoot, "runtime", "web-root.json"),
  };
}

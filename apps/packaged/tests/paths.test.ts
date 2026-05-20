import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { resolvePackagedNamespacePaths } from "../src/paths.js";
import type { PackagedConfig } from "../src/config.js";

describe("resolvePackagedNamespacePaths", () => {
  it("models update downloads as a namespace-scoped root beside data", () => {
    const config: PackagedConfig = {
      appVersion: "1.2.3",
      bundleBasePath: null,
      daemonCliEntry: null,
      daemonSidecarEntry: null,
      namespace: "release",
      namespaceBaseRoot: "/tmp/open-design-packaged/namespaces",
      nodeCommand: null,
      resourceRoot: "/tmp/open-design-packaged/resources",
      telemetryRelayUrl: null,
      posthogKey: null,
      posthogHost: null,
      webSidecarEntry: null,
      webStandaloneRoot: null,
      webOutputMode: "server",
    };

    const paths = resolvePackagedNamespacePaths(config);
    expect(paths.namespaceRoot).toBe(join(config.namespaceBaseRoot, "release"));
    expect(paths.dataRoot).toBe(join(paths.namespaceRoot, "data"));
    expect(paths.bundleBasePath).toBe(join(paths.dataRoot, "bundles"));
    expect(paths.bundleActivationPath).toBe(join(paths.dataRoot, "bundle-activation.json"));
    expect(paths.updateRoot).toBe(join(paths.namespaceRoot, "updates"));
  });

  it("allows bundle base path override through env or explicit options", () => {
    const config: PackagedConfig = {
      appVersion: "1.2.3",
      bundleBasePath: null,
      daemonCliEntry: null,
      daemonSidecarEntry: null,
      namespace: "release",
      namespaceBaseRoot: "/tmp/open-design-packaged/namespaces",
      nodeCommand: null,
      resourceRoot: "/tmp/open-design-packaged/resources",
      telemetryRelayUrl: null,
      posthogKey: null,
      posthogHost: null,
      webSidecarEntry: null,
      webStandaloneRoot: null,
      webOutputMode: "server",
    };

    expect(resolvePackagedNamespacePaths(config, config.namespace, {
      env: { OD_BUNDLE_BASE_PATH: "/tmp/env-bundles" },
    }).bundleBasePath).toBe("/tmp/env-bundles");
    expect(resolvePackagedNamespacePaths(config, config.namespace, {
      bundleBasePath: "/tmp/explicit-bundles",
      env: { OD_BUNDLE_BASE_PATH: "/tmp/env-bundles" },
    }).bundleBasePath).toBe("/tmp/explicit-bundles");
  });
});

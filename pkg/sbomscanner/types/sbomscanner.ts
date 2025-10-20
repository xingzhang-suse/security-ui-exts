export const PRODUCT_NAME = "imageScanner";
export const SBOMSCANNER = {
  CONTROLLER: "sbomscanner",
  CHART_NAME: "sbomscanner",
  SERVICE: "sbomscanner",
  SCHEMA: "sbomscanner.kubewarden.io.registry",
};
export const CNPG = {
  CONTROLLER: "cloudnative-pg",
  CHART_NAME: "cloudnative-pg",
  SERVICE: "cloudnative-pg",
  SCHEMA: "postgresql.cnpg.io.cluster",
};
export const CERT_MANAGER = {
  CONTROLLER: "cert-manager",
  CHART_NAME: "cert-manager",
  SERVICE: "cert-manager",
  SCHEMA: "cert-manager.io.certificate",
};
export const SBOMSCANNER_REPOS = {
  CHARTS_REPO: "https://charts.kubewarden.io",
  CHARTS_REPO_NAME: "kubewarden",
};
export const CNPG_REPOS = {
  CHARTS_REPO: "https://cloudnative-pg.github.io/charts",
  CHARTS_REPO_NAME: "cnpg",
};
export const CERT_MANAGER_REPOS = {
  CHARTS_REPO: "https://charts.jetstack.io",
  CHARTS_REPO_NAME: "jetstack",
};
export const RESOURCE = {
  REGISTRY: "sbomscanner.kubewarden.io.registry",
  SCAN_JOB: "sbomscanner.kubewarden.io.scanjob",
  VEX_HUB: "sbomscanner.kubewarden.io.vexhub",
  VULNERABILITY_REPORT: "storage.sbomscanner.kubewarden.io.vulnerabilityreport",
  IMAGE: "storage.sbomscanner.kubewarden.io.image",
  SBOM: "storage.sbomscanner.kubewarden.io.sbom",
};
export const PAGE = {
  DASHBOARD: "dashboard",
  REGISTRIES: "registries",
  IMAGES: "images",
  VULNERABILITIES: "vulnerabilities",
  CVE_DETAIL: "cve_detail",
  VEX_MANAGEMENT: "vex_management",
};
export interface MetadataProperty {
  type: "text" | "tags";
  label?: string;
  value?: string;
  tags?: string[];
}

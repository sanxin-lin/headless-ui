import { isString } from "lodash-es"
import { createMatchPath, type ConfigLoaderSuccessResult } from "tsconfig-paths"

export async function resolveImport(
  importPath: string,
  config: Pick<ConfigLoaderSuccessResult, "absoluteBaseUrl" | "paths">
) {
  let path = createMatchPath(config.absoluteBaseUrl, config.paths)(
    importPath,
    undefined,
    () => true,
    [".ts", ".tsx"]
  )
  if (isString(path)) {
    path = path.replace(/\//g, "\\")
  }
  return path
}

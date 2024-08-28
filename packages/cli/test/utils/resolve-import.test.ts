import path from "path"
import { loadConfig, type ConfigLoaderSuccessResult } from "tsconfig-paths"
import { expect, test } from "vitest"

import { resolveImport } from "../../src/utils/resolve-import"

test("resolve import", async () => {
  expect(
    await resolveImport("@/foo/bar", {
      absoluteBaseUrl: "/Users/headless-ui/Projects/foobar",
      paths: {
        "@/*": ["./src/*"],
        "~/components/*": ["./src/components/*"],
        "~/lib": ["./src/lib"],
      },
    })
  ).toEqual("D:\\Users\\headless-ui\\Projects\\foobar\\src\\foo\\bar")

  expect(
    await resolveImport("~/components/foo/bar/baz", {
      absoluteBaseUrl: "/Users/headless-ui/Projects/foobar",
      paths: {
        "@/*": ["./src/*"],
        "~/components/*": ["./src/components/*"],
        "~/lib": ["./src/lib"],
      },
    })
  ).toEqual(
    "D:\\Users\\headless-ui\\Projects\\foobar\\src\\components\\foo\\bar\\baz"
  )

  expect(
    await resolveImport("components/foo/bar", {
      absoluteBaseUrl: "/Users/headless-ui/Projects/foobar",
      paths: {
        "components/*": ["./src/app/components/*"],
        "ui/*": ["./src/ui/primities/*"],
        lib: ["./lib"],
      },
    })
  ).toEqual(
    "D:\\Users\\headless-ui\\Projects\\foobar\\src\\app\\components\\foo\\bar"
  )

  // TODO 这里有 BUG 吧？
  expect(
    await resolveImport("lib/utils", {
      absoluteBaseUrl: "/Users/headless-ui/Projects/foobar",
      paths: {
        "components/*": ["./src/app/components/*"],
        "ui/*": ["./src/ui/primities/*"],
        lib: ["./src/lib"],
      },
    })
  ).toEqual("\\Users\\headless-ui\\Projects\\foobar\\lib\\utils")
})

test("resolve import with base url", async () => {
  const cwd = path.resolve(__dirname, "../fixtures/with-base-url")
  const config = (await loadConfig(cwd)) as ConfigLoaderSuccessResult

  expect(await resolveImport("@/components/ui", config)).toEqual(
    path.resolve(cwd, "components/ui")
  )
  expect(await resolveImport("@/lib/utils", config)).toEqual(
    path.resolve(cwd, "lib/utils")
  )
  expect(await resolveImport("foo/bar", config)).toEqual(
    path.resolve(cwd, "foo/bar")
  )
})

test("resolve import without base url", async () => {
  const cwd = path.resolve(__dirname, "../fixtures/without-base-url")
  const config = (await loadConfig(cwd)) as ConfigLoaderSuccessResult

  expect(await resolveImport("~/components/ui", config)).toEqual(
    path.resolve(cwd, "components/ui")
  )
  expect(await resolveImport("~/lib/utils", config)).toEqual(
    path.resolve(cwd, "lib/utils")
  )
  expect(await resolveImport("foo/bar", config)).toEqual(
    path.resolve(cwd, "foo/bar")
  )
})

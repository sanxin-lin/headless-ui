import path from "path"
import { Config } from "@/src/utils/get-config"
import {
  registryBaseColorSchema,
  registryIndexSchema,
  registryItemWithContentSchema,
  registryWithContentSchema,
  stylesSchema,
} from "@/src/utils/registry/schema"
import { HttpsProxyAgent } from "https-proxy-agent"
import fetch from "node-fetch"
import { z } from "zod"

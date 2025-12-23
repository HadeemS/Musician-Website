/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

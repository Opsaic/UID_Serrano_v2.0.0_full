if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  const originalWarn = console.warn
  console.warn = (...args: any[]) => {
    // Suppress Tailwind CSS deprecation warnings
    if (
      typeof args[0] === "string" &&
      (args[0].includes("has been renamed to") || args[0].includes("Update your configuration file"))
    ) {
      return
    }
    originalWarn.apply(console, args)
  }
}

if (typeof window !== "undefined") {
  ;(window as any).MonacoEnvironment = {
    getWorker: () =>
      new Worker(URL.createObjectURL(new Blob(["self.onmessage = () => {}"], { type: "text/javascript" }))),
  }
}

export {}

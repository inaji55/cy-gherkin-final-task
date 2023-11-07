import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {

    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php/",
    specPattern: '**/*.feature',
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require("./cypress/plugins")(on, config);
    },
  },

  env:{ //"Admin","admin123"
    username: "Admin",
    password: "admin123"
  },
  viewportHeight: 900,
  viewportWidth: 1600,
  requestTimeout: 150000,
  responseTimeout: 150000,
  blockHosts: ["**pendo*", "**package.json"],
  defaultCommandTimeout: 6000,
  pageLoadTimeout: 150000,
  video: false,
  trashAssetsBeforeRuns: true,
  numTestsKeptInMemory: 5,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporterOpts.json",
  },
  chromeWebSecurity: false,
  
});

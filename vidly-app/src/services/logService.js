// import Raven from "raven-js";

function init() {
  // Raven.config(
  //   "https://3c6dc3c3fb1da7629e6848ef92f66199@o4508416020578304.ingest.us.sentry.io/4508416028508160",
  //   {
  //     release: "0.0.1",
  //     environment: "development-test",
  //   }
  // ).install();
}

function log(error) {
  console.error(error);
  // Raven.captureException(error);
}

export default {
  init,
  log,
};

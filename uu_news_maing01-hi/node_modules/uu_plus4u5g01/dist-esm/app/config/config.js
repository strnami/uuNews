import Config from "../../config/config.js";

export default {
  ...Config,

  TAG: Config.TAG + "App.",
  CSS: Config.CSS + "app-"
};

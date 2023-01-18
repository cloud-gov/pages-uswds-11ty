const uswds = require("@uswds/compile");

uswds.settings.version = 3;

uswds.paths.dist.img = "./assets/uswds/img";
uswds.paths.dist.fonts = "./assets/uswds/fonts";
uswds.paths.dist.js = "./assets/uswds/js";
uswds.paths.dist.css = "./assets/uswds/css";

exports.init = uswds.init;
exports.update = uswds.updateUswds;
exports.compile = uswds.compile;
exports.watch = uswds.watch;
exports.default = uswds.watch;

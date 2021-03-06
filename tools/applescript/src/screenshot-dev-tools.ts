import { launchFirefox, quitFirefox, screenshotFirefox, setFirefoxWindowBounds } from "../modules/firefox";
import { sendKeyStroke } from "../modules/keyboard-util";
import * as path from "path";
import { wait } from "../modules/wait";
import meow = require("meow");
const profileName = "js-primer";


const cli = meow(`
    Usage
      $ screenshot-dev-tools <input>

    Options
      --url         open url
      --output, -o  output path of image

    Examples
      $ screenshot-dev-tools --url "http://127.0.0.1:8080/final/final/" --output ./output.png
`, {
        flags: {
            url: {
                type: 'string'
            },
            output: {
                type: 'string',
                alias: 'o'
            }
        }
});
const outputFilePath = path.resolve(process.cwd(), cli.flags.output);
(async function () {
    await quitFirefox();
    await wait(1000);
    await launchFirefox({
        url: cli.flags.url,
        profileName
    });
    await wait(1000);
    await setFirefoxWindowBounds();
    await wait(1000);
    await sendKeyStroke("k", {
        command: true,
        option: true
    });
    await wait(1000);
    await screenshotFirefox(outputFilePath);
    await quitFirefox();
})();

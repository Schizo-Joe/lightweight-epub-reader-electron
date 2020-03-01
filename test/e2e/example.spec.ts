import { Application } from 'spectron';
import electronPath from 'electron'; // Require Electron from the binaries included in node_modules.
import * as path from 'path';

import { APP_TITLE } from "../../src/constants/constants";

jest.setTimeout(10000);

describe('Main window', () => {
    let app: Application;

    beforeEach(() => {
        app = new Application({
            path: electronPath.toString(),
            args: [path.join(__dirname, '..', '..')]
        });

        return app.start();
    });

    afterEach(() => {
        if (app.isRunning()) {
            return app.stop();
        }
    });

    it('opens the window', async () => {
        const { client, browserWindow } = app;

        await client.waitUntilWindowLoaded();
        const title = await browserWindow.getTitle();

        expect(title).toBe(APP_TITLE);
    });

    it('increments the counter', async () => {
        const { client } = app;

        await client.waitUntilWindowLoaded();
        await client.click('#increment');

        const counterText = await client.getText('#counter-value');

        expect(counterText).toBe('Current value: 1');
    });

    it('decrements the counter', async () => {
        const { client } = app;

        await client.waitUntilWindowLoaded();
        await client.click('#decrement');

        const counterText = await client.getText('#counter-value');

        expect(counterText).toBe('Current value: -1');
    });
});

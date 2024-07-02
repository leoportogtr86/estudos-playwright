const { test } = require("@playwright/test");

test('Teste inicial com playwright', async ({ page }) => {
    await page.goto("https://leoportogtr86.github.io/cy-play/");
})
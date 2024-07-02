//@ts-check
const { test, expect } = require("@playwright/test");

test('Teste inicial com playwright', async ({ page }) => {
    await page.goto("https://leoportogtr86.github.io/cy-play/");
    const texto = page.getByText("Bem-vindo ao Cypress Playground");
    const formTitle = page.getByText("Formulários");
    const formularios = page.getByRole("link", {name: "Formulários"});

    await expect(texto).toBeVisible();
    await expect(formularios).toBeVisible();

    await formularios.click();
    await expect(formTitle).toBeVisible();
})
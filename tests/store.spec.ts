import { expect, test } from "@playwright/test";

test("shopping bag survives reload, updates totals and removes items", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/shop");
  await page
    .getByRole("button", { name: "Add The Everyday Bowl to bag", exact: true })
    .click();
  const bag = page.getByRole("dialog", { name: /Your goodie bag/ });
  await expect(bag).toBeVisible();
  await expect(bag.locator(".subtotal")).toContainText("$24.00");
  await bag
    .getByRole("button", { name: "Increase The Everyday Bowl quantity" })
    .click();
  await expect(bag.locator(".subtotal")).toContainText("$48.00");
  await expect(bag).toContainText("No payment will be collected");
  await page.reload();
  await page
    .getByRole("button", { name: "Open shopping bag, 2 items" })
    .click();
  await expect(bag.locator(".subtotal")).toContainText("$48.00");
  await bag.getByRole("button", { name: "Remove", exact: true }).click();
  await expect(bag).toContainText("A little empty. For now.");
  await page.keyboard.press("Escape");
  await expect(bag).not.toBeVisible();
  expect(errors).toEqual([]);
});

test("pet filters, search, sorting and product details work", async ({
  page,
}) => {
  await page.goto("/shop?pet=cats");
  await expect(page.locator(".product-card")).toHaveCount(4);
  await expect(
    page.getByRole("button", { name: "For cats", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "For everyone", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(6);
  await page.getByLabel("Sort products").selectOption("price-asc");
  await expect(page.locator(".product-card").first()).toContainText(
    "The Little Fish",
  );
  await page.getByRole("searchbox", { name: "Search collection" }).fill("bowl");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page
    .getByRole("link", { name: "View The Everyday Bowl", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "The Everyday Bowl",
  );
  await expect(page).toHaveTitle(/The Everyday Bowl/);
});

test("header search, no results and mobile menu are usable", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation", exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Close menu", exact: true }).click();
  }
  await page
    .getByRole("button", { name: "Search products", exact: true })
    .click();
  await page
    .getByRole("searchbox", { name: "Search products", exact: true })
    .fill("no-matching-product");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.getByText("No little treasures here. Yet.")).toBeVisible();
  await page
    .getByRole("button", { name: "Reset filters", exact: true })
    .click();
  await expect(page.locator(".product-card")).toHaveCount(6);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
});

test("preview blocks checkout and search indexing", async ({ request }) => {
  const checkout = await request.post("/api/checkout", {
    data: { items: [{ id: 1001, quantity: 1 }] },
  });
  expect(checkout.status()).toBe(503);
  expect((await checkout.json()).error).toContain("Orders aren't open");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
  const status = await request.get("/api/checkout/status");
  expect(await status.json()).toMatchObject({
    commerceMode: "not-live",
    checkoutEnabled: false,
  });
});

test("home loads its images and fits the viewport", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Good things.",
  );
  const hero = page.getByAltText(
    "A golden retriever with a happy smile enjoying the sunshine",
  );
  await expect(hero).toBeVisible();
  await expect
    .poll(() =>
      hero.evaluate((node) => (node as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBe(false);
  for (const photo of await page.locator(".pet-category img").all()) {
    await photo.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        photo.evaluate((node) => (node as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: test.info().outputPath("home.png"),
    fullPage: true,
  });
});

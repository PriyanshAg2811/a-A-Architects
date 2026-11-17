import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.on('pageerror', error => { throw error; });
  // Never send a real enquiry while testing. Individual tests explicitly stub success/failure.
  await page.route('**/api/contact', route => route.abort());
});

test('portfolio and service answers are available before JavaScript', async ({ browser, request }) => {
  const html = await (await request.get('/projects')).text();
  expect(html.match(/href="\/projects\/[^"?]+"/g)?.length).toBeGreaterThanOrEqual(22);
  const services = await (await request.get('/services')).text();
  expect(services).toContain('We guide projects through every phase');
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${test.info().project.use.baseURL || process.env.TEST_BASE_URL || 'http://127.0.0.1:3100'}/projects`);
  await expect(page.getByRole('link', { name: /Asymmetrical Boxing/ })).toBeVisible();
  await context.close();
});

test('project filters preserve category context and images use responsive derivatives', async ({ page, isMobile }) => {
  await page.goto('/projects');
  if (isMobile) await page.getByLabel('Select category').selectOption('Residential');
  else await page.getByRole('button', { name: 'Residential', exact: true }).click();
  await expect(page).toHaveURL(/category=Residential/);
  await expect(page.locator('main a[href^="/projects/"]')).toHaveCount(14);
  const image = page.locator('main img').first();
  await expect(image).toHaveAttribute('srcset', /f_auto,q_80,c_limit,w_/);
  await page.getByRole('link', { name: /Asymmetrical Boxing/ }).click();
  await expect(page.getByRole('heading', { name: 'Asymmetrical Boxing', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Back to projects' })).toHaveAttribute('href', '/projects?category=Residential');
  await page.getByRole('link', { name: 'Back to projects' }).click();
  await expect(page.locator('main a[href^="/projects/"]')).toHaveCount(14);
});

test('both themes persist and mobile menu supports Escape', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('button', { name: 'Toggle menu' }).click();
    await expect(page.getByRole('dialog', { name: 'Main navigation' })).toBeVisible();
  }
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  if (isMobile) {
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Toggle menu' })).toHaveAttribute('aria-expanded', 'false');
  }
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  if (isMobile) await page.getByRole('button', { name: 'Toggle menu' }).click();
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});

test('service disclosures support keyboard and retain expanded content', async ({ page }) => {
  await page.goto('/services');
  const summary = page.locator('#service-01 summary');
  await summary.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#service-01 details')).toHaveAttribute('open', '');
  await expect(page.getByText(/We guide projects through every phase/)).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('#service-01 details')).not.toHaveAttribute('open');
});

test('reduced motion stops autoplay while manual carousel controls still work', async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const carousel = page.getByLabel('Featured architecture projects');
  await expect(page.getByRole('button', { name: 'Automatic motion off' })).toBeDisabled();
  await carousel.scrollIntoViewIfNeeded();
  const before = await carousel.evaluate(element => element.scrollLeft);
  await page.waitForTimeout(1000);
  expect(await carousel.evaluate(element => element.scrollLeft)).toBe(before);
  if (!isMobile) {
    await carousel.evaluate(element => { element.scrollLeft = 0; });
    await page.getByRole('button', { name: 'Previous projects' }).click();
    await expect.poll(() => carousel.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
    const previousPosition = await carousel.evaluate(element => element.scrollLeft);
    await page.getByRole('button', { name: 'Next projects' }).click();
    await expect.poll(() => carousel.evaluate(element => element.scrollLeft)).not.toBe(previousPosition);
  }
});

test('enquiry feedback preserves data on failure and confirms mocked success', async ({ page }) => {
  await page.route('**/api/contact', route => route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Please try again later.' }) }));
  await page.goto('/contact');
  await page.getByLabel('Full name').fill('Website test');
  await page.getByLabel('Phone Number').fill('9999999999');
  await page.getByLabel('Service interested in').selectOption('Interior Design');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();
  await expect(page.locator('#contact-status')).toContainText('Please try again later.');
  await expect(page.getByLabel('Full name')).toHaveValue('Website test');
  await page.route('**/api/contact', route => {
    expect(route.request().postDataJSON().service).toBe('Interior Design');
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
  });
  await page.getByRole('button', { name: 'Submit', exact: true }).click();
  await expect(page.locator('#contact-status')).toContainText('sent successfully');
  await expect(page.getByLabel('Full name')).toHaveValue('');
});

test('invalid enquiries are rejected before mail delivery and unknown projects are 404', async ({ request }) => {
  for (const data of [{}, { fullName: 12, phone: [] }, { fullName: 'test', phone: 'invalid' }, { fullName: 'test', phone: '9999999999', website: 'spam' }]) {
    expect((await request.post('/api/contact', { data })).status()).toBe(400);
  }
  expect((await request.get('/projects/nonexistent-project-test')).status()).toBe(404);
});

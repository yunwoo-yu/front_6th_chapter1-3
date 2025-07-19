/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Page } from "@playwright/test";

declare global {
  interface Window {
    __spyCalls: any[];
    __spyCallsClear: () => void;
  }
}

export async function clearSpyCalls(page: Page) {
  return await page.evaluate(() => window.__spyCallsClear());
}

export async function getSpyCalls(page: Page) {
  return await page.evaluate(() => window.__spyCalls || []);
}

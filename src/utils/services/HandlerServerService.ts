import acceptLanguageParser from "accept-language-parser";
import type { NextApiRequest } from "next";

export function resolveLocale(request: NextApiRequest) {
  const locales = ["en", "es"];
  const defaultLocale = "en";
  const locale =
    acceptLanguageParser.pick(
      locales,
      request.headers["accept-language"] || defaultLocale,
    ) || defaultLocale;

  return locale;
}

export async function getMessages(locale: string) {
  return (await import(`../../../messages/${locale}.json`)).default;
}
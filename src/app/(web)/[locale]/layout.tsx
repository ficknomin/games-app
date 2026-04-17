import type { Metadata } from "next";
import { Provider } from "@/config/providers/query-provider.component";
import { SyncProvider } from "@/config/providers/sync-provider.component";
import { routing } from "@/pkg/locale";
import { FC, ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "@/app/entities/session";
import { Toaster } from "sonner";
import { notFound } from "next/navigation";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

// interface
interface IProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// static params
export const generateStaticParams = async () => {
  return routing.locales.map((locale) => ({ locale }));
};

// metadata
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t("appName");
  const description = t("appDescription");

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    applicationName: title,
    openGraph: {
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      description: description,
      siteName: title,
      type: "website",
    },
  };
};

// component
const LocaleLayout: FC<Readonly<IProps>> = async (props: IProps) => {
  const { children, params } = props;

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  // return
  return (
    <>
      <Provider>
        <NextIntlClientProvider messages={messages}>
          <SessionProvider>
            <SyncProvider>{children}</SyncProvider>
          </SessionProvider>
        </NextIntlClientProvider>
        <Toaster position="top-center" duration={3000} />
      </Provider>
    </>
  );
};

export default LocaleLayout;

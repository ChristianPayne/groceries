import { NotificationsProvider } from '@mantine/notifications';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, InstantSearchSSRProvider } from 'react-instantsearch-hooks-web';
import styles from './tailwind.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Groceries',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];
const searchClient = algoliasearch('EVWHUW5CNY', 'd204eab05532d2b011a51e29a73cb692');

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-neutral-800 text-white p-4">
        <NotificationsProvider color="cyan">
          <InstantSearchSSRProvider>
            <InstantSearch searchClient={searchClient} indexName="groceries">
              <Outlet />
            </InstantSearch>
          </InstantSearchSSRProvider>
        </NotificationsProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

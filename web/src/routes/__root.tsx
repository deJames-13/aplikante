import type React from 'react';
import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import appCss from '../styles.css?url';
import { AppProviders } from '../shared/providers/app-providers';
import { CarbonHeader, CarbonFooter } from '../shared/layout';
import { CarbonToastContainer } from '../shared/ui';
import { QuickTrackDrawer, JobDetailModal } from '../features/applications';
import { NotificationCenter } from '../features/reminders';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Aplikante - Enterprise Job Application Tracker',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#f4f4f4] text-[#161616] font-['IBM_Plex_Sans',sans-serif] antialiased selection:bg-[#0f62fe] selection:text-white">
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AppProviders>
      <div className="min-h-screen bg-[#f4f4f4] text-[#161616] flex flex-col font-['IBM_Plex_Sans'] selection:bg-[#0f62fe] selection:text-white">
        {/* Global Carbon Header */}
        <CarbonHeader />

        {/* Route Outlet */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6" id="main-content">
          <Outlet />
        </main>

        {/* Global Carbon Footer */}
        <CarbonFooter />

        {/* Persistent Drawers & Modals */}
        <QuickTrackDrawer />
        <NotificationCenter />
        <JobDetailModal />
        <CarbonToastContainer />
      </div>
    </AppProviders>
  );
}

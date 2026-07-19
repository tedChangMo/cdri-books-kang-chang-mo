'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, App } from 'antd';
import { fetchInterceptor } from '@/shared/utils/fetchInterceptor';

if (typeof window !== 'undefined') {
  fetchInterceptor();
}

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <AntdRegistry>
      <StyleProvider hashPriority="high">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1677ff',
              borderRadius: 6,
              fontFamily: '"Font-Sans", -apple-system, sans-serif',
            },
            components: {
              Drawer: {
                boxShadow: 'none',
                boxShadowSecondary: 'none',
              },
              Input: {
                colorTextPlaceholder: '#8d94a0',
              },
            },
          }}
        >
          <App>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </App>
        </ConfigProvider>
      </StyleProvider>
    </AntdRegistry>
  );
};

export default MainProvider;

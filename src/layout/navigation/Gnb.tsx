'use client';

import { useState } from 'react';
import { Drawer, Button } from 'antd';
import Link from 'next/link';
import { MenuOutlined } from '@ant-design/icons';
import { Font } from '@/components/Font';
import { usePathname } from 'next/navigation';

export const Gnb = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/', label: '도서 검색' },
    { path: '/likes', label: '내가 찜한 책' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-background px-6 py-4 md:px-16 lg:grid lg:grid-cols-3 lg:px-40 lg:py-6">
      <div className="lg:justify-self-start">
        <Link href="/" className="no-underline">
          <Font size="2xl" weight="bold" className="pb-2 select-none">
            CERTICOS BOOKS
          </Font>
        </Link>
      </div>

      <nav className="hidden lg:col-start-2 lg:flex lg:items-center lg:gap-16 lg:justify-self-center">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex h-8 items-start border-b no-underline ${isActive ? 'border-b-active' : 'border-transparent'} `}
            >
              <Font size="xl" className="leading-8! whitespace-nowrap">
                {item.label}
              </Font>
            </Link>
          );
        })}
      </nav>

      {/* 모바일/태블릿 우측 영역: 햄버거 버튼 (lg 이상 화면에서는 숨김) */}
      <div className="flex items-center lg:hidden">
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: '20px' }} />}
          onClick={toggleMobileMenu}
          className="flex items-center justify-center p-2"
        />
      </div>

      {/* 모바일 전용 드로워(Drawer) 메뉴 */}
      <Drawer
        placement="right"
        closable={false}
        onClose={toggleMobileMenu}
        open={isMobileMenuOpen}
        size="40%"
        styles={{
          body: {
            padding: 16,
          },
        }}
        motion={{}}
      >
        <div className="flex flex-col gap-6">
          {menuItems?.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="no-underline"
                onClick={toggleMobileMenu}
              >
                <Font
                  weight={isActive ? 'bold' : 'medium'}
                  className="block py-2"
                >
                  {item.label}
                </Font>
              </Link>
            );
          })}
        </div>
      </Drawer>
    </header>
  );
};

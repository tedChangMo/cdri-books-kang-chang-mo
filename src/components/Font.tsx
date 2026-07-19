import React from 'react';

// 1. 컴포넌트가 받을 옵션(Props) 정의
interface FontProps {
  children: React.ReactNode;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'; // 생성할 HTML 태그 종류
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'; // 글자 크기
  weight?: 'normal' | 'medium' | 'bold' | 'black'; // 폰트 두께 (400, 500, 700, 900 매칭)
  tracking?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';
  color?: string;
  className?: string;
}

export const Font = ({
  children,
  size = 'base',
  weight = 'medium',
  tracking = 'normal',
  color = 'text-main',
  className = '',
}: FontProps) => {
  const sizeClass = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  }[size];

  const weightClass = {
    normal: 'font-normal', // 400
    medium: 'font-medium', // 500
    bold: 'font-bold', // 700
    black: 'font-black', // 900
  }[weight];

  const trackingClass = {
    tighter: 'tracking-tighter',
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
  }[tracking];

  return (
    <span
      className={`m-0 inline-block p-0 leading-none antialiased ${sizeClass} ${weightClass} ${trackingClass} ${color} ${className}`}
    >
      {children}
    </span>
  );
};

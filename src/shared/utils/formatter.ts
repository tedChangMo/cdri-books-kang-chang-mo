export const formatWon = (
  value: number | string | null | undefined,
): string => {
  if (value === null || value === undefined || value === '') return '0';

  const num = typeof value === 'string' ? Number(value) : value;
  if (isNaN(num)) return '0';

  return new Intl.NumberFormat('ko-KR').format(num);
};

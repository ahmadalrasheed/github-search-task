export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

export interface LanguagePercentage {
  name: string;
  bytes: number;
  percentage: number;
}

export const calculateLanguagePercentages = (
  languages: Record<string, number>
): LanguagePercentage[] => {
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  
  return Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: (bytes / totalBytes) * 100,
    }))
    .sort((a, b) => b.bytes - a.bytes);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
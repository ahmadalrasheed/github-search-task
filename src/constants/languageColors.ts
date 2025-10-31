export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: 'bg-yellow-100 text-yellow-800',
  TypeScript: 'bg-blue-100 text-blue-800',
  Python: 'bg-green-100 text-green-800',
  Java: 'bg-orange-100 text-orange-800',
  'C++': 'bg-purple-100 text-purple-800',
  'C#': 'bg-indigo-100 text-indigo-800',
  Go: 'bg-cyan-100 text-cyan-800',
  Rust: 'bg-red-100 text-red-800',
  PHP: 'bg-pink-100 text-pink-800',
  Ruby: 'bg-red-100 text-red-800',
  Swift: 'bg-orange-100 text-orange-800',
  Kotlin: 'bg-purple-100 text-purple-800',
  HTML: 'bg-orange-100 text-orange-800',
  CSS: 'bg-blue-100 text-blue-800',
  Shell: 'bg-gray-100 text-gray-800',
  Dockerfile: 'bg-blue-100 text-blue-800',
  Vue: 'bg-green-100 text-green-800',
  React: 'bg-blue-100 text-blue-800',
  Angular: 'bg-red-100 text-red-800',
  Svelte: 'bg-orange-100 text-orange-800',
  Smali: 'bg-gray-100 text-gray-800',
  C: 'bg-blue-100 text-blue-800',
  R: 'bg-indigo-100 text-indigo-800',
  SCSS: 'bg-pink-100 text-pink-800',
  Dart: 'bg-blue-100 text-blue-800',
  Lua: 'bg-blue-100 text-blue-800',
  Perl: 'bg-blue-100 text-blue-800',
  Scala: 'bg-red-100 text-red-800',
};

export const getLanguageColor = (language: string): string => {
  return LANGUAGE_COLORS[language] || 'bg-gray-100 text-gray-800';
};
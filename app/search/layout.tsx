import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '搜索 - 六木先生',
  description: '搜索工具和文章内容',
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

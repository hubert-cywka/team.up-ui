import { PropsWithChildren } from 'react';

const PageContainer = ({ children }: PropsWithChildren) => {
  return <div className="p-12 bg-gray-900 rounded-3xl box-border h-full">{children}</div>;
};

export default PageContainer;

import React from 'react'
import { Loader2Icon } from 'lucide-react'

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2Icon className="size-16 text-blue-500 animate-spin" />
    </div>
  );
}

export default PageLoader

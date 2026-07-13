import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Play } from '@phosphor-icons/react/dist/ssr';

export default function StressTest() {
  let _locale = 'de' as string;
  return (
    <div className="p-8 flex flex-col gap-8">
      \n <Button>Click</Button>
      <Icon icon={Play} />
    </div>
  );
}

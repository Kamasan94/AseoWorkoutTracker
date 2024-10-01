//import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      { <Image 
        width={50}
        height={50}
        src='/logo.png' 
        alt='Aséo logo'
      /> }
      <p className="text-[44px]">Aséo tracker</p>
    </div>
  );
}

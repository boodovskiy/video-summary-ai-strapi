import { MountainIcon } from 'lucide-react'
import Link from 'next/link'

interface LogoProps {
    text?: string;
    dark?: boolean;
}

const Logo = ({
    text = "Logo Text",
    dark = false,
}: Readonly<LogoProps>) => {
  return (
    <Link className="flex items-center gap-2" href="/">
        <MountainIcon className='h-6 w-6 text-pink-500' />
        <span className={`text-lg font-semibold ${dark ? "text-white" : "text-slate-900"}`}>
            {text}
        </span>
    </Link>
  )
}

export default Logo
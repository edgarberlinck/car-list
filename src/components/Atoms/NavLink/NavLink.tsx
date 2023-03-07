import { Link as VCCLink } from "vcc-ui"
import Link from 'next/link'
import { ReactNode } from "react"

type NavLinkPropType = {
  href: string
  children: ReactNode
}

const NavLink: React.FC<NavLinkPropType> = ({ href, children }) => (
  <VCCLink arrow="right">
    <Link href={href}>{ children }</Link>
  </VCCLink>
)

export default NavLink


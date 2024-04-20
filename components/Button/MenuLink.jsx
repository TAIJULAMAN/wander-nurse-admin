import { forwardRef } from "react";
import Link from "next/link";

const MenuLink = forwardRef((props, ref) => {
  let { href, className, children, ...rest } = props;
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      prefetch={false}
      className={className ? className : ""}
      ref={ref}
      {...rest}
    >
      {children}
    </Link>
  );
});

MenuLink.displayName = "MenuLink";

export default MenuLink;

import React from "react";
import Link from "next/link";

export default function DesktopNavLink(props) {
  return (
    <Link prefetch href={props.href}>
      <a className="nav-link d-none d-sm-block">
        <i className={props.className} /> {props.value}
      </a>
    </Link>
  );
}

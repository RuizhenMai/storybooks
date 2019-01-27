import React from "react";
import Link from "next/link";

export default function MobileNavlink(props) {
  return (
    <Link prefetch href={props.href}>
      <button
        className="btn btn-link nav-link p-0 border-0 d-sm-none"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-expanded="false"
        aria-controls="navbarNav"
      >
        <a className="nav-link">
          <i className={props.className} /> {props.value}
        </a>
      </button>
    </Link>
  );
}

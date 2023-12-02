"use client";
import { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import Icon from "../../public/washing-machine.png";

type LinkItem = {
  text: string;
  href: string;
  icon: JSX.Element;
};

type Props = {
  items: LinkItem[];
};

function NavList({ items }: Props) {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {items.map((element, index) => {
        return (
          <div key={index}>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              <Link
                href={element.href}
                className="flex items-center hover:text-blue-500 transition-colors"
              >
                {element.icon}
                <span className="ml-2">{element.text}</span>
              </Link>
            </Typography>
          </div>
        );
      })}
    </ul>
  );
}

export default function NavbarSimple({ items }: Props) {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar color="transparent" className="mx-auto px-6 py-3 rounded-none mb-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link href="/" className="mr-4 cursor-pointer py-1.5 flex items-center">
          <Image
            src={Icon}
            alt="my gif"
            height={20}
            width={40}
            className="mr-2"
          />
          Laundry Service
        </Link>
        <div className="hidden lg:block">
          <NavList items={items} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList items={items} />
      </Collapse>
    </Navbar>
  );
}

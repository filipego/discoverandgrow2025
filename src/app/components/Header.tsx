import Link from 'next/link'
import React from 'react'
import { ButtonLink } from './ButtonLink'
import { Bounded } from './Bounded'
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { LongLogo } from "./LongLogo";

type Props = {}

export async function Header({ }: Props) {

    const client = createClient();
    const settings = await client.getSingle("settings");

    return (
        <Bounded as="header">
            <div className="flex w-full items-center justify-between gap-6">
                <div className="">
                    <Link href="/">
                        <LongLogo treeColor="#5A3E36" className='text-[#29285D] h-[70]' />
                    </Link>
                </div>
                <nav aria-label="Main"
                    className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
                    <ul className="flex flex-wrap items-center justify-center gap-8">
                        {settings.data.navigation.map((item, index) => (
                            <li key={index}>
                                {item.link.link_type === "Document" ? (
                                    <Link
                                        href={`/${item.link.uid}`}
                                        className=""
                                    >
                                        {item.link.text}
                                    </Link>
                                ) : (
                                    <PrismicNextLink
                                        field={item.link}
                                        className=""
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
                <ButtonLink href="/">
                    Donate
                </ButtonLink>
            </div>
        </Bounded>
    )
}
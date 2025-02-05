import Link from 'next/link'
import React from 'react'
import { ButtonLink } from './ButtonLink'
import { Bounded } from './Bounded'
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

type Props = {}

export async function Header({ }: Props) {

    const client = createClient();
    const settings = await client.getSingle("settings");
    
    console.log('Navigation items:', settings.data.navigation);
    
    return (
        <Bounded as="header">
            <div className="flex w-full items-center justify-between gap-6">
                <div className="">
                    <Link href="/">
                        Logo
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
                                        className="~text-lg/xl"
                                    >
                                        {item.link.text}
                                    </Link>
                                ) : (
                                    <PrismicNextLink
                                        field={item.link}
                                        className="~text-lg/xl"
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
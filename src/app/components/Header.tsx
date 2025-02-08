import Link from 'next/link'
import React from 'react'
import { ButtonLink } from './ButtonLink'
import { Bounded } from './Bounded'
import { createClient } from "@/prismicio";
import { LongLogo } from "./LongLogo";
import { SmartPrismicLink } from "./SmartPrismicLink";

type Props = {}

export async function Header({ }: Props) {

    const client = createClient();
    const settings = await client.getSingle("settings");

    return (
        <Bounded as="header">
            <div className="flex w-full items-center justify-between gap-6">
                <div className="">
                    <Link href="/">
                        <LongLogo treeColor="#29285D" className='text-[#29285D] h-[70]' />
                    </Link>
                </div>
                <nav aria-label="Main"
                    className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
                    <ul className="flex flex-wrap items-center justify-center gap-8">
                        {settings.data.navigation.map((item, index) => (
                            <li key={index}>
                                <SmartPrismicLink link={item.link}>
                                    {item.link.text}
                                </SmartPrismicLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <ButtonLink
                    field={settings.data.button}
                >
                    {settings.data.button.text}

                </ButtonLink>
            </div>
        </Bounded>
    )
}
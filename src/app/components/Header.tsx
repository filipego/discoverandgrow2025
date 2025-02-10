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
            <div className="grid grid-cols-[230px_1fr_230px] w-full items-center">
                <div className="flex-shrink-0">
                    <Link href="/">
                        <LongLogo treeColor="#29285D" className='text-[#29285D] h-[60]' />
                    </Link>
                </div>
                <nav aria-label="Main" className="grid place-items-center w-full">
                    <ul className="flex items-center gap-8">
                        {settings.data.navigation.map((item, index) => (
                            <li key={index}>
                                <SmartPrismicLink link={item.link}>
                                    {item.link.text}
                                </SmartPrismicLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex justify-end">
                    <ButtonLink
                        field={settings.data.button}
                        color="Secondary"
                    >
                        {settings.data.button.text}
                    </ButtonLink>
                </div>
            </div>
        </Bounded>
    );
}
import React from 'react'
import { Bounded } from './Bounded'
import { LongLogo } from './LongLogo'

type Props = {}

function Footer({ }: Props) {
    return (
        <div className="relative mt-30">
            <div
                className="w-full h-24 md:h-40 bg-no-repeat bg-cover bg-top"
                style={{ backgroundImage: 'url(/images/ellipse.png)' }}
            />

            <Bounded className='!pt-0 pb-30 bg-[#29285D] text-white'>
                <div>
                    <div>
                        <LongLogo treeColor='white' className='h-[60]' />
                        <div>
                            <p className='text-xs mt-8 max-w-xs leading-5'>
                                Our programs combine a safe and collaborative environment with enriching and engaging activities that provide the skills, knowledge, and mindset to help kids succeed in life while also learning to be positive members of society.
                            </p>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </Bounded>

        </div>
    )
}

export default Footer
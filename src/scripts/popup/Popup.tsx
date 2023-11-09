import { useSession } from '@/hooks/useSession'
import React from 'react'

const Popup = () => {
    // const session = useSession()

    return (
        <div className="inline-flex flex-col justify-between p-8 border shadow w-96 h-full bg-tutupink border-zinc-800 overflow-hidden">
            <div className="grid grid-cols-[2fr,1fr] items-center justify-center gap-4">
                <div className="inline-flex flex-col items-start justify-between gap-4 p-4 h-full backdrop-blur-md bg-black/60 rounded-3xl">
                    <div>
                        <div className="text-lg font-bold leading-none text-neutral-50">
                            Tutu Monster
                        </div>
                        <div className="justify-start items-start inline-flex">
                            <div className="text-sm font-normal leading-tight text-zinc-400">
                                Personal web companion for everything Near related
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex items-start justify-start gap-4">
                        <div className="text-sm font-normal leading-tight text-zinc-400 pb-1">
                            Built for{' '}
                            <a className="text-oceanBlue-300" href="https://nearcon.app/">
                                Nearcon 2023
                            </a>
                        </div>
                    </div>
                </div>

                <div className="w-32 h-32 flex">
                    <img
                        src="https://media.discordapp.net/attachments/740663951389360239/1171932869250257026/tutumon-removebg.png?ex=655e7a89&is=654c0589&hm=09800e7bdfc906d5c591144175b72204cbd967ec60f23b5583d2b3bbd5df6de3&=&width=1000&height=1000"
                        alt="Tutu Monster Logo"
                        className=" "
                    />
                </div>
            </div>
        </div>
    )
}

export default Popup

import { useUser } from '@/hooks/useUser'
import React, { useState } from 'react'
import { Avatar } from './ui/avatar'
import { IconClose } from './ui/icons'
import { useSession } from '@/hooks/useSession'

const HighlightableText = ({
    highlightedText,
    tooltipContent,
    tooltipPosition,
    loading,
    setHighlightedText,
    setTooltipContent
}: {
    highlightedText: string
    tooltipContent: string
    tooltipPosition: { top: number; left: number }
    loading: boolean
    setHighlightedText: React.Dispatch<React.SetStateAction<string>>
    setTooltipContent: React.Dispatch<React.SetStateAction<string>>
}) => {
    const { user } = useUser()
    const { session } = useSession()

    return (
        <div className="">
            {loading ? (
                <div
                    className="absolute bg-[#242424] border border-white/30  rounded-lg shadow-md p-6 z-50 backdrop-blur-[128px] text-[#ddd] max-w-xl min-w-[120px] text-xl  mt-2"
                    style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
                >
                    <div className="grid grid-flow-col gap-4 items-center justify-center relative">
                        <button
                            className="absolute top-0 right-0 fill-white/30 -m-[12px]"
                            onClick={() => {
                                setHighlightedText('')
                                setTooltipContent('')
                            }}
                        >
                            <IconClose />
                        </button>
                        <div className="inline-flex items-start justify-center rounded-full w-16 h-16 overflow-hidden">
                            <img
                                src={
                                    session?.picture ||
                                    'https://media.discordapp.net/attachments/740663951389360239/1171932869250257026/tutumon-removebg.png?ex=655e7a89&is=654c0589&hm=09800e7bdfc906d5c591144175b72204cbd967ec60f23b5583d2b3bbd5df6de3&=&width=1000&height=1000'
                                }
                                alt="Logo"
                                className={`w-16 h-16 object-contain ${
                                    user?.imgConfig?.mirror
                                        ? 'transform -scale-x-100'
                                        : 'transform scale-x-100'
                                }`}
                            />
                        </div>
                        <div className="relative h-4 ml-4 w-6">
                            <div className="dot-flashing-highlight mt-1" />
                        </div>
                    </div>
                </div>
            ) : (
                highlightedText && (
                    <div
                        className="absolute bg-[#242424] border border-white/30  rounded-lg shadow-md p-6 z-50 backdrop-blur-[128px] min-w-[120px] text-[#ddd] max-w-xl text-xl  mt-2"
                        style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
                    >
                        <div className="relative grid grid-flow-col gap-4 items-center justify-cente">
                            <button
                                className="absolute top-0 right-0 fill-white/30 -m-[12px]"
                                onClick={() => {
                                    setHighlightedText('')
                                    setTooltipContent('')
                                }}
                            >
                                <IconClose
                                    onClick={() => {
                                        setHighlightedText('')
                                        setTooltipContent('')
                                    }}
                                />
                            </button>
                            <div className="flex h-full items-start justify-center">
                                <div className="inline-flex place-items-start rounded-full w-16 h-16 overflow-hidden">
                                    <img
                                        src={
                                            user?.image ||
                                            'https://media.discordapp.net/attachments/740663951389360239/1171932869250257026/tutumon-removebg.png?ex=655e7a89&is=654c0589&hm=09800e7bdfc906d5c591144175b72204cbd967ec60f23b5583d2b3bbd5df6de3&=&width=1000&height=1000'
                                        }
                                        alt="Logo"
                                        className={`w-16 h-16 object-contain ${
                                            user?.imgConfig?.mirror
                                                ? 'transform -scale-x-100'
                                                : 'transform scale-x-100'
                                        }`}
                                    />
                                </div>
                            </div>

                            <p>{tooltipContent}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default HighlightableText

import axios from 'axios'

import { useState, useEffect, useCallback } from 'react'

export type ImgConfig = {
    mirror: boolean
}

export type User = {
    createdDate: string
    email: string | null
    emailVerified: string | null
    id: string
    image: string
    imgConfig: ImgConfig
    name: string | null
    updatedDate: string
}

export type Session = {
    picture: string
    email: string | null
    name: string
    expires: string
    user: {
        createdDate: string
        dbUser: User
        email: string | null
        emailVerified: string | null
        id: string
        image: string
        imgConfig: ImgConfig
        name: string
    }
}

export const useSession = () => {
    const [session, setSession] = useState<Session>(null)

    const fetchSession = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/login/session')
            const fetchedSession = await res.data

            console.log('fetched session', fetchedSession)

            if (!fetchedSession) return

            chrome.storage.sync.set({ session: fetchedSession }, () => {
                setSession(fetchedSession)
            })

            return fetchedSession
        } catch (e) {
            return null
            console.log(e)
        }
    }

    useEffect(() => {
        // const allowedDomain = 'tutu-monster.vercel.app/' // Substitua pelo domínio desejado
        // const allowedDomain = 'localhost'

        // Get session from Chrome storage first
        chrome.storage.sync.get(['session'], async result => {
            if (result.session) {
                setSession(result.session)
            } else {
                // If no session in storage, fetch from API
                await fetchSession()
            }
        })

        // if (window.location.hostname === allowedDomain) {
        fetchSession()

        const intervalId = setInterval(() => {
            fetchSession()
        }, 1000 * 60)

        chrome.storage.onChanged.addListener((changes, areaName) => {
            if (areaName === 'sync' && changes.session) {
                setSession(changes.session.newValue)
            }
        })

        return () => clearInterval(intervalId)
        // }
    }, [])

    return { session }
}

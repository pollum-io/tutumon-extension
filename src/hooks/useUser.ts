import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSession } from './useSession'

export const useUser = () => {
    const [user, setUser] = useState(null)
    const { session } = useSession()

    const fetchUser = async publickey => {
        const res = await axios.get(
            `http://localhost:3000/api/user?publickey=${session.user.email}`
        )
        const userData = await res.data

        // Set user in Chrome Storage
        try {
            chrome.storage.sync.set({ user: userData }, () => {})
            setUser(userData)
        } catch (e) {
            console.error("Couldn't set user in Chrome Storage:", e)
        }
    }

    useEffect(() => {
        // Check if we are in the allowed domain
        const allowedDomain = 'tutu-monster.vercel.app/'

        // const allowedDomain = 'localhost'
        try {
            if (window.location.hostname !== allowedDomain) {
                chrome.storage.sync.get(['user'], result => {
                    if (result.user) {
                        setUser(result.user)
                    }
                })
            } else {
                chrome.storage.sync.get(['session'], async result => {
                    if (result.session) {
                        await fetchUser(result.session.user.name)
                    }
                })
            }
        } catch (e) {
            console.error("Couldn't get user from Chrome Storage:", e)
        }
    }, [])

    return { user }
}

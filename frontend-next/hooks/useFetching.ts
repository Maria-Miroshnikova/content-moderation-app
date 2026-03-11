import { useState } from "react"

// TODO: типизация
export const useFetching = (callback) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const fetching = async(...args) => {
        try {
            setIsLoading(true)
            await callback(...args)
        }
        catch (e) {
            setError(e.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]

}
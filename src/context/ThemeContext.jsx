import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('teal')

    useEffect(() => {
        const savedTheme = localStorage.getItem('app-theme')
        if (savedTheme) {
            setTheme(savedTheme)
        }
    }, [])

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === 'teal' ? 'bw' : 'teal'
            localStorage.setItem('app-theme', newTheme)
            return newTheme
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}

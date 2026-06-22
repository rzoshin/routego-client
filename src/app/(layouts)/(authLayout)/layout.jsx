export default function AuthLayout({ children }) {
    return (
        <div className="auth-wrapper">
            <main>
            {children}
            </main>
        </div>
    )
}
const PageNotFound = () => {
    return (
        <>
            <div className="not-found">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for doesn't exist or has been moved.</p>
                <a href="/list" className="home-link">Go to Homepage</a>
            </div>
        </>
    )
}

export default PageNotFound;
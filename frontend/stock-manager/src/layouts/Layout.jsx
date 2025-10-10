import React from "react"

export default function Layout(props) {
    console.log(props)
    const { children } = props

    return (
        <>
            <header>
                <h1 className="welcome-page-title"> <i className="fa-solid fa-building-columns"></i> Lloyds bank Mortgage Calculator</h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <small>Created by </small>
                <a target="_blank" href="https://github.com/IsaacRid">
                    <img alt="pfp" src="https://avatars.githubusercontent.com/u/196744476?v=4"></img>
                    <p>@IsaacRid</p>
                    <i className="fa-brands fa-github"></i>
                </a>
            </footer>
        </>
    )
}
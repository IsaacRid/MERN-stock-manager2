import "../index.css"

export default function Navbar(props) {

    const { setCurrentPage } = props

    return (
        <nav className="navbar">
            <button onClick={() => { setCurrentPage("dashboard") }}>Dashboard</button>
            <button onClick={() => { setCurrentPage("products") }}>Products</button>
            <button onClick={() => { setCurrentPage("orders") }}>Orders</button>
        </nav>
    )
}
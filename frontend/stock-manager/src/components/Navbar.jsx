export default function Navbar(props) {

    const { setCurrentPage } = props

    return (
        <nav>
            <button onClick={() => { setCurrentPage("dashboard") }}>Dashboard</button>
            <button onClick={() => { setCurrentPage("products") }}>Products</button>
            <button onClick={() => { setCurrentPage("orders") }}>Orders</button>
        </nav>
    )
}
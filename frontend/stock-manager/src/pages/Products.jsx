import Navbar from "../components/Navbar"

export default function Products(props) {
    const { setCurrentPage } = props
    return (
        <>
            <Navbar setCurrentPage={setCurrentPage}></Navbar>
            <p>Products</p>
        </>
    )
}
import Navbar from "../components/Navbar"

export default function Orders(props) {
    const { setCurrentPage } = props
    return (
        <>
            <Navbar setCurrentPage={setCurrentPage}></Navbar>
            <p>Orders</p>
        </>
    )
}
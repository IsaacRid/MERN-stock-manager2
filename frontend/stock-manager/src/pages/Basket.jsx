import Navbar from "../components/Navbar"

export default function Basket(props) {
    const { setCurrentPage } = props
    return (
        <>
            <Navbar setCurrentPage={setCurrentPage}></Navbar>
            <p>basket</p>
        </>
    )
}
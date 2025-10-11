import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"

export default function Products(props) {
    const { setCurrentPage } = props
    return (
        <>
            <Navbar setCurrentPage={setCurrentPage}></Navbar>
            <div className="products-grid">
                <ProductCard productImage="https://cdn.4imprint.co.uk/prod/extras/303119/90230/700/1.jpg" productTitle="pen" productDescription="A simple byro pen" stock={15}></ProductCard>
                <ProductCard productImage="https://cdn.4imprint.co.uk/prod/extras/303119/90230/700/1.jpg" productTitle="pen" productDescription="A simple byro pen" stock={19}></ProductCard>
                <ProductCard productImage="https://cdn.4imprint.co.uk/prod/extras/303119/90230/700/1.jpg" productTitle="pen" productDescription="A simple byro pen" stock={27}></ProductCard>
            </div>
        </>
    )
}
import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <nav className="flex cursor-pointer *:cursor-pointer items-center mb-20 gap-10 text-2xl flex-wrap bg-teal-500 p-7 rounded-lg">
            <NavLink to={'/'} >
                home
            </NavLink>
            <NavLink to={'/products'} >
                products
            </NavLink>
            <NavLink to={'/category'} >
                category
            </NavLink>
        </nav>
    )
}

export default Navbar
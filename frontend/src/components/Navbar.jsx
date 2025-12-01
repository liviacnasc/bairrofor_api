import { NavLink } from "react-router";

export default function Navbar(toggleId) {
    return (
        <nav className="navbar bg-base-200 shadow-sm flex h-16 w-full">
            <div className="flex-1">
                Bairrofor
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/">Iniciar Comparador</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
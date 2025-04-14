import { useState } from "react";
import "./AppHeader.css";
import { usePathname, useRouter } from "next/navigation";


export default function AppHeader() {
    const router = useRouter();
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    const isCompaniesPage = pathname === "/companies";

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <header className="header">
            <nav className="navbar">
                <div className="navbar-left">
                    {/* <button
                            className={`menu-toggle ${menuOpen ? "open" : ""}`}
                            onClick={toggleMenu}
                            aria-label="Menu"
                        >
                            <span className="line top"></span>
                            <span className="line middle"></span>
                            <span className="line bottom"></span>
                        </button> */}
                    {dropdownVisible && (
                        <div className="dropdown-box">
                            <span onClick={() => router.push("/home")}>
                                Public and Private Database Platform
                            </span>
                            <span onClick={() => router.push("/home")}>Market Research</span>
                            <span onClick={() => router.push("/home")}>Virtual Data Room</span>
                            <span onClick={() => router.push("/home")}>Deal Monitoring</span>
                            <span onClick={() => router.push("/about")}>
                                M&A and Tax Advisory Services
                            </span>
                            <span onClick={() => router.push("/services")}>
                                AI-powered and Tailored Due Diligence
                            </span>
                            <span onClick={() => router.push("/contact")}>
                                AI-powered and Tailored Valuation
                            </span>
                        </div>
                    )}
                    <img
                        src={`/assets/Logo.png`}
                        alt="Logo"
                        className="logo"
                        width={350}
                        height={350}
                    />
                </div>
                <div className="navbar-center">
                    <div className="nav-links">
                        <span
                            className={`company-link ${isCompaniesPage ? "active" : ""}`}
                            onClick={() => router.push("/companies")}
                        >
                            Companies
                        </span>
                        <span className="other-link" onClick={() => router.push("/debt-investors")}>
                            Deals
                        </span>
                        <span className="other-link" onClick={() => router.push("/limited-partners")}>
                            Limited Partners
                        </span>
                        <span className="other-link" onClick={() => router.push("/support")}>
                            Products
                        </span>
                        <span className="other-link" onClick={() => router.push("/support")}>
                            Contact Us
                        </span>
                    </div>
                </div>
                <div className="navbar-right">
                    <span className="username">Sequoia</span>
                    <img
                        src={`/assets/sclogo.png`}
                        alt="Profile"
                        className="sclogo"
                        onClick={() => router.push("/profile")}
                    />
                </div>
            </nav>
            <nav className="second-navbar">
                <div className="navbar-left">
                    <h2 className="companies">Company Screening</h2>
                </div>
            </nav>
        </header>
    )
}
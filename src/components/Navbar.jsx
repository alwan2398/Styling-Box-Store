import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const links = [
    {name: 'Home', href: '/'},
    {name: 'T-Shrit', href: '/category/Kaos'},
    {name: 'Jacket', href: '/category/Jacket'},
    {name: 'Celana', href: '/category/Celana'},
    {name: 'Hodie', href: '/category/Hodie'},
    {name: 'Ziper', href: '/category/ZipHodie'},
    {name: 'Sepatu', href: '/category/Sepatu'},
];

const Navbar = () => {
    const { pathname } = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    const handleChat = () => {
            setIsLoading(true);
    const message = `Hallo Mas Aldi`;
    const waUrl = `https://wa.me/+6287772855652?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsLoading(false);
    }, 2000);
    }

    return (
        <header className="mb-8 border-b">
            <motion.div 
                whileInView={{ x: [300, 0] }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
                <Link to={'/'}>
                    <h1 className="text-2xl md:text-4xl font-bold">Styling <span className="text-primary">Box</span></h1>
                </Link>

                <nav className="hidden gap-12 lg:flex 2xl:ml-16">
                    {links.map((link, index) => (
                        <div key={index}>
                            {pathname === link.href ? (
                                <Link className="text-lg font-semibold text-primary" to={link.href}>
                                    {link.name}
                                </Link>
                            ) : (
                                <Link to={link.href} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary">
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="flex divide-x">
                    <Button onClick={handleChat}
                    disabled={isLoading}
                    className={`p-2 mt-2 mb-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isLoading ? 'Processing...' : 'Chat Saya'}
                    </Button>
                </div>
            </motion.div>
        </header>
    );
}

export default Navbar;

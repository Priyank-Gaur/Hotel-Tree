import React, {useEffect,useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useAppContext } from '../context/AppContext';

const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/hotels' },
        { name: 'Offers', path: '/' },
        
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {openSignIn} = useClerk();

    const location = useLocation();
    const {user, navigate, isOwner, setShowHotelReg} = useAppContext();

    useEffect(() => {

        if (location.pathname !== '/') {
            setIsScrolled(true);
            return; 
        }
        else {
            setIsScrolled(false);
        }
        setIsScrolled(prev => location.pathname !== '/' ? true : prev);


        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
            <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-300 z-50 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"}`}>

                {}
                <Link to='/'>
                    <img 
                        src={assets.logo} 
                        alt="logo" 
                        className={`h-10 transition-all duration-300 ${isScrolled ? "brightness-0 opacity-80" : "brightness-0 invert"}`} 
                    />
                </Link>

                {}
                <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                    {navLinks.map((link, i) => (
                        <Link 
                            key={i} 
                            to={link.path}
                            onClick={(e) => {
                                if (link.name === "Offers") {
                                    e.preventDefault();
                                    if (location.pathname !== '/') {
                                        navigate('/', { state: { scrollTo: 'exclusive-offers' } });
                                    } else {
                                        const element = document.getElementById('exclusive-offers');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }
                                }
                            }}
                            className={`px-3 py-1.5 rounded-full text-sm font-bold tracking-wide transition-all ${isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 shadow-sm"}`}
                        >
                            {link.name}
                        </Link>
                    ))}

                </div>

                {/* Right Side */}
                <div className="hidden md:flex items-center gap-6">
                    
                    {user ?
                    (<UserButton afterSignOutUrl="/" appearance={{
                        elements: {
                            userButtonAvatarBox: "w-10 h-10"
                        }
                    }}>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My Bookings' labelIcon={<BookIcon/>} onClick={()=>navigate('/my-bookings')} />
                        </UserButton.MenuItems>
                    </UserButton>) 
                    :
                    (<div className="flex items-center gap-4">
                        <button 
                            onClick={()=>openSignIn({forceRedirectUrl: '/owner'})}
                            className={`text-base font-medium hover:opacity-70 transition-opacity ${isScrolled ? "text-gray-800" : "text-white"}`}
                        >
                            Owner Login
                        </button>
                        <button 
                            onClick={()=>openSignIn({forceRedirectUrl: '/'})} 
                            className={`px-6 py-2 rounded-full text-base font-medium transition-all shadow-lg hover:shadow-xl ${isScrolled ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-blue-900 hover:bg-gray-100"}`}
                        >
                            Login
                        </button>
                    </div>)  
                     }
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    {user && <UserButton afterSignOutUrl="/" appearance={{
                        elements: {
                            userButtonAvatarBox: "w-10 h-10"
                        }
                    }}>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My Bookings' labelIcon={<BookIcon/>} onClick={()=>navigate('/my-bookings')} />
                        </UserButton.MenuItems>
                    </UserButton>}
                    
                    <button onClick={()=>setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                         <img 
                            src={assets.menuIcon} 
                            alt="menu" 
                            className={`w-6 h-6 transition-all ${isScrolled ? "opacity-80" : "invert"}`} 
                        />
                    </button>
                </div>

                {}
                 <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMenuOpen(false)} />

                {}
                <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 md:hidden flex flex-col p-6 gap-6 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-playfair text-xl font-bold text-gray-900">HotelTree</span>
                        <button onClick={() => setIsMenuOpen(false)}>
                            <img src={assets.closeIcon} alt="close" className="w-5 h-5 opacity-60 hover:opacity-100" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        {navLinks.map((link, i) => (
                            <Link 
                                key={i} 
                                to={link.path} 
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-600 font-medium hover:text-blue-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                   <div className="mt-auto flex flex-col gap-4">
                        {user && isOwner && <button 
                            className="w-full py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors" 
                            onClick={()=>navigate('/owner')}
                        >
                            Dashboard
                        </button>}

                        {!user && (
                            <>
                            <button 
                                onClick={()=>{
                                    openSignIn({forceRedirectUrl: '/owner'});
                                    setIsMenuOpen(false);
                                }} 
                                className="w-full py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Owner Login
                            </button>
                            <button 
                                onClick={()=>{
                                    openSignIn({forceRedirectUrl: '/'});
                                    setIsMenuOpen(false);
                                }} 
                                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors"
                            >
                                Login
                            </button>
                            </>
                        )}
                   </div>
                </div>
            </nav>
    );
}


export default Navbar;
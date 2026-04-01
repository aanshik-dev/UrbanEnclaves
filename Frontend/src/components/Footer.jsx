import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-xl">
              <Icon icon="icon-park-solid:building-two" />
            </div>
            <p className="text-xl md:text-2xl days-one whitespace-nowrap text-zinc-200">
              Urban Enclaves
            </p>
          </div>

          <p className="text-zinc-500 text-sm font-medium">
            © 2026 UrbanEncleaves. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm font-bold text-zinc-400">
            <Link to="/" className="hover:text-orange-500 transition-colors">
              Privacy
            </Link>
            <Link to="/" className="hover:text-orange-500 transition-colors">
              Terms
            </Link>
            <Link to="/" className="hover:text-orange-500 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

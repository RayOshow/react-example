import logo from "../../assets/coz_logo_192.png";

export default function Footer() {
  return (
    <footer className="bg-zinc-100 text-zinc-400 py-8">
      <div className="container mx-auto text-center flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="codestates_logo" className="w-10" />
            <p className="text-2xl text-black font-semibold">COZ SHOPPING</p>
          </div>
          <p>© {new Date().getFullYear()} Code States. All rights reserved.</p>
        </div>
        <div className="flex justify-center gap-12">
          <a href="https://codestates.com" className="hover:text-gray-500">
            Terms of Service
          </a>
          <a href="https://codestates.com" className="hover:text-gray-500">
            Privacy Policy
          </a>
          <a href="https://codestates.com" className="hover:text-gray-500">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

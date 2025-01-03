import logo from '../assets/logo.png';

export default function Header({ onClick }) {
  return (
    <div className="bg-[#008080] h-16 w-screen flex items-center justify-between px-4">
      <img src={logo} alt="SiteSync Logo" className="h-10" />
    </div>
  );
}
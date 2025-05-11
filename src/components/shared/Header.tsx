import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Nav from "./Nav";

export default function Header() {
  return (
    <header>
      <div className="container mx-auto px-4 md:px-0 flex justify-between items-center border-b py-4">
        <Logo />
        <Nav />
        <MobileMenu />
      </div>
    </header>
  );
}

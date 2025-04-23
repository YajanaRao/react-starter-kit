import { Card } from "@/components/ui/card";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            EchoAI
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Button } from "@/components/ui/button";

type HeaderProps = {
  title: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
};

const Header = ({ title, buttonText, buttonIcon }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between py-7">
      <h1 className="text-2xl font-bold text-[#D7DDE4]">{title}</h1>
      <Button size={"lg"} className="bg-[#1B7A07] text-white">
        {buttonIcon}
        {buttonText}
      </Button>
    </div>
  );
};

export default Header;

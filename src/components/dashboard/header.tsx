import { Button } from "@/components/ui/button";

type HeaderProps = {
  title: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
};

const Header = ({ title, buttonText, buttonIcon }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between py-7">
      <h1 className="text-2xl font-bold text-black">{title}</h1>
      <Button size={"lg"} className="bg-[#BBFA01] text-black">
        {buttonIcon}
        {buttonText}
      </Button>
    </div>
  );
};

export default Header;

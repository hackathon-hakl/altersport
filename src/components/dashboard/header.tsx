import { Button } from "@/components/ui/button";

type HeaderProps = {
  title: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
  onClick?: () => void;
};

const Header = ({ title, buttonText, buttonIcon, onClick }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between py-7">
      <h1 className="text-2xl font-bold text-black">{title}</h1>
      <Button
        size={"lg"}
        className="bg-[#BBFA01] text-black hover:bg-[#99cc00]"
        onClick={onClick}
      >
        {buttonIcon}
        {buttonText}
      </Button>
    </div>
  );
};

export default Header;

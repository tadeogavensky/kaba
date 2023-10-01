import Link from "next/link";
import { IconType } from "react-icons";

interface NavbarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const NabvarItem: React.FC<NavbarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      className={`flex flex-col items-center gap-2    ${
        active ? "text-primary  " : "text-black"
      }`}
      href={href}
    >
      <Icon size={25} />
      <p className="font-body text-xs font-bold"> {label}</p>
    </Link>
  );
};

export default NabvarItem;

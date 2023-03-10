import { IconType } from "react-icons";

export default function SettingsButton({
  Icon,
  text,
  onClick,
}: {
  Icon: IconType;
  text?: string;
  onClick: () => void;
}) {
  return (
    <button
      className="flex space-x-1.5 rounded-lg p-2 hover:bg-white hover:bg-opacity-25"
      onClick={onClick}
    >
      <Icon size={24} />
      {text && <p>{`${text}`}</p>}
    </button>
  );
}

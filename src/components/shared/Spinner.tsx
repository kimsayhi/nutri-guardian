import { ImSpinner2 } from "react-icons/im";

export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div>
      <ImSpinner2 className="animate-spin" size={size} />
    </div>
  );
}

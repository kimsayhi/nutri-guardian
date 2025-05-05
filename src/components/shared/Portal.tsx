import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  containerId?: string;
}

const Portal = ({ children, containerId = "portal-root" }: PortalProps) => {
  return createPortal(children, document.getElementById(containerId) || document.body);
};

export default Portal;

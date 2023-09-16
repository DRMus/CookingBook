import { Button, Tooltip } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { CSSProperties, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title?: string;
  size?: SizeType;
  danger?: boolean,
  style?: CSSProperties
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const ClickableIcon = ({ title, ...props }: Props) => {
  return (
    <Tooltip title={title}>
      <Button ghost shape="circle" size="large" {...props}/>
    </Tooltip>
  );
};

export default ClickableIcon;

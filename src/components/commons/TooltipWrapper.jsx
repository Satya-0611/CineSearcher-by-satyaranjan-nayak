import { Tooltip } from "neetoui";

const TooltipWrapper = ({ children, ...tooltipProps }) => (
  <Tooltip {...tooltipProps}>{children}</Tooltip>
);

export default TooltipWrapper;

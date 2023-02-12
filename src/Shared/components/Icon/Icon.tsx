import { Icon as ChakraIcon } from "@chakra-ui/react";
import { IconProp as FontAwesomeIconProps } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";

interface IconProps {
  name: FontAwesomeIconProps;
}

export default function Icon({ name }: IconProps) {
  const ariaLabel = useMemo(() => String(name).replace("-", " "), [name]);

  return (
    <ChakraIcon aria-label={ariaLabel} as={() => <FontAwesomeIcon icon={name} />} />
  );
}

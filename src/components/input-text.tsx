import Icon from "./icon";
import Text from "./text";
import { type VariantProps, tv } from "tailwind-variants";

export const inputTextContainerVariants = tv({
  base: "flex flex-col gap-1",
});

export const inputTextWrapperVariants = tv({
  base: `
  border border-solid border-border-primary
  focus:border-border-active bg-transparent
  rounded flex items-center gap-3
  `,
  variants: {
    size: {
      md: "h-10 p-3",
    },
    disabled: {
      true: "pointer-events-none",
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
});

export default function InputText() {
  return (
    <div className={inputTextContainerVariants()}>
      <div>
        <Icon svg={null} />
        <input />
      </div>
      <Text variant="label-small" className="text-accent-red">
        Field error
      </Text>
    </div>
  );
}

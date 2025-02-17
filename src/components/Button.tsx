type ButtonProps = {
  label: string;
  keyClass: boolean;
  onButtonClick: (label: string) => void;
};

const Button = ({ label, keyClass, onButtonClick }: ButtonProps) => {
  return (
    <button
      className={`border-2 p-2 w-full h-full rounded-sm font-medium     ease-in duration-100 hover:bg-slate-300 ${
        keyClass && "bg-rose-500"
      } ${
        label === "HISTORY" || label === "EQUALS"
          ? "text-xs tracking-tighter md:text-lg"
          : "md:text-2xl"
      }`}
      onClick={() => onButtonClick(label)}
      value={label}
    >
      {label}
    </button>
  );
};

export default Button;

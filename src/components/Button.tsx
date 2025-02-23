type ButtonProps = {
  label: string;
  keyClass: boolean;
  onButtonClick: (label: string) => void;
};

const Button = ({ label, keyClass, onButtonClick }: ButtonProps) => {
  return (
    <button
      className={`border-2 p-2 w-full h-full rounded-sm font-medium text-2xl ease-in duration-100 hover:bg-slate-300 ${
        keyClass && "bg-rose-500 text-xs tracking-tighter md:text-lg"
      }`}
      onClick={() => onButtonClick(label)}
      value={label}
    >
      {label}
    </button>
  );
};

export default Button;

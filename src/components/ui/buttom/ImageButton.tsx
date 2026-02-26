interface MainButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  onClick: () => void;
  imgClassName?: string;
}

export function ImageButton({
  src,
  onClick ,
  className,
  imgClassName,
  ...props
}: MainButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded-md p-1 transition-colors hover:bg-gray-100 ${className}`}
    >
      <img src={src} className={imgClassName} />
    </button>
  );
}
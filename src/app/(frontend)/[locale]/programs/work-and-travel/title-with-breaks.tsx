interface TitleWithBreaksProps {
  title: string;
  className?: string;
}

export function TitleWithBreaks({ title, className }: TitleWithBreaksProps) {
  return (
    <p className={className}>
      {title.split("\n").map((line, i, arr) => (
        <span key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

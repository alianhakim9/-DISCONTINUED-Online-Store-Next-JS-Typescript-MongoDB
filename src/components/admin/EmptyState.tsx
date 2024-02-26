import Link from "next/link";

interface EmptyStateProps {
  title: string;
  actionTitle: string;
  destination: string;
}

const EmptyState = (props: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <p>{props.title}</p>
      <Link href={props.destination} className="text-blue-500 underline">
        {props.actionTitle}
      </Link>
    </div>
  );
};

export default EmptyState;

export function ScoreCard({
  title,
  total,
}: {
  title: string;
  total: string | number;
}) {
  return (
    <div className="tile p-6">
      <h5 className="mb-2 text-3xl font-extrabold">{total}</h5>
      <span className="text-default">{title}</span>
    </div>
  );
}

interface RoleCardProps {
  title: string;
  description: string;
}

export default function RoleCard({ title, description }: RoleCardProps) {
  return (
    <div className="bg-primary p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-3 text-green-900">{title}</h3>
      <p className="text-green-800">{description}</p>
    </div>
  );
}
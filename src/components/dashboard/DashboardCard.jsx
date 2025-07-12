const DashboardCard = ({
  title,
  value,
  icon,
  bgColor = "bg-primary",
  textColor = "text-white",
}) => {
  return (
    <div
      className={`p-5 rounded-lg shadow-md ${bgColor} ${textColor} flex items-center gap-4`}
    >
      <div className="text-4xl">{icon}</div>
      <div>
        <h4 className="text-sm uppercase font-semibold">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;

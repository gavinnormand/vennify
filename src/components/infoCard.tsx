interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, text }) => {
  return (
    <div className="border-accent bg-secondary shadow-accent flex flex-col items-center gap-2 rounded-lg border-4 p-6 text-center shadow-[0_0_15px_rgba(0,0,0,0.3)]">
      {icon}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-md text-white">{text}</p>
      </div>
    </div>
  );
};

export default InfoCard;

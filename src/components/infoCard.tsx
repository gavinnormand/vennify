import React from "react";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, text }) => {
  return (
    <div className="border-accent bg-secondary shadow-accent flex flex-col items-center gap-4 rounded-lg border-4 p-8 text-center shadow-[0_0_15px_rgba(0,0,0,0.3)]">
      {icon}
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-lg text-white">{text}</p>
      </div>
    </div>
  );
};

export default InfoCard;

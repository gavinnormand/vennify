interface VennProps {
  left: boolean;
  center: boolean;
  right: boolean;
  toggleLeft: () => void;
  toggleCenter: () => void;
  toggleRight: () => void;
}

const Venn: React.FC<VennProps> = ({
  left,
  center,
  right,
  toggleLeft,
  toggleCenter,
  toggleRight,
}) => {
  return (
    <div className="flex flex-row items-center">
      <div className="relative">
        <svg
          width="264"
          height="164"
          viewBox="68 18 264 164"
          className="mx-auto"
        >
          {/* Left circle only area */}
          <circle
            cx="150"
            cy="100"
            r="80"
            fill={left ? "#121212" : "transparent"}
            stroke="#1ed760"
            strokeWidth="4"
            className="cursor-pointer transition-all duration-200 hover:stroke-4"
            onClick={() => toggleLeft()}
            mask="url(#leftOnly)"
          />

          {/* Right circle only area */}
          <circle
            cx="250"
            cy="100"
            r="80"
            fill={right ? "#121212" : "transparent"}
            stroke="#1ed760"
            strokeWidth="4"
            className="cursor-pointer transition-all duration-200 hover:stroke-4"
            onClick={() => toggleRight()}
            mask="url(#rightOnly)"
          />

          {/* Intersection area */}
          <path
            d="M 200 40 A 80 80 0 0 1 200 160 A 80 80 0 0 1 200 40 Z"
            fill={center ? "#121212" : "transparent"}
            stroke="#1ed760"
            strokeWidth="4"
            className="cursor-pointer transition-all duration-200"
            onClick={() => toggleCenter()}
          />

          {/* Masks for exclusive areas */}
          <defs>
            <mask id="leftOnly">
              <rect x="68" y="18" width="264" height="164" fill="white" />
              <circle cx="250" cy="100" r="80" fill="black" />
            </mask>
            <mask id="rightOnly">
              <rect x="68" y="18" width="264" height="164" fill="white" />
              <circle cx="150" cy="100" r="80" fill="black" />
            </mask>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Venn;
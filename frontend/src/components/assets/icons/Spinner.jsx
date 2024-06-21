/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */

const SwirlingCircle = ({ className }) => {
  return (
    <svg
      className={`w-24 h-24 ${className}`}
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="fill-none spin2"
        cx="400"
        cy="400"
        r="138"
        strokeWidth="40"
        stroke="#a9b59c"
        strokeDasharray="690 1400"
        strokeLinecap="round"
      />
    </svg>
  );
};

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <SwirlingCircle />
      <style>
        {`
            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          
            @keyframes spin2 {
              0% {
                stroke-dasharray: 1, 800;
                stroke-dashoffset: 0;
              }
              50% {
                stroke-dasharray: 400, 400;
                stroke-dashoffset: -200px;
              }
              100% {
                stroke-dasharray: 800, 1;
                stroke-dashoffset: -800px;
              }
            }
          
            .spin2 {
              transform-origin: center;
              animation: spin2 2.1s ease-in-out infinite,
                spin 100.6s linear infinite;
              animation-direction: alternate;
          `}
      </style>
    </div>
  );
};

export default Spinner;

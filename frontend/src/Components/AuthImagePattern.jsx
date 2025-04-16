import React from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  // Function to generate random animation styles
  const generateRandomStyles = () => ({
    animationDuration: `${Math.random() * 3 + 3}s`, // randomize animation duration
    animationDelay: `${Math.random() * 2}s`, // randomize delay
  });

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-8"> {/* Reduced padding */}
      <div className="max-w-sm text-center"> {/* Reduced max-width */}
        <div className="grid grid-cols-3 gap-2 mb-6 relative"> {/* Reduced gap and margin */}
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl bg-primary/10 ${i % 2 === 0 ? 'animate-pulse' : 'animate-shape-change'}`} // Reduced rounded corners
              style={generateRandomStyles()} // Applying random styles from function
            />
          ))}
        </div>
        <h2 className="text-xl font-bold mb-4">{title}</h2> {/* Reduced font size */}
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;

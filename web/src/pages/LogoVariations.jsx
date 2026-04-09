import React from 'react';

// Parametric Logo Generator
const ParametricLogo = ({
  thickness = 15,    // T
  gap = 5,           // G
  slope = 1,         // S: horizontal shift per vertical unit
  radius = 15,       // R: outer curve radius
  dashHeight = 10,   // Height of the smal dash
  overhangLeft = 5,  // OH: Middle bar left overhang
  fill = "#000000",
  className = "w-24 h-24"
}) => {
  // Raw geometric building blocks anchored to arbitrary origin
  // These will be translated to perfectly center within a 0-100 viewBox
  const T = thickness;
  const G = gap;
  const S = slope;
  const R = radius;
  const H_dash = dashHeight;
  const OH = overhangLeft;

  // Let's create an explicit geometry
  const y_mid_t = 40;
  const y_mid_b = y_mid_t + T;
  const y_top_b = y_mid_t - G;
  const y_dash_t = y_top_b - H_dash;
  const y_tri_b = y_top_b;
  
  const x_s_l = 60;
  const x_s_r = x_s_l + T;
  
  const x_tri_r = x_s_l - G;
  const W_tri = Math.max(10, 2 * T); // Ensure triangle has visible width
  const x_tri_l = x_tri_r - W_tri;
  const y_tri_t = y_tri_b - (W_tri / S);

  const y_s_t = y_mid_b + G;
  const H_stem = T > 10 ? 15 : 20; // adjust standard vertical fall based on thickness
  const y_foot_top = y_s_t + H_stem;
  const y_foot_bot = y_foot_top + T;

  const x_mid_t_r = x_s_r + (T * S);
  const x_mid_b_r = x_s_r;
  const x_mid_t_l = x_tri_l - OH;
  const x_mid_b_l = x_mid_t_l - (T * S);

  const x_foot_t_l = x_tri_l;
  const x_foot_b_l = x_foot_t_l - (T * S);

  // Calculate strict bounding box to auto-center flawlessly
  const minX = Math.min(x_mid_b_l, x_foot_b_l);
  const maxX = x_mid_t_r;
  const minY = Math.min(y_tri_t, y_dash_t);
  const maxY = y_foot_bot;

  const width = maxX - minX;
  const height = maxY - minY;

  // We are targeting a 100x100 viewBox.
  // We want to scale it down slightly if it's too big, or just center it.
  // Standard sizing roughly creates a 85x85 box.
  const scale = Math.min(90 / width, 90 / height);
  
  // Centering offsets
  const cx = 50 - ((minX + maxX) / 2) * scale;
  const cy = 50 - ((minY + maxY) / 2) * scale;

  // Apply transformations
  const tx = (x) => (x * scale + cx).toFixed(2);
  const ty = (y) => (y * scale + cy).toFixed(2);

  // Build the SVG paths
  // Triangle
  const pTri = `M ${tx(x_tri_l)} ${ty(y_tri_b)} L ${tx(x_tri_r)} ${ty(y_tri_b)} L ${tx(x_tri_r)} ${ty(y_tri_t)} Z`;
  
  // Dash
  const pDash = `M ${tx(x_s_l)} ${ty(y_dash_t)} L ${tx(x_s_r)} ${ty(y_dash_t)} L ${tx(x_s_r)} ${ty(y_top_b)} L ${tx(x_s_l)} ${ty(y_top_b)} Z`;

  // Middle Bar
  const pMid = `M ${tx(x_mid_t_l)} ${ty(y_mid_t)} L ${tx(x_mid_t_r)} ${ty(y_mid_t)} L ${tx(x_mid_b_r)} ${ty(y_mid_b)} L ${tx(x_mid_b_l)} ${ty(y_mid_b)} Z`;

  // L-Shape
  // We ensure Arc radius R respects scale and max constraints
  const rScaled = Math.min(R * scale, T * scale);
  const pLshape = `M ${tx(x_s_l)} ${ty(y_s_t)} 
                   L ${tx(x_s_r)} ${ty(y_s_t)} 
                   L ${tx(x_s_r)} ${ty(y_foot_top)} 
                   A ${rScaled} ${rScaled} 0 0 1 ${tx(x_s_r - (rScaled/scale))} ${ty(y_foot_bot)}
                   L ${tx(x_foot_b_l)} ${ty(y_foot_bot)}
                   L ${tx(x_foot_t_l)} ${ty(y_foot_top)}
                   L ${tx(x_s_l)} ${ty(y_foot_top)}
                   Z`;

  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={fill}>
      <path d={`${pTri} ${pDash} ${pMid} ${pLshape}`} />
    </svg>
  );
};

export default function LogoVariations() {
  const variations = [
    { name: "Standard (Perfect Balance)", props: { thickness: 15, gap: 5, slope: 1, radius: 15, dashHeight: 10, overhangLeft: 5 } },
    { name: "Heavy Weight (Chunky)", props: { thickness: 20, gap: 4, slope: 1, radius: 20, dashHeight: 12, overhangLeft: 5 } },
    { name: "Light Weight (Sleek)", props: { thickness: 8, gap: 5, slope: 1, radius: 8, dashHeight: 6, overhangLeft: 5 } },
    { name: "Steep Slant (Dynamic)", props: { thickness: 15, gap: 5, slope: 0.6, radius: 15, dashHeight: 10, overhangLeft: 5 } },
    { name: "Flat Slant (Stabilized)", props: { thickness: 15, gap: 5, slope: 1.5, radius: 15, dashHeight: 10, overhangLeft: 5 } },
    { name: "Monolithic (Tiny Gaps)", props: { thickness: 15, gap: 1, slope: 1, radius: 15, dashHeight: 10, overhangLeft: 5 } },
    { name: "Fragmented (Large Gaps)", props: { thickness: 12, gap: 9, slope: 1, radius: 12, dashHeight: 8, overhangLeft: 5 } },
    { name: "Sharp Edges (Aggressive)", props: { thickness: 15, gap: 5, slope: 1, radius: 0, dashHeight: 10, overhangLeft: 5 } },
    { name: "Square Dash (Blocky)", props: { thickness: 15, gap: 5, slope: 1, radius: 15, dashHeight: 15, overhangLeft: 5 } },
    { name: "Extended Overhang", props: { thickness: 13, gap: 5, slope: 1, radius: 13, dashHeight: 10, overhangLeft: 15 } },
  ];

  return (
    <div className="p-12 min-h-screen bg-white">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-black">10 Symmetric Variations</h1>
        <p className="text-gray-600 max-w-2xl text-center">
          Generated parametrically maintaining perfect parallel slopes and symmetric thickness rules across all elements. 
          Use <code className="bg-gray-100 px-2 py-1 rounded">/logo-variations</code> to review.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 max-w-7xl mx-auto">
        {variations.map((v, i) => (
          <div key={i} className="flex flex-col items-center group">
            <div className="border border-gray-200 shadow-sm rounded-xl p-8 mb-4 bg-gray-50 group-hover:border-black transition-colors duration-300">
              <ParametricLogo {...v.props} className="w-32 h-32" />
            </div>
            <h3 className="font-semibold text-center text-black mb-2">{v.name}</h3>
            <div className="text-xs text-gray-500 font-mono text-center flex flex-col gap-1">
              <span>Thickness = {v.props.thickness}</span>
              <span>Slope = {v.props.slope}</span>
              <span>Gap = {v.props.gap}</span>
              <span>Radius = {v.props.radius}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20 text-center">
        <a href="/" className="px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition">Back to Home</a>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Ruler,
  Scissors,
  Download,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  FileText,
  Printer,
  ChevronRight,
  Info,
} from 'lucide-react';

export const SizeCustomizationGuide: React.FC = () => {
  const [activeGuideTab, setActiveGuideTab] = useState<'saree' | 'blouse' | 'mens' | 'lehenga'>('saree');
  const [selectedUnit, setSelectedUnit] = useState<'inches' | 'cm'>('inches');

  // Downloadable Printable PDF / Sizing Sheet generator
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Radhika Sarees - Official Size & Customization Chart</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1c1917; padding: 40px; margin: 0; }
          .header { text-align: center; border-bottom: 2px solid #E51A24; padding-bottom: 20px; margin-bottom: 30px; }
          .logo-badge { display: inline-block; background-color: #E51A24; color: white; width: 60px; height: 60px; border-radius: 50%; font-size: 14px; font-weight: bold; line-height: 25px; text-align: center; padding-top: 5px; }
          h1 { color: #E51A24; margin: 10px 0 5px; font-size: 24px; text-transform: uppercase; letter-spacing: 1px; }
          .subtitle { color: #78716c; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px; }
          th { background-color: #fef2f2; color: #991b1b; padding: 10px; border: 1px solid #fecaca; text-align: left; }
          td { padding: 10px; border: 1px solid #e7e5e4; }
          tr:nth-child(even) { background-color: #fafaf9; }
          .section-title { font-size: 16px; font-weight: bold; color: #1c1917; margin: 25px 0 10px; border-left: 4px solid #E51A24; padding-left: 10px; }
          .instructions { background: #f5f5f4; border-radius: 8px; padding: 15px; font-size: 12px; line-height: 1.6; }
          .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #78716c; border-top: 1px solid #e7e5e4; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-badge">राधिका<br/>साड़ीज़</div>
          <h1>RADHIKA SAREES</h1>
          <div class="subtitle">Tel Gali, Atarra (210201), Uttar Pradesh | Helpline: +91 9455212218, +91 7607254842</div>
          <div style="margin-top: 5px; font-weight: bold; color: #44403c;">OFFICIAL SIZE & CUSTOMIZATION MEASUREMENT CHART</div>
        </div>

        <div class="section-title">1. Saree & Blouse Standard Size Chart (Inches)</div>
        <table>
          <thead>
            <tr>
              <th>Standard Size</th>
              <th>Bust (Inches)</th>
              <th>Under Bust</th>
              <th>Blouse Length</th>
              <th>Armhole</th>
              <th>Shoulder</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>XS (32)</td><td>32"</td><td>26" - 27"</td><td>13.5"</td><td>14"</td><td>13.5"</td></tr>
            <tr><td>S (34)</td><td>34"</td><td>28" - 29"</td><td>14"</td><td>15"</td><td>14"</td></tr>
            <tr><td>M (36)</td><td>36"</td><td>30" - 31"</td><td>14.5"</td><td>16"</td><td>14.5"</td></tr>
            <tr><td>L (38)</td><td>38"</td><td>32" - 33"</td><td>15"</td><td>17"</td><td>15"</td></tr>
            <tr><td>XL (40)</td><td>40"</td><td>34" - 35"</td><td>15.5"</td><td>18"</td><td>15.5"</td></tr>
            <tr><td>XXL (42)</td><td>42"</td><td>36" - 37"</td><td>16"</td><td>19"</td><td>16"</td></tr>
            <tr><td>3XL (44)</td><td>44"</td><td>38" - 39"</td><td>16.5"</td><td>20"</td><td>16.5"</td></tr>
          </tbody>
        </table>

        <div class="section-title">2. Mens Sherwani & Coat Suit Standard Size Chart (Inches)</div>
        <table>
          <thead>
            <tr>
              <th>Suit/Sherwani Size</th>
              <th>Chest</th>
              <th>Waist</th>
              <th>Shoulder</th>
              <th>Sleeve Length</th>
              <th>Jacket Length</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>36 (Small)</td><td>36" - 37"</td><td>30" - 31"</td><td>17"</td><td>24.5"</td><td>28.5"</td></tr>
            <tr><td>38 (Medium)</td><td>38" - 39"</td><td>32" - 33"</td><td>17.5"</td><td>25"</td><td>29"</td></tr>
            <tr><td>40 (Large)</td><td>40" - 41"</td><td>34" - 35"</td><td>18.5"</td><td>25.5"</td><td>29.5"</td></tr>
            <tr><td>42 (X-Large)</td><td>42" - 43"</td><td>36" - 37"</td><td>19"</td><td>26"</td><td>30"</td></tr>
            <tr><td>44 (XX-Large)</td><td>44" - 45"</td><td>38" - 40"</td><td>19.5"</td><td>26.5"</td><td>30.5"</td></tr>
          </tbody>
        </table>

        <div class="section-title">3. How to Submit Customization Preferences</div>
        <div class="instructions">
          <strong>Step 1:</strong> Select your saree, lehenga, coat suit or sherwani from Radhika Sarees.<br/>
          <strong>Step 2:</strong> Choose services required: (A) Free Fall & Pico, (B) Custom Blouse Stitching (Specify Padded / Non-Padded, Neckline style), (C) Petticoat Stitching, or (D) Mens Bespoke Alteration.<br/>
          <strong>Step 3:</strong> Send your measurements or a photo of your well-fitted sample blouse/suit to WhatsApp at <strong>+91 9455212218</strong>.<br/>
          <strong>Step 4:</strong> Our master tailors at our Tel Gali, Atarra boutique will tailor your outfit to perfection.
        </div>

        <div class="footer">
          Radhika Sarees • Tel Gali, Atarra (210201), Banda, Uttar Pradesh • Email: radhikasareesatarra@gmail.com
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <section id="size-customization-guide" className="py-16 sm:py-20 bg-stone-50/70 border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#E51A24] text-xs font-bold uppercase tracking-wider mb-2">
              <Ruler className="w-3.5 h-3.5" />
              <span>Tailoring & Fit Guide</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Size & Customization Guide
            </h2>
            <p className="mt-2 text-stone-600 text-sm max-w-xl">
              From flawless fall & pico to custom designer blouse stitching and bespoke menswear alterations, ensure your outfits fit like a dream.
            </p>
          </div>

          {/* Downloadable PDF Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-5 py-3 bg-[#E51A24] hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Size Chart</span>
            </button>
          </div>
        </div>

        {/* 3 Core Customization Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Pillar 1: Fall & Pico */}
          <div className="bg-white rounded-3xl p-6 border border-red-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#E51A24] flex items-center justify-center font-bold mb-4">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                1. Fall & Pico Finishing
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Every saree purchased from Radhika Sarees comes with complimentary or specialized premium fall pico:
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-stone-700 font-medium">
                <li className="flex items-center gap-2 text-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Color-matched pure cotton fall</span>
                </li>
                <li className="flex items-center gap-2 text-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Ultra-fine micro pico on pallu borders</span>
                </li>
                <li className="flex items-center gap-2 text-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Handcrafted tassels (latkans) upon request</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-medium">
              Ready within 24 hours at Atarra workshop.
            </div>
          </div>

          {/* Pillar 2: Custom Blouse Stitching */}
          <div className="bg-white rounded-3xl p-6 border border-red-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold mb-4">
                <Sparkles className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                2. Designer Blouse Stitching
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Send your measurements or a photo of your existing best-fit blouse:
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-stone-700 font-medium">
                <li className="flex items-center gap-2 text-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Padded or Non-Padded princess cut</span>
                </li>
                <li className="flex items-center gap-2 text-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Custom Necklines (Sweetheart, Boat, Deep V)</span>
                </li>
                <li className="flex items-center gap-2 text-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Sleeves (Sleeveless, Elbow, Full Churi)</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-medium">
              Stitched by our 30+ year experienced master cutters.
            </div>
          </div>

          {/* Pillar 3: Menswear & Lehengas */}
          <div className="bg-white rounded-3xl p-6 border border-red-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold mb-4">
                <Ruler className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                3. Suits, Sherwanis & Lehengas
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Precise alterations for mens coat suits, blazers, and bridal lehenga flares:
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-stone-700 font-medium">
                <li className="flex items-center gap-2 text-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Coat suit shoulder, sleeve & trouser hem</span>
                </li>
                <li className="flex items-center gap-2 text-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Sherwani chest contour & length adjustments</span>
                </li>
                <li className="flex items-center gap-2 text-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Double can-can flare attachment for lehengas</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-medium">
              Trial room available in-store at Tel Gali, Atarra.
            </div>
          </div>

        </div>

        {/* Interactive Measurement Guide & Sizing Tables */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-100 shadow-md">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Select Category:</span>
              <div className="flex flex-wrap gap-1.5">
                {(['saree', 'blouse', 'mens', 'lehenga'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveGuideTab(tab)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                      activeGuideTab === tab
                        ? 'bg-[#E51A24] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {tab === 'saree' ? 'Saree Sizing' : tab === 'blouse' ? 'Blouse Chart' : tab === 'mens' ? 'Mens Suits & Sherwani' : 'Lehenga Measurements'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium">Unit:</span>
              <button
                onClick={() => setSelectedUnit('inches')}
                className={`px-2.5 py-1 rounded font-bold ${selectedUnit === 'inches' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'}`}
              >
                Inches (")
              </button>
              <button
                onClick={() => setSelectedUnit('cm')}
                className={`px-2.5 py-1 rounded font-bold ${selectedUnit === 'cm' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'}`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Saree Info */}
          {activeGuideTab === 'saree' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-stone-700">
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  How Saree Sizing Works
                </h4>
                <p>
                  Sarees in India are traditionally one-size-fits-all, woven to a standardized royal drape length:
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                    <strong className="block text-stone-900 font-bold mb-1">Standard Saree Length:</strong>
                    <span>5.5 Meters (Approx. 6 Yards)</span>
                  </div>
                  <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                    <strong className="block text-stone-900 font-bold mb-1">Blouse Piece Included:</strong>
                    <span>0.8 to 1.0 Meter (Unstitched)</span>
                  </div>
                </div>
                <p className="text-stone-600">
                  <strong>Petticoat Sizing:</strong> Standard petticoat length is 36" to 40" measured from your waist where you tie the saree down to your ankle. We provide pre-stitched cotton or satin petticoats on order.
                </p>
              </div>

              <div className="lg:col-span-5 bg-stone-50 p-5 rounded-2xl border border-stone-200 text-xs space-y-3">
                <div className="font-bold text-stone-900 flex items-center gap-1.5 text-sm">
                  <Info className="w-4 h-4 text-[#E51A24]" />
                  <span>How to Specify Preferences:</span>
                </div>
                <p className="text-stone-600">
                  When inquiring or checking out, simply mention in the notes or on WhatsApp:
                </p>
                <div className="bg-white p-3 rounded-xl border border-stone-200 text-[11px] font-mono text-stone-800 space-y-1">
                  <div>1. Fall & Pico needed: Yes / No</div>
                  <div>2. Blouse stitching required: Yes (Size 36 / 38 / Custom)</div>
                  <div>3. Petticoat required: Cotton / Satin (Waist 32")</div>
                </div>
              </div>
            </div>
          )}

          {/* Blouse Chart */}
          {activeGuideTab === 'blouse' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-red-50/80 text-[#991B1B]">
                    <th className="p-3 font-bold border-b border-red-200">Standard Size</th>
                    <th className="p-3 font-bold border-b border-red-200">Bust ({selectedUnit === 'inches' ? 'Inches' : 'cm'})</th>
                    <th className="p-3 font-bold border-b border-red-200">Under Bust</th>
                    <th className="p-3 font-bold border-b border-red-200">Blouse Length</th>
                    <th className="p-3 font-bold border-b border-red-200">Armhole</th>
                    <th className="p-3 font-bold border-b border-red-200">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  {[
                    { size: 'XS (32)', bust: selectedUnit === 'inches' ? '32"' : '81 cm', under: selectedUnit === 'inches' ? '26" - 27"' : '66 - 69 cm', length: selectedUnit === 'inches' ? '13.5"' : '34 cm', arm: selectedUnit === 'inches' ? '14"' : '35 cm', shoulder: selectedUnit === 'inches' ? '13.5"' : '34 cm' },
                    { size: 'S (34)', bust: selectedUnit === 'inches' ? '34"' : '86 cm', under: selectedUnit === 'inches' ? '28" - 29"' : '71 - 74 cm', length: selectedUnit === 'inches' ? '14"' : '35 cm', arm: selectedUnit === 'inches' ? '15"' : '38 cm', shoulder: selectedUnit === 'inches' ? '14"' : '35 cm' },
                    { size: 'M (36)', bust: selectedUnit === 'inches' ? '36"' : '91 cm', under: selectedUnit === 'inches' ? '30" - 31"' : '76 - 79 cm', length: selectedUnit === 'inches' ? '14.5"' : '37 cm', arm: selectedUnit === 'inches' ? '16"' : '41 cm', shoulder: selectedUnit === 'inches' ? '14.5"' : '37 cm' },
                    { size: 'L (38)', bust: selectedUnit === 'inches' ? '38"' : '96 cm', under: selectedUnit === 'inches' ? '32" - 33"' : '81 - 84 cm', length: selectedUnit === 'inches' ? '15"' : '38 cm', arm: selectedUnit === 'inches' ? '17"' : '43 cm', shoulder: selectedUnit === 'inches' ? '15"' : '38 cm' },
                    { size: 'XL (40)', bust: selectedUnit === 'inches' ? '40"' : '101 cm', under: selectedUnit === 'inches' ? '34" - 35"' : '86 - 89 cm', length: selectedUnit === 'inches' ? '15.5"' : '39 cm', arm: selectedUnit === 'inches' ? '18"' : '46 cm', shoulder: selectedUnit === 'inches' ? '15.5"' : '39 cm' },
                    { size: 'XXL (42)', bust: selectedUnit === 'inches' ? '42"' : '107 cm', under: selectedUnit === 'inches' ? '36" - 37"' : '91 - 94 cm', length: selectedUnit === 'inches' ? '16"' : '40 cm', arm: selectedUnit === 'inches' ? '19"' : '48 cm', shoulder: selectedUnit === 'inches' ? '16"' : '40 cm' },
                    { size: '3XL (44)', bust: selectedUnit === 'inches' ? '44"' : '112 cm', under: selectedUnit === 'inches' ? '38" - 39"' : '96 - 99 cm', length: selectedUnit === 'inches' ? '16.5"' : '42 cm', arm: selectedUnit === 'inches' ? '20"' : '51 cm', shoulder: selectedUnit === 'inches' ? '16.5"' : '42 cm' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-red-50/40 transition-colors">
                      <td className="p-3 font-bold text-stone-900">{row.size}</td>
                      <td className="p-3">{row.bust}</td>
                      <td className="p-3">{row.under}</td>
                      <td className="p-3">{row.length}</td>
                      <td className="p-3">{row.arm}</td>
                      <td className="p-3">{row.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mens Suits & Sherwani */}
          {activeGuideTab === 'mens' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-red-50/80 text-[#991B1B]">
                    <th className="p-3 font-bold border-b border-red-200">Suit / Sherwani Size</th>
                    <th className="p-3 font-bold border-b border-red-200">Chest ({selectedUnit === 'inches' ? 'Inches' : 'cm'})</th>
                    <th className="p-3 font-bold border-b border-red-200">Waist</th>
                    <th className="p-3 font-bold border-b border-red-200">Shoulder</th>
                    <th className="p-3 font-bold border-b border-red-200">Sleeve Length</th>
                    <th className="p-3 font-bold border-b border-red-200">Jacket Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  {[
                    { size: '36 (Small)', chest: selectedUnit === 'inches' ? '36" - 37"' : '91 - 94 cm', waist: selectedUnit === 'inches' ? '30" - 31"' : '76 - 79 cm', shoulder: selectedUnit === 'inches' ? '17"' : '43 cm', sleeve: selectedUnit === 'inches' ? '24.5"' : '62 cm', length: selectedUnit === 'inches' ? '28.5"' : '72 cm' },
                    { size: '38 (Medium)', chest: selectedUnit === 'inches' ? '38" - 39"' : '96 - 99 cm', waist: selectedUnit === 'inches' ? '32" - 33"' : '81 - 84 cm', shoulder: selectedUnit === 'inches' ? '17.5"' : '44 cm', sleeve: selectedUnit === 'inches' ? '25"' : '63 cm', length: selectedUnit === 'inches' ? '29"' : '73 cm' },
                    { size: '40 (Large)', chest: selectedUnit === 'inches' ? '40" - 41"' : '101 - 104 cm', waist: selectedUnit === 'inches' ? '34" - 35"' : '86 - 89 cm', shoulder: selectedUnit === 'inches' ? '18.5"' : '47 cm', sleeve: selectedUnit === 'inches' ? '25.5"' : '65 cm', length: selectedUnit === 'inches' ? '29.5"' : '75 cm' },
                    { size: '42 (X-Large)', chest: selectedUnit === 'inches' ? '42" - 43"' : '106 - 109 cm', waist: selectedUnit === 'inches' ? '36" - 37"' : '91 - 94 cm', shoulder: selectedUnit === 'inches' ? '19"' : '48 cm', sleeve: selectedUnit === 'inches' ? '26"' : '66 cm', length: selectedUnit === 'inches' ? '30"' : '76 cm' },
                    { size: '44 (XX-Large)', chest: selectedUnit === 'inches' ? '44" - 45"' : '112 - 115 cm', waist: selectedUnit === 'inches' ? '38" - 40"' : '96 - 101 cm', shoulder: selectedUnit === 'inches' ? '19.5"' : '49 cm', sleeve: selectedUnit === 'inches' ? '26.5"' : '67 cm', length: selectedUnit === 'inches' ? '30.5"' : '77 cm' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-red-50/40 transition-colors">
                      <td className="p-3 font-bold text-stone-900">{row.size}</td>
                      <td className="p-3">{row.chest}</td>
                      <td className="p-3">{row.waist}</td>
                      <td className="p-3">{row.shoulder}</td>
                      <td className="p-3">{row.sleeve}</td>
                      <td className="p-3">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Lehenga Guide */}
          {activeGuideTab === 'lehenga' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <h4 className="font-serif font-bold text-lg text-stone-900">
                Lehenga Skirt & Choli Measurements
              </h4>
              <p>
                Our bridal and partywear lehengas are available both in semi-stitched formats and custom-tailored with multi-layer can-can flares:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="font-bold text-stone-900 block mb-1">1. Waist & Hip</span>
                  <span>Measure around your natural waist where the lehenga skirt waistband rests, and the widest part of your hips.</span>
                </div>
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="font-bold text-stone-900 block mb-1">2. Skirt Length</span>
                  <span>Measure from waist down to the floor, keeping your expected wedding heels or juttis on.</span>
                </div>
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="font-bold text-stone-900 block mb-1">3. Choli / Blouse</span>
                  <span>Bust circumference, choli length (14" - 16"), and sleeve preference (Sleeveless / 3/4th / Full).</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

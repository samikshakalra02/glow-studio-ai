import React, { useState } from 'react';
import { Upload, Camera, Wand2, RefreshCcw, Image as ImageIcon, Plus, X, MessageSquareQuote } from 'lucide-react';

const MockupStudio: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [commentary, setCommentary] = useState<string>("Ready to mix something wild?");
  
  // Ingredient tags
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const commonIngredients = ['Honey', 'Oats', 'Turmeric', 'Aloe', 'Green Tea', 'Coffee', 'Yogurt', 'Lemon'];

  const getQuirkyComment = (ing: string, adding: boolean) => {
    if (!adding) return "Removed. Keeping it simple.";
    
    const comments: Record<string, string> = {
      'Honey': "Sweet choice! Sticky business incoming.",
      'Oats': "Breakfast for your face? Very demure.",
      'Turmeric': "Staining risk high, but the glow is real.",
      'Aloe': "Ahhh, nature's fire extinguisher.",
      'Green Tea': "Zen mode activated.",
      'Coffee': "Wakey wakey! De-puff that face.",
      'Yogurt': "Getting creamy with those probiotics.",
      'Lemon': "Oof, spicy! Watch out for the sun.",
    };
    return comments[ing] || "Interesting addition...";
  };

  const toggleIngredient = (ing: string) => {
    if (selectedIngredients.includes(ing)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ing));
      setCommentary(getQuirkyComment(ing, false));
    } else {
      if (selectedIngredients.length < 3) {
        setSelectedIngredients([...selectedIngredients, ing]);
        setCommentary(getQuirkyComment(ing, true));
      } else {
        setCommentary("Whoa there, mad scientist! 3 ingredients max.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
      setGeneratedImage(null);
      setCommentary("Image loaded. Now spice it up.");
    }
  };

  const handleGenerate = () => {
    if (!image) return;
    setGenerating(true);
    setCommentary("Consulting the aesthetic gods...");
    setTimeout(() => {
      // Use a consistent, high-quality spa image
      setGeneratedImage('https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2670&auto=format&fit=crop'); 
      setGenerating(false);
      setCommentary("Voila! Pure luxury.");
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up pb-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-serif text-[#333333] mb-4">Product Mockup Studio</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Elevate your DIY formulations. Tag your key <span className="text-[#557C70]">natural ingredients</span> and let AI reimagine your snapshot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Upload Section */}
        <div className="flex flex-col space-y-6">
          <div className={`
            relative flex-1 min-h-[300px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all duration-300 overflow-hidden
            ${image ? 'border-[#7FA99B] bg-white' : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300'}
          `}>
            {image ? (
              <div className="relative w-full h-full group">
                 <img src={image} alt="Upload preview" className="w-full h-full object-cover" />
                 {/* Scanning Overlay */}
                 {generating && (
                   <div className="absolute inset-0 z-10 bg-black/20">
                     <div className="absolute w-full h-1 bg-[#7FA99B] shadow-[0_0_15px_rgba(127,169,155,0.8)] animate-scan"></div>
                     <div className="absolute bottom-4 left-0 w-full text-center text-white font-mono text-xs tracking-widest animate-pulse">PROCESSING VISUAL DATA...</div>
                   </div>
                 )}
                 {!generating && (
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                      <button onClick={() => {setImage(null); setGeneratedImage(null);}} className="text-white bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm hover:bg-white/30 transition">Replace Image</button>
                   </div>
                 )}
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full p-10 text-center">
                <div className="bg-[#E8F3E8] w-20 h-20 rounded-full flex items-center justify-center mb-6 text-[#557C70] shadow-sm group-hover:scale-110 transition-transform">
                  <Upload size={32} />
                </div>
                <p className="text-[#333333] font-medium text-lg">Drop your product photo here</p>
                <p className="text-gray-400 text-sm mt-2">or click to browse files</p>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            )}
          </div>

          {/* Ingredient Infusion Selector */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
             {/* AI Commentary Bubble */}
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <MessageSquareQuote size={64} />
             </div>
             
             <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Infuse Ingredients (Max 3)</h4>
                <p className="text-sm text-[#557C70] italic font-medium animate-fade-in-up key={commentary}">
                  AI: "{commentary}"
                </p>
             </div>

             <div className="flex flex-wrap gap-2 relative z-10">
               {commonIngredients.map(ing => (
                 <button
                   key={ing}
                   onClick={() => toggleIngredient(ing)}
                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
                     ${selectedIngredients.includes(ing) 
                       ? 'bg-[#333333] text-white shadow-md transform scale-105' 
                       : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                 >
                   {selectedIngredients.includes(ing) ? <X size={14} /> : <Plus size={14} />}
                   {ing}
                 </button>
               ))}
             </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={!image || generating}
            className="w-full bg-[#333333] text-white py-4 rounded-2xl font-medium hover:bg-black hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center group"
          >
            {generating ? (
              <>
                <Wand2 className="animate-spin mr-3" size={20} />
                <span className="tracking-wide">RENDERING SCENE...</span>
              </>
            ) : (
              <>
                <Camera className="mr-3 group-hover:scale-110 transition-transform" size={20} />
                <span className="tracking-wide">GENERATE STUDIO SHOT</span>
              </>
            )}
          </button>
        </div>

        {/* Result Section */}
        <div className="bg-white rounded-3xl p-3 shadow-2xl border border-gray-100 min-h-[500px] flex flex-col relative overflow-hidden group">
          {generatedImage ? (
            <div className="flex-1 flex flex-col animate-scale-in relative h-full">
              <div className="relative flex-1 overflow-hidden rounded-2xl">
                 <img src={generatedImage} alt="AI Result" className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105" />
                 
                 {/* Magazine Style Overlays */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                 
                 <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur text-[10px] font-bold px-3 py-1 rounded-full text-[#333333] shadow-sm tracking-widest">
                      GLOWSTUDIO ORIGINAL
                    </span>
                 </div>

                 <div className="absolute bottom-8 left-8 right-8 text-white">
                    <div className="flex gap-2 mb-3">
                      {selectedIngredients.map((ing, i) => (
                        <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-medium uppercase tracking-wider border border-white/10">
                          {ing}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif text-3xl italic mb-2">
                      {selectedIngredients.length > 0 ? `"${selectedIngredients[0]} Essence"` : `"Botanical Purity"`}
                    </h3>
                    <div className="w-12 h-[1px] bg-white/60 mb-3"></div>
                    <p className="text-xs text-gray-200 uppercase tracking-widest mb-1">Concept • {new Date().getFullYear()}</p>
                    <p className="text-sm text-gray-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
                      Re-imagined in a minimalist sanctuary setting. 
                      {selectedIngredients.length > 0 && ` Highlighting the raw potency of ${selectedIngredients.join(' & ')}.`}
                    </p>
                 </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 relative">
               <div className="absolute inset-0 bg-gray-50 rounded-2xl m-3 border border-gray-100"></div>
               <div className="relative z-10 flex flex-col items-center">
                 <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ImageIcon size={32} className="text-gray-300" />
                 </div>
                 <p className="font-serif text-lg text-gray-400">Visualization Canvas</p>
                 <p className="text-xs text-gray-300 mt-2">Results will manifest here</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockupStudio;
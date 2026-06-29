export function AgencySection() {
  return (
    <section className="bg-white py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -right-48 top-1/3 w-[600px] h-[600px] rounded-full border border-[#0b080d]/[0.08] pointer-events-none" />

      {/* Row 1: Heading + body */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 mb-20">
        <div className="md:w-[40%] flex-shrink-0">
          <span className="text-[#0b080d] text-sm tracking-widest uppercase font-light mb-6 block">
            +
          </span>
          <h2 className="text-[clamp(3rem,6vw,5rem)] leading-none font-light tracking-tight [font-family:'Canela',serif] text-[#0b080d]">
            Our agency
          </h2>
        </div>
        <div className="md:w-[60%]">
          <p className="text-[18px] leading-relaxed max-w-[540px] text-[#0b080d]">
            The studio creates extraordinary contemporary spaces, perfectly
            rooted in unique settings: on the shores of Lake Annecy, atop the
            peaks of Courchevel, or facing the ocean in Biarritz… In
            breathtaking environments where nature defines the exceptional,
            technique supports inspiration to imagine the impossible.
          </p>
        </div>
      </div>

      {/* Row 2: Large office photo — right-aligned */}
      <div className="relative w-full md:w-[65%] ml-auto mb-12">
        <div className="relative aspect-[16/9] bg-[#e8e4df]">
          {/* placeholder for agency-office.jpg */}
        </div>
      </div>

      {/* Row 3: Sketch left + render right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
        <div className="relative aspect-[4/3] bg-[#e8e4df]">
          {/* placeholder for agency-sketch.jpg */}
        </div>
        <div className="relative aspect-[4/3] bg-[#dbd6d0]">
          {/* placeholder for agency-render.jpg */}
        </div>
      </div>

      {/* Row 4: Uppercase mono quotes */}
      <div className="mt-24 space-y-10">
        <p className="text-[11px] tracking-[0.08em] uppercase font-mono leading-relaxed text-[#0b080d] [font-family:'Maison Neue Mono',ui-monospace,monospace] whitespace-pre-line">
          {`AN INTENTIONALLY INTIMATE\nAGENCY, FOUNDED IN ANNECY BY\nARCHITECTS CAROLE AND\nFABRICE GIBERT.`}
        </p>
        <p className="text-[11px] tracking-[0.08em] uppercase font-mono leading-relaxed text-[#0b080d] [font-family:'Maison Neue Mono',ui-monospace,monospace] whitespace-pre-line">
          {`TO TURN THE OPPORTUNITY OF A\nPLACE INTO A LIVING\nEXPERIENCE UNLIKE ANY OTHER.`}
        </p>
      </div>
    </section>
  );
}

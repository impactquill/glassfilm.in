import { jsPDF } from 'jspdf';

interface ProductBrochureData {
    name: string;
    category: string;
    description: string;
    rating: number;
    image: string;
    benefits?: string[];
}

interface ImageData {
    dataURL: string;
    width: number;
    height: number;
}

// Robust helper for SVG to Base64 (supporting color inversion for dark backgrounds)
const getLogoBase64 = async (url: string, inverted = false): Promise<ImageData> => {
    try {
        const response = await fetch(url);
        let svgContent = await response.text();

        if (inverted) {
            // Replace all brand colors with white for high-contrast on dark backgrounds
            svgContent = svgContent.replace(/#0f1d2b/g, '#ffffff'); // Glass
            svgContent = svgContent.replace(/#5a7080/g, '#ffffff'); // Premium Solutions
            svgContent = svgContent.replace(/#0d7a6e/g, '#ffffff'); // Film
        }

        const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const blobUrl = URL.createObjectURL(svgBlob);

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const w = img.naturalWidth || 240;
                const h = img.naturalHeight || 60;
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    const dataURL = canvas.toDataURL('image/png');
                    URL.revokeObjectURL(blobUrl);
                    resolve({ dataURL, width: w, height: h });
                } else {
                    reject('Canvas context failed');
                }
            };
            img.onerror = () => reject('Logo load failed');
            img.src = blobUrl;
        });
    } catch (e) {
        throw new Error('Logo fetch failed');
    }
};

// Helper for regular images (PNG/JPG/WEBP)
const getImageData = (url: string): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            // Use image/png to preserve transparency
            const dataURL = canvas.toDataURL('image/png');
            resolve({ dataURL, width: img.width, height: img.height });
        };
        img.onerror = (error) => reject(error);
        img.src = url;
    });
};

export const generateProductBrochure = async (product: ProductBrochureData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const brandTeal = [13, 115, 119];
    const brandCharcoal = [26, 26, 26];

    // Pre-load all required assets in parallel
    let heroBase64 = '';
    let productBase64 = '';
    let logoBase64 = '';
    let logoWhiteBase64 = '';
    let vendor3M: ImageData | null = null;
    let vendorGarware: ImageData | null = null;
    let vendorSGSG: ImageData | null = null;
    let qrBase64 = '';

    try {
        const [hero, productImg, logo, logoWhite, v3m, vg, vs, qr] = await Promise.allSettled([
            getImageData('/hero-1.jpg'),
            getImageData(product.image),
            getLogoBase64('/glassfilm-logo.svg', false),
            getLogoBase64('/glassfilm-logo.svg', true),
            getImageData('/vendors/3M.png'),
            getImageData('/vendors/garware.webp'),
            getLogoBase64('/vendors/sgsg-logo-rgb.svg', false),
            getImageData('https://api.qrserver.com/v1/create-qr-code/?data=https://glassfilm.in&size=150x150')
        ]);

        if (hero.status === 'fulfilled') heroBase64 = hero.value.dataURL;
        if (productImg.status === 'fulfilled') productBase64 = productImg.value.dataURL;
        if (logo.status === 'fulfilled') logoBase64 = logo.value.dataURL;
        if (logoWhite.status === 'fulfilled') logoWhiteBase64 = logoWhite.value.dataURL;
        if (v3m.status === 'fulfilled') vendor3M = v3m.value;
        if (vg.status === 'fulfilled') vendorGarware = vg.value;
        if (vs.status === 'fulfilled') vendorSGSG = vs.value;
        if (qr.status === 'fulfilled') qrBase64 = qr.value.dataURL;
    } catch (e) {
        console.warn('Asset pre-load encountered issues', e);
    }

    // Helper: Draw Brand Header on internal pages
    const drawPageHeader = (title: string) => {
        doc.setFillColor(brandTeal[0], brandTeal[1], brandTeal[2]);
        doc.rect(0, 0, pageWidth, 30, 'F');

        if (logoWhiteBase64) {
            // Use White Logo on Teal Header - Corrected to 4:1 Aspect Ratio (48/12)
            doc.addImage(logoWhiteBase64, 'PNG', margin, 9, 48, 12, undefined, 'FAST');
        }

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(title, pageWidth - margin, 19, { align: 'right' });
    };

    // Helper: Draw Brand Footer
    const drawPageFooter = (pageNum: number) => {
        doc.setFillColor(248, 250, 252);
        doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(8);
        doc.text('© 2026 GlassFilm. Sold by: GlassFilm | Premium Architectural Solutions', margin, pageHeight - 7);
        doc.text(`Page ${pageNum} of 7`, pageWidth - margin, pageHeight - 7, { align: 'right' });
    };

    // --- PAGE 1: LUXURY COVER ---
    // Start with a rich, dark brand teal background
    doc.setFillColor(20, 80, 85);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    if (heroBase64) {
        // Set opacity to 15% for the background image
        doc.setGState(new (doc as any).GState({ opacity: 0.15 }));
        doc.addImage(heroBase64, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
        // Reset opacity back to 100% for everything else
        doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
    }

    // Decorative branding lines
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1.5);
    doc.line(margin, 30, margin + 40, 30);

    if (logoWhiteBase64) {
        // Use White Logo for Dark Cover - Corrected to 4:1 Aspect Ratio (80/20)
        doc.addImage(logoWhiteBase64, 'PNG', margin, 45, 80, 20, undefined, 'FAST');
    }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text('PREMIUM COLLECTIONS 2026', margin, 78);

    doc.setFontSize(12);
    doc.text('INNOVATION | PRIVACY | COMFORT', margin, 88);

    // Big focus text at bottom
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    const catTitle = product.category.toUpperCase();
    doc.text(catTitle, margin, pageHeight - 60);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('The Official Digital Catalogue', margin, pageHeight - 50);

    // --- PAGE 2: SERVICES SHOWCASE ---
    doc.addPage();
    drawPageHeader('Service Excellence');

    doc.setTextColor(brandCharcoal[0], brandCharcoal[1], brandCharcoal[2]);
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text('Our Architectural Services', margin, 55);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('We deliver comprehensive solutions for both residential and commercial projects nationwide.', margin, 62);

    const services = [
        { t: 'Solar Heat Control', d: 'High rejection nano-ceramic films reducing heat by 80% for improved comfort.', img: '/hero-1.jpg' },
        { t: 'Luxury Wallpapers', d: 'Exclusive 3D textures and Italian murals for premium residential and commercial spaces.', img: '/wallpaper-texture.jpg' },
        { t: 'Window Blinds & Automation', d: 'Custom-fit roller and zebra blinds with smart motorized or classic manual controls.', img: '/blinds-zebra.jpg' }
    ];

    let sY = 75;
    for (const s of services) {
        try {
            const sImgData = await getImageData(s.img);
            doc.addImage(sImgData.dataURL, 'PNG', margin, sY, 40, 30, undefined, 'FAST');
        } catch (e) { }

        doc.setTextColor(brandTeal[0], brandTeal[1], brandTeal[2]);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(s.t, margin + 50, sY + 8);

        doc.setTextColor(80, 80, 80);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const sDesc = doc.splitTextToSize(s.d, pageWidth - margin - 50 - margin);
        doc.text(sDesc, margin + 50, sY + 16);

        doc.setDrawColor(230, 230, 230);
        doc.line(margin, sY + 35, pageWidth - margin, sY + 35);
        sY += 45;
    }
    drawPageFooter(2);

    // --- PAGE 3: PRODUCT PROFILE ---
    doc.addPage();
    drawPageHeader('Product Specification');

    const contentY = 50;
    const colWidth = (pageWidth - margin * 2 - 10) / 2; // Split into 2 columns with 10mm gap

    // Column 1: Image
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, contentY, colWidth, 80, 2, 2, 'F');
    if (productBase64) {
        // Center image in column 1
        doc.addImage(productBase64, 'JPEG', margin + 5, contentY + 5, colWidth - 10, 70, undefined, 'FAST');
    }

    // Column 2: Details
    const col2X = margin + colWidth + 10;
    doc.setTextColor(brandTeal[0], brandTeal[1], brandTeal[2]);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(product.name, colWidth);
    doc.text(titleLines, col2X, contentY + 10);

    const titleHeight = titleLines.length * 9;
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text(product.category, col2X, contentY + 10 + titleHeight);

    doc.setTextColor(60, 66, 87);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const fullDesc = product.description + " This professional-grade solution is engineered for maximum performance, combining aesthetic elegance with functional longevity.";
    const pDescLines = doc.splitTextToSize(fullDesc, colWidth);
    // Justified text for a clean magazine look
    doc.text(pDescLines, col2X, contentY + 18 + titleHeight, { align: 'justify', maxWidth: colWidth });

    // Key Technical Data - Block Style (Category-Specific)
    const techY = contentY + 95;
    doc.setFillColor(brandTeal[0], brandTeal[1], brandTeal[2]);
    doc.roundedRect(margin, techY, pageWidth - margin * 2, 65, 3, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Technical Data', margin + 10, techY + 12);

    // Dynamic Specs based on Category
    let specs: string[] = [];
    const lowerCat = product.category.toLowerCase();

    if (lowerCat.includes('film')) {
        specs = [
            '• UV Rejection Performance: 99.9%',
            '• Total Solar Energy Rejection: Up to 82%',
            '• Visible Light Transmission: Options 5% - 70%',
            '• Surface Protection: Anti-Scratch Hard Coat',
            '• Durability: High-Impact / Shatter Resistant',
            '• Warranty: 5 Years Limited International'
        ];
    } else if (lowerCat.includes('wallpaper')) {
        specs = [
            '• Material Weight: 280-350 GSM Heavy Duty',
            '• Surface Finish: Premium Textured / Matte',
            '• Washability: Scrub-resistant & Damp-wipeable',
            '• Safety: Fire Retardant & Eco-Friendly Inks',
            '• Durability: Non-fading UV resistant colors',
            '• Installation: Seamless join / Butt-fit technology'
        ];
    } else {
        // Blinds / Default
        specs = [
            '• Mechanism: Precision Smooth-Roll / Motorized',
            '• Fabric Type: Blackout / Dim-out / Sunscreen',
            '• Operation: Manual Cord or Remote Automation',
            '• Heat Insulation: High Thermal Efficiency',
            '• Light Management: 100% Privacy Control',
            '• Build: Oxidation-resistant Aluminum hardware'
        ];
    }

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    let specY = techY + 22;
    specs.forEach(spec => {
        doc.text(spec, margin + 15, specY);
        specY += 6.5;
    });

    drawPageFooter(3);

    // --- PAGE 4: MATERIAL & BUILD ---
    doc.addPage();
    drawPageHeader('The Build Quality');

    doc.setTextColor(brandCharcoal[0], brandCharcoal[1], brandCharcoal[2]);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Engineering Excellence', margin, 55);

    const materials = [
        { t: 'Premium Sputtered Metalization', d: 'Our films use advanced sputtering technology for consistent performance.' },
        { t: 'Nano-Ceramic Layering', d: 'Crystal clear visibility with no radio interference or fading over time.' },
        { t: 'Multi-Directional Weave', d: 'Our blinds and wallpapers feature high-density fibers for tear resistance.' },
        { t: 'Eco-Friendly Adhesive', d: 'Zero VOC components ensuring health and safety for your family.' }
    ];

    let mY = 75;
    materials.forEach(m => {
        doc.setFillColor(250, 250, 250);
        doc.roundedRect(margin, mY, pageWidth - margin * 2, 25, 2, 2, 'F');
        doc.setTextColor(brandTeal[0], brandTeal[1], brandTeal[2]);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(m.t, margin + 5, mY + 10);
        doc.setTextColor(80, 80, 80);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(m.d, margin + 5, mY + 18);
        mY += 30;
    });

    // Partner brands - Major USP (Displaying individual vendor logos)
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brandCharcoal[0], brandCharcoal[1], brandCharcoal[2]);
    doc.text('Authorized Material Partners', margin, 205);

    let vendorX = margin;
    const vendorY = 212;
    const targetH = 12; // Fixed height for all logos to align them

    if (vendor3M) {
        const ratio = vendor3M.width / vendor3M.height;
        doc.addImage(vendor3M.dataURL, 'PNG', vendorX, vendorY, targetH * ratio, targetH, undefined, 'FAST');
        vendorX += (targetH * ratio) + 15;
    }
    if (vendorGarware) {
        const ratio = vendorGarware.width / vendorGarware.height;
        doc.addImage(vendorGarware.dataURL, 'PNG', vendorX, vendorY, targetH * ratio, targetH, undefined, 'FAST');
        vendorX += (targetH * ratio) + 15;
    }
    if (vendorSGSG) {
        const ratio = vendorSGSG.width / vendorSGSG.height;
        doc.addImage(vendorSGSG.dataURL, 'PNG', vendorX, vendorY, targetH * ratio, targetH, undefined, 'FAST');
        vendorX += (targetH * ratio) + 15;
    }

    if (!vendor3M && !vendorGarware && !vendorSGSG) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('SunControl | Garware | 3M | Saint-Gobain | Premium European Imports', margin, 218);
    }

    drawPageFooter(4);

    // --- PAGE 5: THE ADVANTAGE ---
    doc.addPage();
    drawPageHeader('Why Choose GlassFilm');

    doc.setTextColor(brandCharcoal[0], brandCharcoal[1], brandCharcoal[2]);
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text('The Performance Advantage', margin, 55);

    const perks = [
        { t: 'Energy Efficiency', d: 'Significant reduction in air conditioning load and electricity costs.' },
        { t: 'Furniture Protection', d: 'Prevents fading of rugs, upholstery, and wooden flooring from UV damage.' },
        { t: 'Visual Comfort', d: 'Creates a glare-free environment, ideal for high-productivity offices and homes.' },
        { t: 'Professional Finish', d: 'Custom measured and installed by factory-trained technicians for a flawless look.' }
    ];

    const blockW = (pageWidth - margin * 2 - 8) / 2;
    const blockH = 55;

    perks.forEach((p, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const bX = margin + (col * (blockW + 8));
        const bY = 70 + (row * (blockH + 8));

        // Block Background
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(bX, bY, blockW, blockH, 2, 2, 'F');

        // Left Decorative Accent
        doc.setFillColor(brandTeal[0], brandTeal[1], brandTeal[2]);
        doc.rect(bX, bY, 4, blockH, 'F');

        // Text Content
        doc.setTextColor(brandTeal[0], brandTeal[1], brandTeal[2]);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(p.t, bX + 10, bY + 12);

        doc.setTextColor(80, 80, 80);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const pDesc = doc.splitTextToSize(p.d, blockW - 20);
        doc.text(pDesc, bX + 10, bY + 22);
    });

    // Final USP Block
    const uspY = 200;
    doc.setFillColor(brandTeal[0], brandTeal[1], brandTeal[2]);
    doc.roundedRect(margin, uspY, pageWidth - (margin * 2), 40, 3, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Sustainable Luxury. Unmatched Protection.', pageWidth / 2, uspY + 18, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Every installation combines cutting-edge solar technology with designer aesthetics.', pageWidth / 2, uspY + 28, { align: 'center' });

    drawPageFooter(5);

    // --- PAGE 6: FAQ & INSTALLATION ---
    doc.addPage();
    drawPageHeader('Customer Support');

    // Section 1: Common Questions Block Design
    doc.setTextColor(brandCharcoal[0], brandCharcoal[1], brandCharcoal[2]);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Common Questions', margin, 48);

    const faqs = [
        { q: 'Q: How durable is it?', a: 'Our products are designed for 10+ years of high performance.' },
        { q: 'Q: Do you serve multi-cities?', a: 'Yes, we have specialized teams for corporate projects nationwide.' },
        { q: 'Q: What about warranty?', a: 'Enjoy low-cost maintenance and a 5-year international warranty.' }
    ];

    let faqY = 56;
    faqs.forEach(f => {
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, faqY, pageWidth - margin * 2, 16, 1.5, 1.5, 'F');
        doc.setFillColor(brandTeal[0], brandTeal[1], brandTeal[2]);
        doc.rect(margin, faqY, 3, 16, 'F');

        doc.setTextColor(brandTeal[0], brandTeal[1], brandTeal[2]);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(f.q, margin + 8, faqY + 6);

        doc.setTextColor(100, 100, 100);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(f.a, margin + 8, faqY + 11);
        faqY += 19;
    });

    // Section 2: Installation Method Block Design
    const procY = faqY + 12;
    doc.setTextColor(brandCharcoal[0], brandCharcoal[1], brandCharcoal[2]);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Our Proven 7 Steps Installation Method', margin, procY);

    // Dynamic 7-Step Installation Process based on Category
    let steps = [];
    if (lowerCat.includes('film')) {
        steps = [
            { t: 'Measure & Pre-Cut', s: 'Measure glass and cut film with 2cm bleed.' },
            { t: 'Deep Clean Glass', s: 'Scrape and squeegee using soapy solution.' },
            { t: 'Prepare Slip Solution', s: 'Mix water with baby shampoo for easy adjustment.' },
            { t: 'Remove Backing Liner', s: 'Peel and soak the adhesive side with slip solution.' },
            { t: 'Apply to Window', s: 'Position film on soaking wet glass; slide into place.' },
            { t: 'Squeegee Out Water', s: 'Push bubbles from center out with firm strokes.' },
            { t: 'Trim & Finished', s: 'Trim excess; leave 1mm gap for perfect drainage.' }
        ];
    } else if (lowerCat.includes('wallpaper')) {
        steps = [
            { t: 'Measure & Plan', s: 'Measure wall dimensions and check pattern matching.' },
            { t: 'Surface Preparation', s: 'Ensure walls are smooth, dry, and primed for bonding.' },
            { t: 'Prepare Adhesive', s: 'Mix premium non-toxic wallpaper paste for long life.' },
            { t: 'Apply Adhesive', s: 'Evenly coat the wall or wallpaper back for perfect grip.' },
            { t: 'Align & Position', s: 'Place the first drop vertically using a spirit level.' },
            { t: 'Smooth Out Bubbles', s: 'Use a wallpaper brush to remove air and excess paste.' },
            { t: 'Trim & Detail', s: 'Precision-cut edges at ceiling and skirting for a flush fit.' }
        ];
    } else {
        steps = [
            { t: 'Verify Dimensions', s: 'Double-check window depth and width for a perfect fit.' },
            { t: 'Mark Bracket Points', s: 'Mark drill spots for wall or ceiling mount stability.' },
            { t: 'Install Brackets', s: 'Secure heavy-duty brackets using wall plugs and screws.' },
            { t: 'Mount the Blind', s: 'Snap the blind headrail into the brackets securely.' },
            { t: 'Check Leveling', s: 'Ensure the blind hangs straight for smooth operation.' },
            { t: 'Secure Safety Cleat', s: 'Install child-safety cord tensioners as per safety norms.' },
            { t: 'Functional Test', s: 'Test the roll/zebra mechanism for effortless movement.' }
        ];
    }

    let instY = procY + 8;
    steps.forEach((step, i) => {
        // Step Block
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, instY, pageWidth - margin * 2, 15, 1.5, 1.5, 'F');

        // Circular Number Avatar
        doc.setFillColor(brandTeal[0], brandTeal[1], brandTeal[2]);
        doc.circle(margin + 6, instY + 7.5, 4, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text((i + 1).toString(), margin + 4.5, instY + 8.8);

        // Step Content
        doc.setTextColor(brandCharcoal[0], brandCharcoal[1], brandCharcoal[2]);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(step.t, margin + 15, instY + 6);

        doc.setTextColor(120, 120, 120);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(step.s, margin + 15, instY + 11);

        instY += 18;
    });

    drawPageFooter(6);

    // --- PAGE 7: CONTACT & CLOSE ---
    doc.addPage();
    // Luxurious closing background
    doc.setFillColor(brandTeal[0], brandTeal[1], brandTeal[2]);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    if (heroBase64) {
        // Set opacity to 15% for the closing background image
        doc.setGState(new (doc as any).GState({ opacity: 0.15 }));
        doc.addImage(heroBase64, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
        // Reset opacity back to 100%
        doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
    }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(48);
    doc.setFont('helvetica', 'bold');
    doc.text('LET\'S CREATE', margin, 80);
    doc.text('SOMETHING', margin, 100);
    doc.text('STUNNING.', margin, 120);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Schedule Your Free Consultation Today', margin, 140);

    // CTA Box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, 160, pageWidth - margin * 2, 85, 5, 5, 'F');

    if (logoBase64) {
        doc.addImage(logoBase64, 'PNG', margin + 12, 168, 36, 9, undefined, 'FAST');
    }

    if (qrBase64) {
        // Place QR Code on the right
        doc.addImage(qrBase64, 'PNG', pageWidth - margin - 35, 168, 25, 25, undefined, 'FAST');
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        doc.text('Scan for Portfolio', pageWidth - margin - 22.5, 196, { align: 'center' });
    }

    doc.setTextColor(brandTeal[0], brandTeal[1], brandTeal[2]);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text('Corporate Contact', margin + 12, 185);

    doc.setTextColor(brandCharcoal[0], brandCharcoal[1], brandCharcoal[2]);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Manish Kumar:', margin + 12, 194);
    doc.setFont('helvetica', 'normal');
    doc.text('+91 9958360741', margin + 45, 194);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Corporate Office:', margin + 12, 203);
    doc.setFont('helvetica', 'normal');
    const addr1 = '1 Roza, Jalalpur, Roza Jalalpur, Greater Noida, Gautambuddha Nagar, Uttar Pradesh, 203207';
    doc.text(addr1, margin + 12, 208);

    doc.setFont('helvetica', 'bold');
    doc.text('Branch Office:', margin + 12, 217);
    doc.setFont('helvetica', 'normal');
    const addr2 = 'WZ-23, Office No. 02, First Floor, Ram Complex, Jwalaheri, Paschim Vihar, New Delhi - 110063';
    doc.text(addr2, margin + 12, 222);

    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('SERVING 100+ CITIES | 10,000+ COMPLETED PROJECTS', pageWidth / 2, pageHeight - 20, { align: 'center' });

    // --- SAVE ---
    const fileName = product.name.replace(/\s+/g, '_') + '_Official_Brochure.pdf';
    doc.save(fileName);
};

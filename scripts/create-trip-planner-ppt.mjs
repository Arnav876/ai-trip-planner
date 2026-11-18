import fs from 'node:fs/promises';
import path from 'node:path';
import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';

const outDir = path.resolve('deliverables');
const finalPptx = path.join(outDir, 'AI_Trip_Planner_Animated_Synopsis.pptx');
const tempPptx = path.join(outDir, 'AI_Trip_Planner_Animated_Synopsis.base.pptx');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Codex';
pptx.subject = 'AI Trip Planner project synopsis';
pptx.title = 'AI Trip Planner';
pptx.company = 'OpenAI';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: 'Aptos Display',
  bodyFontFace: 'Aptos',
  lang: 'en-US',
};
pptx.defineLayout({ name: 'LAYOUT_WIDE', width: 13.333, height: 7.5 });

const C = {
  ink: '17211F',
  muted: '5E6B67',
  rule: 'B8BCC4',
  panel: 'EDEDED',
  pale: 'F6F3EC',
  green: '215A51',
  blue: '3D8DFF',
  sky: '6DCBF4',
  orange: 'CE553A',
  white: 'FFFFFF',
};

function addTitle(slide, title, kicker = 'AI TRIP PLANNER') {
  slide.addText(kicker, {
    x: 0.55,
    y: 0.32,
    w: 3.1,
    h: 0.25,
    fontFace: 'Aptos',
    fontSize: 8,
    bold: true,
    color: C.orange,
    charSpace: 1.2,
    margin: 0,
  });
  slide.addText(title, {
    x: 0.55,
    y: 0.75,
    w: 8.35,
    h: 0.65,
    fontFace: 'Aptos Display',
    fontSize: 30,
    bold: true,
    color: C.ink,
    margin: 0,
    breakLine: false,
    fit: 'shrink',
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.55,
    y: 1.55,
    w: 12.2,
    h: 0,
    line: { color: C.rule, width: 0.8 },
  });
}

function addFooter(slide, num) {
  slide.addText(String(num).padStart(2, '0'), {
    x: 12.25,
    y: 7.02,
    w: 0.45,
    h: 0.18,
    fontSize: 7,
    color: C.muted,
    margin: 0,
    align: 'right',
  });
}

function addChip(slide, text, x, y, w, fill = C.panel, color = C.ink) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.36,
    rectRadius: 0.03,
    fill: { color: fill },
    line: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.12,
    y: y + 0.09,
    w: w - 0.24,
    h: 0.13,
    fontSize: 9,
    bold: true,
    color,
    margin: 0,
    fit: 'shrink',
  });
}

function addNotes(slide, lines) {
  slide.addNotes([
    'Sources:',
    '- User-provided project brief in this conversation.',
    '- Local prototype files in /Users/arnavyadav/Project/OAI, including src/main.tsx and src/styles.css.',
    '',
    ...lines,
  ].join('\n'));
}

function cover() {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.1,
    y: 0,
    w: 4.23,
    h: 7.5,
    fill: { color: C.pale },
    line: { color: C.pale },
  });
  slide.addText('AI Trip Planner', {
    x: 0.7,
    y: 1.35,
    w: 7.25,
    h: 1.55,
    fontFace: 'Aptos Display',
    fontSize: 50,
    bold: true,
    color: C.ink,
    margin: 0,
    fit: 'shrink',
  });
  slide.addText('Minimal input. Complete itinerary. Budget-aware choices.', {
    x: 0.72,
    y: 3.1,
    w: 6.5,
    h: 0.6,
    fontSize: 23,
    color: C.muted,
    margin: 0,
    fit: 'shrink',
  });
  addChip(slide, 'Flights', 9.65, 1.15, 1.45, C.green, C.white);
  addChip(slide, 'Hotels', 10.9, 2.08, 1.45, C.blue, C.white);
  addChip(slide, 'Conveyance', 9.4, 3.08, 2.1, C.panel);
  addChip(slide, 'Places', 10.75, 4.08, 1.45, C.orange, C.white);
  addChip(slide, 'Food', 9.85, 5.1, 1.2, C.sky);
  slide.addShape(pptx.ShapeType.line, { x: 10.35, y: 1.5, w: 0.75, h: 0.58, line: { color: C.rule, width: 1.1 } });
  slide.addShape(pptx.ShapeType.line, { x: 10.65, y: 2.45, w: -0.25, h: 0.63, line: { color: C.rule, width: 1.1 } });
  slide.addShape(pptx.ShapeType.line, { x: 10.45, y: 3.45, w: 0.62, h: 0.62, line: { color: C.rule, width: 1.1 } });
  slide.addShape(pptx.ShapeType.line, { x: 10.55, y: 4.45, w: -0.18, h: 0.65, line: { color: C.rule, width: 1.1 } });
  slide.addText('Animated synopsis deck', { x: 0.72, y: 6.8, w: 3.0, h: 0.25, fontSize: 11, color: C.muted, margin: 0 });
  addNotes(slide, ['Opening slide frames the project as a practical product prototype.']);
}

function problem() {
  const slide = pptx.addSlide();
  addTitle(slide, 'Trip planning breaks when choices do not talk to each other.');
  const left = [
    ['Fragmented search', 'Flights, stays, cabs, places, and food are usually planned in separate tabs.'],
    ['Budget drift', 'One attractive upgrade can quietly make the rest of the trip unaffordable.'],
    ['Repeated details', 'Family traveler information is typed again at each booking step.'],
  ];
  left.forEach(([h, b], i) => {
    const y = 2.0 + i * 1.25;
    slide.addText(`0${i + 1}`, { x: 0.72, y, w: 0.55, h: 0.28, fontSize: 16, bold: true, color: C.blue, margin: 0 });
    slide.addText(h, { x: 1.45, y: y - 0.02, w: 3.0, h: 0.3, fontSize: 18, bold: true, color: C.ink, margin: 0 });
    slide.addText(b, { x: 1.45, y: y + 0.35, w: 4.25, h: 0.42, fontSize: 12.5, color: C.muted, margin: 0, fit: 'shrink' });
  });
  slide.addShape(pptx.ShapeType.rect, { x: 7.08, y: 1.92, w: 4.95, h: 3.86, fill: { color: C.pale }, line: { color: C.pale } });
  slide.addText('The opportunity', { x: 7.45, y: 2.28, w: 2.6, h: 0.28, fontSize: 18, bold: true, color: C.green, margin: 0 });
  slide.addText('A planner that treats travel as a connected system can recommend a realistic package, not just isolated deals.', {
    x: 7.45,
    y: 2.88,
    w: 3.95,
    h: 1.35,
    fontSize: 24,
    bold: true,
    color: C.ink,
    margin: 0,
    fit: 'shrink',
    breakLine: false,
  });
  addFooter(slide, 2);
  addNotes(slide, ['Problem statement is synthesized from the user brief requirements.']);
}

function solution() {
  const slide = pptx.addSlide();
  addTitle(slide, 'The product builds one coordinated plan from five searches.');
  const items = ['Flights', 'Hotels', 'Conveyance', 'Places', 'Food'];
  items.forEach((item, i) => {
    const x = 0.85 + i * 2.45;
    slide.addShape(pptx.ShapeType.ellipse, { x, y: 2.15, w: 0.55, h: 0.55, fill: { color: [C.green, C.blue, C.sky, C.orange, C.panel][i] }, line: { color: [C.green, C.blue, C.sky, C.orange, C.panel][i] } });
    slide.addText(item, { x: x - 0.28, y: 2.88, w: 1.1, h: 0.25, fontSize: 13, bold: true, align: 'center', color: C.ink, margin: 0 });
    if (i < items.length - 1) {
      slide.addShape(pptx.ShapeType.line, { x: x + 0.62, y: 2.43, w: 1.48, h: 0, line: { color: C.rule, width: 1.2, beginArrowType: 'none', endArrowType: 'triangle' } });
    }
  });
  slide.addShape(pptx.ShapeType.rect, { x: 1.05, y: 4.35, w: 11.2, h: 1.15, fill: { color: C.ink }, line: { color: C.ink } });
  slide.addText('Budget-aware selection engine', { x: 1.35, y: 4.62, w: 4.2, h: 0.3, fontSize: 24, bold: true, color: C.white, margin: 0 });
  slide.addText('Ranks each category as Best, Cheapest, or Most comfortable, then refreshes the remaining choices when one preference changes.', {
    x: 5.45,
    y: 4.55,
    w: 6.15,
    h: 0.38,
    fontSize: 14.5,
    color: C.white,
    margin: 0,
    fit: 'shrink',
  });
  addFooter(slide, 3);
  addNotes(slide, ['Five search categories and ranked option logic are direct requirements from the user brief.']);
}

function userJourney() {
  const slide = pptx.addSlide();
  addTitle(slide, 'The user journey stays short from profile to booking.');
  const steps = [
    ['Sign up', 'Name, phone, and email create a reusable profile.'],
    ['Add family', 'Traveler details are saved for final booking.'],
    ['Enter trip', 'Origin, destination, dates, travelers, and budget.'],
    ['Review plan', 'AI-ranked choices are shown together.'],
    ['Book', 'Each option links to the booking portal.'],
  ];
  slide.addShape(pptx.ShapeType.line, { x: 1.05, y: 3.2, w: 11.1, h: 0, line: { color: C.rule, width: 1.2 } });
  steps.forEach(([h, b], i) => {
    const x = 0.82 + i * 2.45;
    slide.addShape(pptx.ShapeType.ellipse, { x, y: 2.92, w: 0.56, h: 0.56, fill: { color: i === 4 ? C.orange : C.white }, line: { color: i === 4 ? C.orange : C.ink, width: 1.2 } });
    slide.addText(String(i + 1), { x, y: 3.08, w: 0.56, h: 0.12, fontSize: 10, bold: true, align: 'center', color: i === 4 ? C.white : C.ink, margin: 0 });
    slide.addText(h, { x: x - 0.3, y: 3.86, w: 1.18, h: 0.25, fontSize: 15, bold: true, align: 'center', color: C.ink, margin: 0 });
    slide.addText(b, { x: x - 0.52, y: 4.3, w: 1.62, h: 0.65, fontSize: 10.5, color: C.muted, align: 'center', valign: 'top', margin: 0.02, fit: 'shrink' });
  });
  addFooter(slide, 4);
  addNotes(slide, ['Journey stages follow the "How It Works" sequence supplied by the user.']);
}

function rankings() {
  const slide = pptx.addSlide();
  addTitle(slide, 'Ranking gives users control without restarting planning.');
  const rows = [
    ['Best', 'Balanced price, quality, time, and convenience.', C.green],
    ['Cheapest', 'Lowest viable cost while keeping the trip complete.', C.blue],
    ['Most comfortable', 'Prioritizes direct routes, better stays, and easier transfers.', C.orange],
  ];
  rows.forEach(([rank, desc, color], i) => {
    const y = 2.0 + i * 1.25;
    slide.addText(rank, { x: 0.78, y, w: 2.8, h: 0.34, fontSize: 22, bold: true, color, margin: 0 });
    slide.addText(desc, { x: 3.55, y: y + 0.03, w: 5.3, h: 0.25, fontSize: 15.5, color: C.ink, margin: 0, fit: 'shrink' });
    slide.addShape(pptx.ShapeType.line, { x: 0.78, y: y + 0.72, w: 8.5, h: 0, line: { color: C.rule, width: 0.7 } });
  });
  slide.addText('When the user changes one category, the planner recalculates the other categories to preserve the best overall combination for the budget.', {
    x: 9.55,
    y: 2.05,
    w: 2.25,
    h: 2.35,
    fontSize: 20,
    bold: true,
    color: C.ink,
    margin: 0,
    fit: 'shrink',
  });
  addFooter(slide, 5);
  addNotes(slide, ['Ranking labels and refresh behavior come from the user brief.']);
}

function prototype() {
  const slide = pptx.addSlide();
  addTitle(slide, 'The current prototype already demonstrates the core flow.');
  const blocks = [
    ['Profile', 'Name, phone, email, and login state'],
    ['Family', 'Reusable traveler records'],
    ['Trip input', 'Origin, destination, dates, travelers, budget'],
    ['Plan results', 'Five recommendation categories with rankings'],
    ['Budget status', 'Estimated spend and remaining budget'],
    ['Booking links', 'Redirects to relevant portals'],
  ];
  blocks.forEach(([h, b], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 4.05;
    const y = 2.05 + row * 1.65;
    slide.addShape(pptx.ShapeType.rect, { x, y, w: 3.25, h: 1.05, fill: { color: row === 0 ? C.pale : C.panel }, line: { color: row === 0 ? C.pale : C.panel } });
    slide.addText(h, { x: x + 0.2, y: y + 0.18, w: 2.7, h: 0.22, fontSize: 16, bold: true, color: C.ink, margin: 0 });
    slide.addText(b, { x: x + 0.2, y: y + 0.55, w: 2.8, h: 0.28, fontSize: 11.5, color: C.muted, margin: 0, fit: 'shrink' });
  });
  addFooter(slide, 6);
  addNotes(slide, ['Prototype details are based on local React implementation in src/main.tsx.']);
}

function tech() {
  const slide = pptx.addSlide();
  addTitle(slide, 'The build is ready for richer AI and booking integrations.');
  slide.addChart(pptx.ChartType.bar, [
    { name: 'Prototype readiness', labels: ['UI flow', 'Ranked options', 'Budget logic', 'Live web search', 'Booking API'], values: [90, 80, 75, 30, 20] },
  ], {
    x: 0.72,
    y: 2.05,
    w: 6.45,
    h: 3.7,
    catAxisLabelFontFace: 'Aptos',
    catAxisLabelFontSize: 9,
    valAxisLabelFontSize: 8,
    showLegend: false,
    showValue: true,
    valAxisMinVal: 0,
    valAxisMaxVal: 100,
    valAxisMajorUnit: 25,
    chartColors: [C.blue],
  });
  slide.addText('Implementation base', { x: 8.0, y: 2.12, w: 2.8, h: 0.3, fontSize: 20, bold: true, color: C.green, margin: 0 });
  slide.addText('React + Vite prototype, Motion Primitives support, responsive CSS, local recommendation model, and external booking redirects.', {
    x: 8.0,
    y: 2.75,
    w: 3.45,
    h: 1.5,
    fontSize: 18,
    color: C.ink,
    bold: true,
    margin: 0,
    fit: 'shrink',
  });
  slide.addText('Next integrations should focus on web search APIs, price freshness, authentication, traveler data security, and real booking partner handoffs.', {
    x: 8.0,
    y: 4.7,
    w: 3.5,
    h: 0.78,
    fontSize: 13,
    color: C.muted,
    margin: 0,
    fit: 'shrink',
  });
  addFooter(slide, 7);
  addNotes(slide, ['Readiness levels are qualitative estimates based on the current local prototype and remaining requested capabilities.']);
}

function close() {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  slide.addText('AI Trip Planner turns a budget and a few trip details into a coordinated booking-ready plan.', {
    x: 0.72,
    y: 1.05,
    w: 10.8,
    h: 1.65,
    fontFace: 'Aptos Display',
    fontSize: 39,
    bold: true,
    color: C.ink,
    margin: 0,
    fit: 'shrink',
  });
  slide.addShape(pptx.ShapeType.line, { x: 0.75, y: 3.35, w: 11.7, h: 0, line: { color: C.rule, width: 1 } });
  const actions = [
    'Connect live travel search APIs',
    'Add secure profile and traveler storage',
    'Validate ranking with real prices',
    'Deep-link booking handoffs',
  ];
  actions.forEach((a, i) => {
    slide.addText(a, { x: 1.0 + (i % 2) * 5.8, y: 4.05 + Math.floor(i / 2) * 0.82, w: 4.9, h: 0.34, fontSize: 20, bold: true, color: i === 3 ? C.orange : C.green, margin: 0, fit: 'shrink' });
  });
  slide.addText('Next step: move from simulated recommendations to live search-backed plans.', { x: 0.75, y: 6.72, w: 6.5, h: 0.3, fontSize: 13, color: C.muted, margin: 0 });
  addFooter(slide, 8);
  addNotes(slide, ['Closing recommendations are based on the gap between the brief and the current prototype.']);
}

function addSlideTransitions(pptxBytes) {
  return JSZip.loadAsync(pptxBytes).then(async (zip) => {
    const slideNames = Object.keys(zip.files)
      .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
      .sort((a, b) => Number(a.match(/slide(\d+)/)[1]) - Number(b.match(/slide(\d+)/)[1]));

    const transitions = [
      '<p:transition spd="med"><p:fade/></p:transition>',
      '<p:transition spd="med"><p:push dir="l"/></p:transition>',
      '<p:transition spd="med"><p:wipe dir="l"/></p:transition>',
      '<p:transition spd="med"><p:split orient="horz" dir="out"/></p:transition>',
      '<p:transition spd="med"><p:fade/></p:transition>',
      '<p:transition spd="med"><p:push dir="u"/></p:transition>',
      '<p:transition spd="med"><p:wipe dir="r"/></p:transition>',
      '<p:transition spd="med"><p:fade/></p:transition>',
    ];

    for (const [idx, name] of slideNames.entries()) {
      let xml = await zip.file(name).async('string');
      xml = xml.replace(/<p:transition[\s\S]*?<\/p:transition>/, '');
      const transition = transitions[idx] ?? transitions[0];
      if (xml.includes('</p:clrMapOvr>')) {
        xml = xml.replace('</p:clrMapOvr>', `</p:clrMapOvr>${transition}`);
      } else {
        xml = xml.replace('</p:cSld>', `</p:cSld>${transition}`);
      }
      zip.file(name, xml);
    }
    return zip.generateAsync({ type: 'nodebuffer' });
  });
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  cover();
  problem();
  solution();
  userJourney();
  rankings();
  prototype();
  tech();
  close();

  await pptx.writeFile({ fileName: tempPptx });
  const patched = await addSlideTransitions(await fs.readFile(tempPptx));
  await fs.writeFile(finalPptx, patched);
  await fs.rm(tempPptx, { force: true });
  console.log(finalPptx);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

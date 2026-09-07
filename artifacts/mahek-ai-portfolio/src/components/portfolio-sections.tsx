import { useEffect, useMemo, useState } from 'react';
import resumePdf from '@assets/Mahek_Shaikh_Resume_July2026_1788790778093.pdf';
import {
  ArrowDownRight, ArrowUpRight, ChevronDown, ChevronRight, CircleDot, Download, ExternalLink,
  Github, Layers3, Linkedin, Mail, Menu, Network, Orbit, Search, X,
} from 'lucide-react';

type Project = {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  status?: string;
  metric?: string;
  metricLabel?: string;
  accent: string;
  tags: string[];
  problem: string;
  approach: string;
  result: string;
  significance: string;
  nodes: string[];
  github?: string;
};

const projects: Project[] = [
  {
    id: 'audio', number: '01', category: 'SPEECH & AUDIO AI  /  TRUSTWORTHY AI',
    title: 'Uncertainty-Aware Audio Content Classification',
    description: 'Developing an uncertainty-aware environmental sound classification framework using Wav2Vec2 self-supervised representations with Bayesian Monte Carlo Dropout and calibration analysis.',
    status: 'ONGOING RESEARCH', metric: '38.4% → 75%', metricLabel: 'classification accuracy · reported result',
    accent: '#8aaeff', tags: ['Wav2Vec2', 'MC Dropout', 'Predictive Entropy', 'Calibration'],
    problem: 'Environmental sound classifiers can be right for the wrong reasons. The system needs a useful prediction and a transparent account of confidence.',
    approach: 'Self-supervised audio representations feed a classification head, then repeated stochastic forward passes estimate predictive uncertainty.',
    result: 'Improved the reported classification accuracy from a 38.4% baseline to 75%. Uncertainty estimation, calibration, and reliability analysis remain under investigation.',
    significance: 'A study in making audio AI more honest about what it does not know.',
    nodes: ['Audio', 'Wav2Vec2', 'Representation', 'Classifier', 'MC Dropout', 'Prediction + Uncertainty', 'Calibration'],
    github: 'https://github.com/Mahek3108/audio-content-classification',
  },
  {
    id: 'honeypot', number: '02', category: 'AGENTIC AI  /  LLMs  /  CYBERSECURITY',
    title: 'Agentic AI Honeypot for Scam Intelligence',
    description: 'An LLM-powered multi-turn conversational honeypot designed to engage suspected scammers and extract actionable intelligence.',
    metric: 'Top 2%', metricLabel: 'of 40,000+ participants · AI Impact Buildathon 2026',
    accent: '#b1a1f4', tags: ['Python', 'Flask', 'Gemini', 'OpenRouter', 'Tool Calling'],
    problem: 'Scam conversations contain fragmented signals: phone numbers, bank details, UPI handles, email addresses, and phishing URLs.',
    approach: 'A context-aware conversational agent sustains a multi-turn interaction, chooses tools, and routes extracted entities into an intelligence report.',
    result: 'The project reached the AI Impact Buildathon 2026 Grand Finale / Finalist stage. The certificate-verified result is Top 2% of 40,000+ participants.',
    significance: 'An agent designed for information gathering, not just conversation.',
    nodes: ['Suspected Scammer', 'Conversational Agent', 'Session / Context', 'LLM', 'Information Extraction', 'Intelligence Report'],
    github: 'https://github.com/Mahek3108/Agentic-Honeypot',
  },
  {
    id: 'pinn', number: '03', category: 'PREDICTIVE MAINTENANCE  /  SCIENTIFIC ML',
    title: 'Physics-Informed Neural Networks for Li-ion Battery Degradation & RUL Prediction',
    description: 'Developing a Physics-Informed Neural Network that integrates electrochemical degradation constraints with data-driven learning to estimate battery Remaining Useful Life and battery health scores.',
    status: 'ONGOING RESEARCH',
    accent: '#92c9b3', tags: ['PINNs', 'RUL Prediction', 'Battery Degradation', 'Health Scoring'],
    problem: 'Battery degradation is governed by domain dynamics that purely data-driven models may not respect outside their training distribution.',
    approach: 'Battery / sensor data and physics constraints are combined inside a physics-informed loss before degradation modeling.',
    result: 'The research is ongoing. No accuracy, RMSE, MAE, R², or percentage improvement is claimed at this stage.',
    significance: 'A research direction connecting physical reasoning with learned representations.',
    nodes: ['Battery / Sensor Data', 'Physics Constraints', 'Physics-Informed Loss', 'Neural Network', 'Degradation Model', 'RUL + Health Score'],
  },
  {
    id: 'lung', number: '04', category: 'COMPUTER VISION  /  MEDICAL AI',
    title: 'Lung Cancer Classification Using Feature Attention Pyramid Network',
    description: 'Achieved 98.4% accuracy on CT-scan classification using a pretrained ResNet-50 feature extractor combined with an attention-based feature processing mechanism and dense ANN classifier.',
    metric: '98.4%', metricLabel: 'accuracy · reported project performance',
    accent: '#cf9fbd', tags: ['ResNet-50', 'CNN', 'Attention', 'ANN', 'Medical Imaging'],
    problem: 'CT-scan classification requires multi-scale feature processing rather than relying on a single undifferentiated representation.',
    approach: 'A pretrained ResNet-50 extracts features, an attention pyramid processes salient patterns, and a dense ANN performs classification.',
    result: 'Reported project performance: 98.4% accuracy. This is not a claim of clinical deployment performance.',
    significance: 'An experiment in attention-guided feature extraction for medical imaging.',
    nodes: ['CT Scan', 'ResNet-50 Features', 'Attention Pyramid', 'Dense ANN', 'Classification'],
    github: 'https://github.com/Mahek3108/feature-pyramid-network-lung-cancer-classification',
  },
  {
    id: 'rag', number: '05', category: 'GENERATIVE AI  /  RAG  /  NLP',
    title: 'LLM & RAG Model for Financial Data Analysis',
    description: 'A retrieval-augmented system that moves from financial documents to semantically grounded, context-aware responses.',
    accent: '#c3b48b', tags: ['LLaMA', 'FAISS', 'Sentence Transformers', 'RAG', 'Prompt Engineering'],
    problem: 'A language model alone does not know the current contents of a private financial corpus.',
    approach: 'Documents are ingested, chunked, embedded, retrieved through FAISS, and assembled into a context window for LLaMA.',
    result: 'The system architecture makes retrieval visible: Query → Retrieval → Context → LLM → Answer.',
    significance: 'A compact example of grounding generation in a searchable knowledge layer.',
    nodes: ['Documents', 'Ingestion', 'Chunking', 'Embeddings', 'FAISS', 'Retriever', 'LLaMA', 'Answer'],
    github: 'https://github.com/Mahek3108/Question-generation-t5-model-RAG',
  },
];

const skillGroups: Array<[string, string[]]> = [
  ['FOUNDATION MODELS & GENERATIVE AI', ['LLaMA', 'Mistral 7B', 'RAG', 'FAISS', 'LangChain', 'Ollama', 'Rasa', 'Tool Calling', 'ReAct', 'Sentence Transformers', 'LoRA / PEFT']],
  ['DEEP LEARNING', ['PyTorch', 'TensorFlow', 'CNNs', 'Transformers', 'LSTM Autoencoders', 'Transfer Learning']],
  ['SPEECH & AUDIO AI', ['Wav2Vec2', 'Self-Supervised Learning', 'Speech Representation Learning', 'Environmental Sound Classification', 'Bayesian Monte Carlo Dropout', 'Uncertainty Estimation']],
  ['COMPUTER VISION', ['YOLOv8', 'Object Detection', 'Image Classification', 'Dataset Creation', 'Annotation']],
  ['PREDICTIVE / SCIENTIFIC AI', ['PINNs', 'RUL Prediction', 'Battery Degradation', 'Health Scoring', 'Time-Series Modeling', 'Anomaly Detection', 'Isolation Forest']],
  ['MLOPS & DEPLOYMENT', ['Docker', 'Git', 'Linux', 'Azure', 'FastAPI', 'Flask', 'Streamlit', 'Dash', 'Render', 'GPU Optimization', 'Model Versioning']],
  ['SOFTWARE ENGINEERING', ['REST APIs', 'SSH Remote Development', 'HLD', 'LLD', 'Modular Design', 'Technical Documentation']],
  ['MATHEMATICS & DATA', ['Probability', 'Statistics', 'Linear Algebra', 'Calculus', 'NumPy', 'Pandas', 'Scikit-learn']],
];

const skillUsage: Record<string, string> = {
  FAISS: 'Used in the LLM + RAG financial data analysis system for semantic retrieval.',
  Wav2Vec2: 'Used for self-supervised audio representations in uncertainty-aware environmental sound classification research.',
  PINNs: 'Used to investigate physics-guided battery degradation and RUL prediction.',
  YOLOv8: 'Used for custom dolphin detection with dataset creation, annotation, confidence-threshold tuning, and NMS optimization.',
  RAG: 'Used to combine retrieved financial document context with LLaMA generation.',
};

const experience = [
  { date: '06/2025 — 09/2025', role: 'Data Science Intern', org: 'Clint Solutions', color: '#8aaeff', intro: 'Built data products that moved from raw collection to public-facing monitoring.', cards: [
    ['Government-Recognized Beach Cleanup Dashboard', 'Dash + Flask + FastAPI + Render', 'Data → Backend / API → Processing → Dashboard → Real-Time Coastal Monitoring'],
    ['Dolphin Detection', '98% — Reported Detection Performance', 'Web Scraping → Dataset Creation → AI Annotation → YOLOv8 → Threshold + NMS Optimization'],
    ['Battery Research', 'Physics-Informed Neural Network', 'Battery degradation modeling · RUL estimation · Health scoring · Physics-based constraints'],
  ]},
  { date: '04/2025 — 05/2025', role: 'Machine Learning Intern', org: 'Anubrain Technologies', color: '#b1a1f4', intro: 'Applied deep learning to medical imaging and multimodal rehabilitation assessment.', cards: [
    ['Monkeypox Classification', '94% accuracy on the project evaluation', 'CNN · transfer learning · medical imaging'],
    ['Multimodal Assessment', 'Sensor fusion', 'Motion-capture data · multimodal deep learning · rehabilitation assessment'],
  ]},
  { date: '06/2024 — 08/2024', role: 'Data Science Intern', org: 'TheOther 2 Thirds Consulting LLP', color: '#92c9b3', intro: 'Production-minded LLM engineering: models, conversational analytics, dashboards, and deployment.', cards: [
    ['Multi-classification Transformers', '30% → 95% Classification Accuracy', 'Data curation · augmentation · fine-tuning'],
    ['Conversational Analytics', 'LLaMA + Mistral 7B + Rasa', 'AI chatbots · dashboard navigation · insight explanation · Azure · Linux · Git'],
  ]},
];

function SectionHeading({ index, title, sub }: { index: string; title: string; sub: string }) {
  return <div className="mb-12 flex items-start justify-between gap-6">
    <div><div className="eyebrow mb-3">{index} / system-notes</div><h2 className="display text-4xl font-semibold tracking-tight text-[#eef2f8] md:text-6xl">{title}</h2></div>
    <p className="hidden max-w-xs pt-2 text-sm leading-6 text-dim md:block">{sub}</p>
  </div>;
}

function Architecture({ nodes, accent, interactive = false }: { nodes: string[]; accent: string; interactive?: boolean }) {
  const [active, setActive] = useState(0);
  return <div className="my-7 flex flex-wrap items-center gap-2" data-testid="architecture-diagram">
    {nodes.map((node, index) => <div className="flex items-center gap-2" key={node}>
      <button type="button" onClick={() => interactive && setActive(index)} aria-label={`Inspect ${node}`} data-testid={`button-architecture-${node.toLowerCase().replaceAll(' ', '-')}`} className={`pipeline-node rounded-md border px-3 py-2 text-left mono text-[11px] transition ${interactive && active === index ? 'bg-[#202c47] text-[#eaf0ff]' : 'bg-[#11151e]/90 text-[#aab3c5] hover:border-[#809bd5]'}`} style={{ borderColor: interactive && active === index ? accent : undefined }}>{node}</button>
      {index < nodes.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-[#59657b]" aria-hidden="true" />}
    </div>)}
    {interactive && <div className="mt-3 w-full text-xs text-dim"><span className="mono text-[#8aaeff]">stage_{String(active + 1).padStart(2, '0')}</span> · {nodes[active]} is the current inspection point.</div>}
  </div>;
}

function ProjectCaseStudy({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  return <article className="glass flex h-full flex-col overflow-hidden rounded-2xl" data-testid={`card-project-${project.id}`}>
    <div className="flex flex-1 flex-col p-6 md:p-8">
      <div className="mb-5 flex items-start justify-between gap-4"><div><div className="eyebrow mb-3" style={{ color: project.accent }}>{project.number} / {project.category}</div><h3 className="display max-w-3xl text-2xl font-semibold text-[#eef2f8] md:text-3xl">{project.title}</h3></div><CircleDot className="mt-1 h-4 w-4 shrink-0" style={{ color: project.accent }} /></div>
      <p className="min-h-[7rem] max-w-3xl text-sm leading-7 text-dim">{project.description}</p>
      <div className="mt-7 flex min-h-[5.5rem] flex-wrap items-start justify-between gap-5">
        {project.metric ? <div><div className="display text-4xl font-semibold tracking-tight" style={{ color: project.accent }}>{project.metric}</div><div className="mono mt-1 text-[10px] uppercase tracking-[.14em] text-dim">{project.metricLabel}</div></div> : <div className="rounded border border-[#90cbb4]/30 bg-[#90cbb4]/[.06] px-3 py-2 mono text-[10px] tracking-[.12em] text-[#a8d5c3]">{project.status}</div>}
        <div className="flex flex-wrap gap-2">{project.tags.map(tag => <span className="rounded-full border border-[#a4b4d0]/15 px-2.5 py-1 mono text-[10px] text-[#a9b3c5]" key={tag}>{tag}</span>)}</div>
      </div>
      <Architecture nodes={project.nodes} accent={project.accent} interactive={project.id === 'honeypot' || project.id === 'rag'} />
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} data-testid={`button-expand-project-${project.id}`} className="group mt-auto flex items-center gap-2 pt-5 mono text-[11px] uppercase tracking-[.12em] text-[#a8bce8] hover:text-white">{open ? 'Collapse case study' : 'Inspect case study'}<ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} /></button>
    </div>
    {open && <div className="grid gap-5 border-t border-[#9aafd6]/10 bg-[#0e121a]/65 p-6 md:grid-cols-3 md:p-8 reveal">
      <div><div className="eyebrow mb-2">01 / problem</div><p className="text-sm leading-6 text-[#c7cedb]">{project.problem}</p></div>
      <div><div className="eyebrow mb-2">02 / approach</div><p className="text-sm leading-6 text-[#c7cedb]">{project.approach}</p></div>
      <div><div className="eyebrow mb-2">03 / evidence</div><p className="text-sm leading-6 text-[#c7cedb]">{project.result}</p></div>
      <div className="md:col-span-2"><div className="eyebrow mb-2">research significance</div><p className="text-sm leading-6 text-[#c7cedb]">{project.significance}</p></div>
      <div className="flex items-end md:justify-end">{project.github && <a href={project.github} target="_blank" rel="noreferrer" data-testid={`link-project-github-${project.id}`} className="inline-flex items-center gap-2 border-b border-[#8aaeff]/40 pb-1 mono text-[11px] text-[#a8bce8] hover:text-white">View repository <ArrowUpRight className="h-3.5 w-3.5" /></a>}</div>
    </div>}
  </article>;
}

function GithubSection() {
  const [state, setState] = useState<{ status: 'loading' | 'ready' | 'error'; repos: Array<Record<string, unknown>> }>({ status: 'loading', repos: [] });
  useEffect(() => {
    fetch('https://api.github.com/users/Mahek3108/repos?sort=updated&per_page=12')
      .then(response => response.ok ? response.json() : Promise.reject(new Error('GitHub unavailable')))
      .then(repos => setState({ status: 'ready', repos: Array.isArray(repos) ? repos : [] }))
      .catch(() => setState({ status: 'error', repos: [] }));
  }, []);
  const prioritized = useMemo(() => state.repos.filter(repo => ['Agentic-Honeypot', 'audio-content-classification', 'feature-pyramid-network-lung-cancer-classification', 'Question-generation-t5-model-RAG'].includes(String(repo.name))), [state.repos]);
  const list = prioritized.length ? prioritized : state.repos.slice(0, 6);
  return <section id="github" className="section-rule px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-6xl">
    <SectionHeading index="07" title="Engineering in public" sub="A live window into the repositories, experiments, and systems that make the work inspectable." />
    {state.status === 'loading' && <div className="grid gap-3 md:grid-cols-3">{[1, 2, 3].map(i => <div key={i} className="h-40 animate-pulse rounded-xl border border-[#9aafd6]/10 bg-[#151923]" />)}</div>}
    {state.status === 'error' && <div className="glass rounded-xl p-7" data-testid="status-github-error"><div className="eyebrow mb-2">connection / unavailable</div><p className="text-sm text-dim">GitHub repositories could not be loaded right now. The featured work above links directly to known public repositories.</p></div>}
    {state.status === 'ready' && !list.length && <div className="glass rounded-xl p-7" data-testid="status-github-empty"><p className="text-sm text-dim">No public repositories were returned by GitHub.</p></div>}
    {list.length > 0 && <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{list.map(repo => <a key={String(repo.id)} href={String(repo.html_url)} target="_blank" rel="noreferrer" className="glass group rounded-xl p-5 transition hover:-translate-y-1 hover:border-[#8aaeff]/45" data-testid={`card-repository-${String(repo.name)}`}><div className="mb-7 flex items-start justify-between"><Github className="h-4 w-4 text-[#a9bce7]" /><ArrowUpRight className="h-4 w-4 text-[#626d80] transition group-hover:text-white" /></div><h3 className="mono text-sm text-[#e8edf6]">{String(repo.name)}</h3><p className="mt-3 min-h-10 text-xs leading-5 text-dim">{String(repo.description || 'Public repository from Mahek Shaikh.')}</p><div className="mt-5 flex items-center gap-4 mono text-[10px] text-[#68748a]"><span>{String(repo.language || 'source')}</span><span>★ {String(repo.stargazers_count || 0)}</span><span>⑂ {String(repo.forks_count || 0)}</span></div></a>)}</div>}
  </div></section>;
}

export function Navigation() {
  const [menu, setMenu] = useState(false);
  const links = [['about', 'About'], ['projects', 'Projects'], ['research', 'Research'], ['experience', 'Experience'], ['engineering', 'Engineering'], ['achievements', 'Achievements'], ['contact', 'Contact']];
  return <header className="nav-blur fixed inset-x-0 top-0 z-50 border-b border-[#9aafd6]/10"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10"><a href="#home" className="flex items-center gap-3" data-testid="link-home"><span className="grid h-8 w-8 place-items-center rounded border border-[#8aaeff]/50 bg-[#8aaeff]/10 mono text-xs text-[#a8bce8]">MS</span><span className="hidden mono text-[11px] tracking-[.12em] text-[#d9e0ed] sm:block">MAHEK SHAIKH</span></a><nav className="hidden items-center gap-5 lg:flex">{links.map(([id, label]) => <a href={`#${id}`} key={id} data-testid={`link-nav-${id}`} className="mono text-[10px] uppercase tracking-[.1em] text-[#818b9d] transition hover:text-white">{label}</a>)}</nav><div className="hidden items-center gap-2 md:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#92c9b3]" /><span className="mono text-[10px] text-[#9ba6b8]">OPEN TO AI/ML, RESEARCH & CONTRACT ROLES</span></div><button type="button" aria-label="Toggle navigation" data-testid="button-toggle-navigation" className="text-[#b8c2d4] lg:hidden" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div>{menu && <nav className="border-t border-[#9aafd6]/10 bg-[#0d0f14] px-5 py-4 lg:hidden">{links.map(([id, label]) => <a onClick={() => setMenu(false)} href={`#${id}`} key={id} className="block border-b border-[#9aafd6]/10 py-3 mono text-[11px] uppercase tracking-[.1em] text-[#aab4c5]">{label}</a>)}</nav>}</header>;
}

export function Hero() {
  const nodes = ['DATA', 'REPRESENTATION', 'MODEL', 'EVALUATION', 'DEPLOYMENT'];
  const roleLabels = ['AI/ML ENGINEER', 'APPLIED AI RESEARCHER', 'LLM SYSTEMS BUILDER'];
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => setRoleIndex(index => (index + 1) % roleLabels.length), 3200);
    return () => window.clearInterval(interval);
  }, []);
  return <section id="home" className="relative min-h-[780px] px-5 pb-24 pt-36 md:px-10 md:pt-44"><div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]"><div className="reveal"><div className="eyebrow mb-7 flex items-center gap-3"><span className="h-px w-8 bg-[#8aaeff]" />Hi! I am Mahek Shaikh</div><div className="hero-role mb-5 flex items-center gap-3 mono text-[11px] uppercase tracking-[.16em] text-[#aab8d2]" aria-live="polite" data-testid="text-animated-role"><span className="h-px w-8 bg-[#8aaeff]/60" /><span key={roleLabels[roleIndex]} className="role-swap text-[#b9c8ec]">{roleLabels[roleIndex]}</span></div><h1 className="display max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.055em] text-[#f1f4f8] md:text-7xl lg:text-[5.9rem]">I build AI systems that go <span className="text-[#9db7f5]">beyond</span> predictions.</h1><p className="mt-8 max-w-2xl text-base leading-8 text-[#aab3c2] md:text-lg">From uncertainty-aware audio models and physics-informed neural networks to RAG systems and autonomous AI agents, I build intelligent systems that are designed to be understood, evaluated, engineered, and deployed.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#projects" data-testid="button-view-work" className="group inline-flex items-center gap-3 rounded-md border border-[#9aafd6]/35 bg-transparent px-5 py-3 mono text-[11px] font-medium uppercase tracking-[.08em] text-[#c3cede] transition hover:border-[#e9eef8] hover:bg-transparent hover:text-white">View my work <ArrowDownRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:translate-y-1" /></a><a href={resumePdf} download="Mahek-Shaikh-Resume-July-2026.pdf" data-testid="link-download-resume" className="inline-flex items-center gap-2 rounded-md border border-[#9aafd6]/25 px-5 py-3 mono text-[11px] uppercase tracking-[.08em] text-[#c3cede] hover:border-[#8aaeff] hover:text-white"><Download className="h-4 w-4" /> Download resume</a><a href="https://github.com/Mahek3108" target="_blank" rel="noreferrer" data-testid="link-hero-github" className="inline-flex items-center gap-2 rounded-md border border-[#9aafd6]/25 px-5 py-3 mono text-[11px] uppercase tracking-[.08em] text-[#c3cede] hover:border-[#8aaeff] hover:text-white"><Github className="h-4 w-4" /> GitHub</a><a href="https://www.linkedin.com/in/mahek-shaikh-35484a202/" target="_blank" rel="noreferrer" data-testid="link-hero-linkedin" className="inline-flex items-center gap-2 rounded-md border border-[#9aafd6]/25 px-5 py-3 mono text-[11px] uppercase tracking-[.08em] text-[#c3cede] hover:border-[#8aaeff] hover:text-white"><Linkedin className="h-4 w-4" /> LinkedIn</a></div></div><div className="glass grid-card rounded-2xl p-5 md:p-8 reveal" style={{ animationDelay: '.15s' }}><div className="mb-7 flex items-center justify-between"><div className="eyebrow">live pipeline / v.01</div><div className="flex items-center gap-2 mono text-[10px] text-[#8491a8]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8aaeff]" /> processing</div></div><div className="relative space-y-2">{nodes.map((node, index) => <div key={node}><div className="pipeline-node flex items-center justify-between rounded-lg border border-[#9aafd6]/15 bg-[#10141d]/90 px-4 py-4" style={{ animationDelay: `${index * .28}s` }}><span className="mono text-xs tracking-[.12em] text-[#e3e8f1]">{node}</span><span className="mono text-[10px] text-[#6f7b90]">0{index + 1}</span></div>{index < nodes.length - 1 && <div className="flow-line mx-auto h-5 w-px" />}</div>)}</div><div className="mt-8 grid grid-cols-3 gap-2 border-t border-[#9aafd6]/10 pt-5">{['CNNs', 'RAG / FAISS', 'PINNs'].map(t => <div className="mono text-center text-[10px] text-[#8792a6]" key={t}>{t}</div>)}</div></div></div><div className="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-5 border-t border-[#9aafd6]/12 pt-6 sm:grid-cols-5">{[['9.24/10', 'CGPA'], ['2', 'published papers'], ['Top 2%', 'of 40,000+'], ['15+ months', 'applied AI'], ['GATE', 'DS/AI + CS']].map(([value, label]) => <div key={label}><div className="display text-xl font-semibold text-[#e6ebf4]">{value}</div><div className="mono mt-1 text-[9px] uppercase tracking-[.12em] text-[#69758a]">{label}</div></div>)}</div><div className="absolute bottom-5 left-5 hidden items-center gap-3 mono text-[10px] text-[#5e6b80] md:flex"><span>19°04′N</span><span className="h-px w-16 bg-[#475267]" /><span>72°52′E / MUMBAI</span></div></section>;
}

export function About() {
  const principles: Array<[string, string, string, string[]]> = [
    ['01', 'Build beyond the model', 'A model is only one component of an AI system.', ['Data', 'Preprocessing', 'Representation', 'Model', 'Evaluation', 'Deployment', 'Monitoring']],
    ['02', 'Measure uncertainty', 'A prediction is more useful when we understand how confident the model is in that prediction.', ['Bayesian MC Dropout', 'Predictive Entropy', 'Variance Estimation', 'Expected Calibration Error', 'Reliability Analysis']],
    ['03', 'Combine learning with knowledge', 'Intelligent systems become more useful when learned representations meet retrieved information, physical constraints, or domain knowledge.', ['RAG', 'Physics-Informed Neural Networks', 'Domain Constraints', 'Multimodal Learning']],
    ['04', 'Research should become systems', 'Research ideas become useful when experiments turn into APIs, dashboards, inference pipelines, and deployed applications.', ['Research Idea', 'Experiment', 'Model', 'Evaluation', 'Software System', 'Deployment']],
  ];
  return <section id="about" className="section-rule px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading index="01" title="How I think about AI" sub="The engineering principles behind the work. Less model worship; more systems thinking." /><div className="grid gap-3 md:grid-cols-2">{principles.map(([num, title, body, items]) => <article className="glass rounded-xl p-6 md:p-8" key={num}><div className="mb-10 flex justify-between"><span className="mono text-sm text-[#8aaeff]">{num}</span><Layers3 className="h-5 w-5 text-[#64718b]" /></div><h3 className="display text-2xl font-semibold text-[#edf1f7]">{title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-dim">{body}</p><div className="mt-7 flex flex-wrap gap-2">{items.map(item => <span className="rounded border border-[#9aafd6]/13 bg-[#11151e]/70 px-2.5 py-2 mono text-[10px] text-[#a5afc1]" key={item}>{item}</span>)}</div></article>)}</div></div></section>;
}

export function Projects() {
  return <section id="projects" className="section-rule px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading index="02" title="Featured work" sub="Technical case studies, not project thumbnails. Each system is shown with its problem, architecture, evidence, and limits." /><div className="grid items-stretch gap-4 md:grid-cols-2">{projects.map(project => <ProjectCaseStudy key={project.id} project={project} />)}</div></div></section>;
}

export function Research() {
  return <section id="research" className="section-rule px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading index="03" title="Research, clearly labeled" sub="Published work and active investigations live in separate lanes. Claims stay close to the evidence." /><div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]"><article className="glass rounded-2xl p-6 md:p-8"><div className="mb-6 flex items-center justify-between"><div><div className="eyebrow mb-2 text-[#92c9b3]">ongoing research / 01</div><h3 className="display text-2xl font-semibold">Uncertainty-aware audio</h3></div><Orbit className="h-5 w-5 text-[#8aaeff]" /></div><Architecture nodes={['Baseline', 'Self-Supervised Representation', 'Classification', 'Bayesian Inference', 'Uncertainty Estimation', 'Calibration']} accent="#8aaeff" interactive /><p className="mt-3 text-sm leading-7 text-dim">The reported classification result is complete; uncertainty estimation, calibration, and reliability analysis are ongoing investigation.</p></article><article className="glass rounded-2xl p-6 md:p-8"><div className="eyebrow mb-2 text-[#92c9b3]">ongoing research / 02</div><h3 className="display text-2xl font-semibold">Physics-informed battery RUL</h3><Architecture nodes={['Data-Driven Learning', 'Physics Constraints', 'Physics-Informed Learning', 'RUL + Health Estimation']} accent="#92c9b3" interactive /><p className="text-sm leading-7 text-dim">Developing a physics-guided approach to battery degradation, health scoring, interpretability, and generalization. No numerical result is claimed.</p></article><article className="glass rounded-2xl border-[#b1a1f4]/20 p-6 md:col-span-2 md:p-8"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center"><div><div className="eyebrow mb-2 text-[#b1a1f4]">published research</div><h3 className="display text-3xl font-semibold">2 Published Research Papers</h3><p className="mt-3 max-w-xl text-sm leading-6 text-dim">Publication details are kept to the verified record. For the researcher identifier and complete publication trail, visit ORCID.</p></div><a href="https://orcid.org/0009-0009-6660-4230" target="_blank" rel="noreferrer" data-testid="link-orcid-research" className="inline-flex items-center gap-2 rounded-md border border-[#b1a1f4]/35 px-4 py-3 mono text-[11px] text-[#c9bdf7] hover:bg-[#b1a1f4]/10">ORCID 0009-0009-6660-4230 <ExternalLink className="h-3.5 w-3.5" /></a></div></article></div></div></section>;
}

export function Experience() {
  const [visible, setVisible] = useState(1);
  return <section id="experience" className="section-rule px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading index="04" title="Experience" sub="Roles translated into engineering stories: data, models, products, and deployment." /><div className="space-y-3">{experience.slice(0, visible).map((item, index) => <article className="glass rounded-xl p-6 md:p-8 reveal" key={item.org}><div className="grid gap-6 md:grid-cols-[180px_1fr]"><div><div className="mono text-[11px] text-[#8490a5]">{item.date}</div><div className="mt-3 h-px w-14" style={{ background: item.color }} /></div><div><div className="eyebrow" style={{ color: item.color }}>{item.role}</div><h3 className="display mt-2 text-2xl font-semibold">{item.org}</h3><p className="mt-3 text-sm text-dim">{item.intro}</p><div className="mt-7 grid gap-3 md:grid-cols-3">{item.cards.map(([title, metric, details]) => <div className="rounded-lg border border-[#9aafd6]/12 bg-[#10141d]/70 p-4" key={title}><h4 className="text-sm font-medium text-[#e3e8f0]">{title}</h4><div className="mt-3 mono text-[11px]" style={{ color: item.color }}>{metric}</div><p className="mt-2 text-xs leading-5 text-dim">{details}</p></div>)}</div></div></div></article>)} </div>{visible < experience.length && <button type="button" onClick={() => setVisible(visible + 1)} data-testid="button-reveal-experience" className="mt-6 inline-flex items-center gap-2 border-b border-[#8aaeff]/40 pb-1 mono text-[11px] uppercase tracking-[.12em] text-[#a8bce8]">Reveal next role <ChevronDown className="h-4 w-4" /></button>}</div></section>;
}

export function Engineering() {
  const [active, setActive] = useState('FAISS');
  return <section id="engineering" className="section-rule px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading index="05" title="The capability map" sub="Tools are only credible when they come with a location in the work. Select a skill to see where it was used." /><div className="grid gap-4 lg:grid-cols-[1fr_330px]"><div className="grid gap-3 md:grid-cols-2">{skillGroups.map(([group, skills]) => <div className="glass rounded-xl p-5" key={group}><div className="eyebrow mb-4">{group}</div><div className="flex flex-wrap gap-2">{(skills as string[]).map(skill => <button type="button" onClick={() => setActive(skill)} data-testid={`button-skill-${skill.replaceAll(' ', '-').replaceAll('/', '-')}`} className={`rounded-full border px-2.5 py-1.5 mono text-[10px] transition ${active === skill ? 'border-[#8aaeff] bg-[#8aaeff]/10 text-[#d5e0ff]' : 'border-[#9aafd6]/14 text-[#9da8ba] hover:border-[#8aaeff]/50'}`} key={skill}>{skill}</button>)}</div></div>)}</div><aside className="glass h-fit rounded-xl p-6 lg:sticky lg:top-24" data-testid="status-skill-usage"><div className="eyebrow mb-5">where it was used</div><div className="mb-4 flex h-10 w-10 items-center justify-center rounded border border-[#8aaeff]/30 bg-[#8aaeff]/10"><Search className="h-4 w-4 text-[#a8bce8]" /></div><h3 className="mono text-sm text-[#eef2f8]">{active}</h3><p className="mt-3 text-sm leading-6 text-dim">{skillUsage[active] || 'Used across applied AI experiments, engineering workflows, and technical system design in the portfolio.'}</p></aside></div></div></section>;
}

export function InsideLab() {
  const diagrams = [['RAG architecture', ['Documents', 'Loader', 'Chunker', 'Embedding Model', 'FAISS', 'Retriever', 'LLM', 'Response']], ['Agentic honeypot', ['Input', 'Agent', 'Memory / Session', 'LLM', 'Tool Calls', 'Information Extraction', 'Intelligence Report']], ['Uncertainty-aware audio', ['Audio', 'Wav2Vec2', 'Features', 'Classifier', 'MC Dropout', 'Prediction + Uncertainty', 'Calibration']], ['PINN', ['Battery Data + Physics Equations', 'Combined Loss', 'Neural Network', 'Degradation Model', 'RUL + Health Score']]];
  return <section id="lab" className="section-rule px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading index="06" title="Inside the lab" sub="Architecture diagrams as working mental models: the parts, their order, and the boundary between them." /><div className="grid gap-3 md:grid-cols-2">{diagrams.map(([name, nodes], i) => <article className="glass grid-card rounded-xl p-6" key={name as string}><div className="mb-5 flex items-center justify-between"><h3 className="display text-lg font-semibold">{name as string}</h3><span className="mono text-[10px] text-[#637086]">0{i + 1}</span></div><div className="space-y-1.5">{(nodes as string[]).map((node, j) => <div key={node}><div className="rounded border border-[#9aafd6]/12 bg-[#11151d]/90 px-3 py-2 mono text-[10px] text-[#aeb9cb]">{node}</div>{j < (nodes as string[]).length - 1 && <div className="mx-auto h-3 w-px bg-[#8aaeff]/35" />}</div>)}</div></article>)}</div></div></section>;
}

export function ProductionWorkflow() {
  const stages = [
    ['01', 'Problem', 'Understand the domain · define the objective · choose measurable evaluation criteria'],
    ['02', 'Data', 'Collection · cleaning · annotation · augmentation · feature engineering'],
    ['03', 'Model', 'CNNs · Transformers · LLMs · PINNs · self-supervised learning'],
    ['04', 'Evaluation', 'Accuracy · calibration · uncertainty · generalization · error analysis'],
    ['05', 'Engineering', 'APIs · Docker · Linux · GPU optimization · version control'],
    ['06', 'Deployment', 'FastAPI · Flask · Streamlit · Dash · Azure · Render'],
  ];
  return <section id="production" className="section-rule px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading index="07" title="From research to production" sub="The model is one milestone. The system is the work." /><div className="grid gap-2 md:grid-cols-3">{stages.map(([num, title, detail]) => <article className="glass rounded-xl p-5" key={num}><div className="mb-7 flex items-center justify-between"><span className="mono text-sm text-[#8aaeff]">{num}</span><span className="h-px w-12 bg-[#8aaeff]/30" /></div><h3 className="display text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-dim">{detail}</p></article>)}</div><div className="mt-10 flex items-center gap-3"><div className="h-px w-12 bg-[#8aaeff]" /><p className="display text-xl italic text-[#d9e1ef]">I don't stop when the model gets a good score.</p></div></div></section>;
}

export function Achievements() {
  return <section id="achievements" className="section-rule px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading index="08" title="Signals of rigor" sub="Achievements, qualifications, and context — kept factual, specific, and proportionate." /><div className="grid gap-3 md:grid-cols-4"><article className="glass rounded-xl p-6 md:col-span-2"><div className="eyebrow mb-5 text-[#b1a1f4]">certificate-verified / AI Impact Buildathon 2026</div><div className="display text-4xl font-semibold text-[#c9bdf7]">Top 2%</div><p className="mt-2 text-sm text-dim">of 40,000+ participants</p><div className="mt-7 border-t border-[#9aafd6]/12 pt-4 mono text-[10px] leading-5 text-[#aab4c5]">Finalist / Grand Finale<br />LLM-powered Agentic AI Honeypot for Cyber Fraud Intelligence</div></article><article className="glass rounded-xl p-6"><div className="eyebrow mb-5">gate / qualified</div><h3 className="display text-xl font-semibold">Data Science & AI<br />Computer Science</h3><p className="mt-5 mono text-[10px] text-[#8894a9]">2024 · 2025 · 2026</p></article><article className="glass rounded-xl p-6"><div className="eyebrow mb-5">university of mumbai</div><h3 className="display text-xl font-semibold">9.24<span className="text-[#8aaeff]">/10</span></h3><p className="mt-3 text-sm leading-6 text-dim">Represented college as an all-rounder student among 500+ colleges.</p></article><article className="glass rounded-xl p-6 md:col-span-2"><div className="eyebrow mb-4">national AI hackathons</div><p className="text-sm leading-6 text-dim">Qualified for multiple national-level AI hackathons including competitions hosted by IIT-BHU, NIT-Durgapur, and other IITs / NITs. No unverified placements are claimed.</p></article><article className="glass rounded-xl p-6 md:col-span-2"><div className="eyebrow mb-4">education / 2020—2024</div><h3 className="display text-xl font-semibold">Bachelor of Engineering (Hons.) in Artificial Intelligence & Data Science</h3><p className="mt-3 text-sm text-dim">University of Mumbai · Honours: Cyber Security</p></article></div></div></section>;
}

export function Contact() {
  return <section id="contact" className="section-rule px-5 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32"><div className="mx-auto max-w-7xl"><div className="glass relative overflow-hidden rounded-2xl p-7 md:p-14"><div className="absolute right-8 top-8 opacity-40"><Network className="h-24 w-24 text-[#8aaeff]" strokeWidth={.6} /></div><div className="eyebrow mb-5">09 / open channel</div><h2 className="display max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">Let's build something intelligent.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-dim">Interested in AI engineering, applied research, trustworthy machine learning, or building intelligent systems from the ground up?</p><div className="mt-8 flex flex-wrap gap-3"><a href="mailto:mahek3shaikh@gmail.com" data-testid="link-email" className="inline-flex items-center gap-2 rounded-md border border-[#9aafd6]/35 bg-transparent px-5 py-3 mono text-[11px] uppercase tracking-[.08em] text-[#c3cede] hover:border-[#e9eef8] hover:bg-transparent hover:text-white"><Mail className="h-4 w-4" /> Email me</a><a href={resumePdf} download="Mahek-Shaikh-Resume-July-2026.pdf" data-testid="link-contact-download-resume" className="inline-flex items-center gap-2 rounded-md border border-[#9aafd6]/25 px-5 py-3 mono text-[11px] uppercase tracking-[.08em] text-[#c3cede] hover:border-[#8aaeff] hover:text-white"><Download className="h-4 w-4" /> Download resume</a><a href="https://www.linkedin.com/in/mahek-shaikh-35484a202/" target="_blank" rel="noreferrer" data-testid="link-contact-linkedin" className="inline-flex items-center gap-2 rounded-md border border-[#9aafd6]/25 px-5 py-3 mono text-[11px] uppercase tracking-[.08em] text-[#c3cede] hover:border-[#8aaeff] hover:text-white"><Linkedin className="h-4 w-4" /> LinkedIn</a><a href="https://github.com/Mahek3108" target="_blank" rel="noreferrer" data-testid="link-contact-github" className="inline-flex items-center gap-2 rounded-md border border-[#9aafd6]/25 px-5 py-3 mono text-[11px] uppercase tracking-[.08em] text-[#c3cede] hover:border-[#8aaeff] hover:text-white"><Github className="h-4 w-4" /> GitHub</a></div></div><footer className="flex flex-col justify-between gap-4 border-t border-[#9aafd6]/12 pt-6 md:flex-row md:items-center"><div className="mono text-[10px] text-[#68748a]">MAHEK SHAIKH / AI SYSTEMS LAB / MUMBAI, INDIA</div><div className="flex gap-5 mono text-[10px] text-[#68748a]"><a href="#home" data-testid="link-footer-top" className="hover:text-white">BACK TO TOP ↑</a><span>© 2026</span></div></footer></div></section>;
}

export { GithubSection };
const siteData = {
  metrics: [
    { value: "€16m", label: "CRM front-to-back integration programme" },
    { value: "95%", label: "portfolio milestone delivery on time" },
    { value: "AI", label: "RAG, copilots, agent farms, and autonomous agent delivery" },
    { value: "40+", label: "initiatives standardised through AI-aware RAID reporting" },
  ],
  capabilities: [
    {
      title: "Portfolio governance",
      text: "Building executive forums, dashboards, RAID discipline, KPI tracking, AI adoption controls, and delivery rhythm across complex portfolios.",
      skills: ["RAID", "KPIs", "Benefits", "Burn rates", "Dashboards", "Clarity PPM", "Jira", "SteerCos"],
    },
    {
      title: "Risk and regulatory technology",
      text: "Delivering change across Credit Risk, Market Risk, Finance, MiFID II, BCBS-239, OCC remediation, and control programmes.",
      skills: ["Credit Risk", "Market Risk", "OCC", "MiFID II", "BCBS-239", "FRTB", "Controls", "Audit"],
    },
    {
      title: "AI, agents, and intelligent automation",
      text: "Leading AI/ML initiatives, RAG copilots, autonomous agents, agent farms, workflow orchestration, model evaluation, and decision automation.",
      skills: ["GenAI", "RAG", "LLMs", "Agent farms", "Autonomous agents", "Evals", "LangChain", "Prompting"],
    },
    {
      title: "Stakeholder leadership",
      text: "Influencing senior stakeholders across Finance, Risk, Treasury, Product, Engineering, Architecture, AI governance, and Technology.",
      skills: ["Roadmaps", "OKRs", "Scrum", "SAFe", "BRDs", "Exec packs", "Workshops", "Influence"],
    },
  ],
  projects: [
    {
      title: "CRM Front-to-Back Integration",
      category: "Regulatory",
      text: "Coordinated an €16m Corporate and Investment Bank programme spanning 11 projects, regulatory findings, audit commitments, and operational capacity uplift.",
      tags: ["€16m", "11 projects", "Compliance"],
    },
    {
      title: "Generative AI Credit Policy Chatbot",
      category: "AI",
      text: "Launched a RAG-based chatbot using open-source LLMs to improve interaction with CRM credit policies, documentation, and controlled knowledge retrieval.",
      tags: ["GenAI", "RAG", "LLMs"],
    },
    {
      title: "Agent Farm Operating Model",
      category: "Agents",
      text: "Defined the delivery model for coordinated AI agent farms that can triage work, summarise risk, draft materials, and escalate exceptions with human oversight.",
      tags: ["Agent farms", "Orchestration", "Human-in-loop"],
    },
    {
      title: "Autonomous Agent Use Cases",
      category: "Agents",
      text: "Shaped autonomous agent concepts for portfolio reporting, policy lookup, blocker detection, executive brief generation, and workflow follow-up.",
      tags: ["Autonomous agents", "Copilots", "Workflow"],
    },
    {
      title: "GCP Data Platform Migration",
      category: "Cloud",
      text: "Led a €3m migration roadmap from on-premises platforms to Google Cloud, including BigQuery and Kubernetes proof-of-concept delivery.",
      tags: ["GCP", "BigQuery", "Kubernetes"],
    },
    {
      title: "Finance and Risk Tech Strategy Metrics",
      category: "Product",
      text: "Enabled enterprise technology strategy metrics including velocity, burn rates, benefits realisation, investment visibility, and resource optimisation.",
      tags: ["KPIs", "Benefits", "Strategy"],
    },
    {
      title: "Credit Decision Automation",
      category: "AI",
      text: "Improved automated credit limit sanctioning pass rates by 16% and onboarded 27 BRMS use cases, reducing development time by more than 25%.",
      tags: ["Decisioning", "BRMS", "RPA"],
    },
    {
      title: "Portfolio Governance Model",
      category: "Governance",
      text: "Established governance forums, executive dashboards, and standardised reporting across 40+ initiatives, with controls suitable for AI-enabled delivery.",
      tags: ["AI governance", "Dashboards", "Controls"],
    },
    {
      title: "Model Risk and Evaluation Readiness",
      category: "AI",
      text: "Positioned AI initiatives around practical controls: measurable use cases, evaluation criteria, auditability, policy guardrails, and accountable ownership.",
      tags: ["Evals", "Model risk", "Guardrails"],
    },
  ],
  experience: [
    {
      org: "Citigroup",
      role: "Portfolio Manager, Finance, Credit and Market Risk Technology",
      dates: "Nov 2024 - Present",
      text: "Directing FMCRT initiatives across Consent Order, OCC remediation, Counterparty Credit Risk, Price Risk & Controls, Stress Testing, FRTB, and AI-ready delivery metrics.",
    },
    {
      org: "Deutsche Bank",
      role: "Programme Manager, Data Platform, Credit Risk Technology",
      dates: "Jan 2024 - Jun 2024",
      text: "Led cloud migration planning and delivery for Credit Risk data platforms, including a successful GCP offloading proof of concept.",
    },
    {
      org: "Deutsche Bank",
      role: "Programme / Portfolio Manager, CRM F2B Programme",
      dates: "Jan 2022 - Jun 2024",
      text: "Coordinated €16m CRM front-to-back delivery, 11 project roadmaps, five project managers, 14 business analysts, benefits realisation, and a GenAI policy chatbot.",
    },
    {
      org: "Deutsche Bank",
      role: "Product Manager / Programme Manager, Data Platform",
      dates: "Sep 2017 - Dec 2021",
      text: "Owned credit risk excess management platforms, automation, BCBS-239-aligned data refactoring, and machine-learning mapping initiatives.",
    },
    {
      org: "Earlier career",
      role: "Regulatory, change, project, and analysis leadership",
      dates: "Barclays, RBS, Lloyds, DWS, TD Bank",
      text: "Delivered MiFID II, BCBS-239, credit decisioning, divestment, front-office, and derivatives platform work across banking and data environments.",
    },
  ],
  principles: [
    {
      title: "Control without slowing momentum",
      text: "Good AI governance should make delivery clearer, not heavier: visible risks, sharper decisions, human oversight, and fewer surprises.",
    },
    {
      title: "Metrics that change behaviour",
      text: "Velocity, burn rates, benefits, model quality, adoption, blockers, and milestone health only matter when they help leaders reallocate attention and resources.",
    },
    {
      title: "Innovation inside real constraints",
      text: "Agent farms, autonomous agents, automation, and cloud migration have the most value when they work within regulatory, audit, and enterprise technology realities.",
    },
  ],
  process: [
    { title: "Discover", text: "Clarify AI use cases, regulatory context, target users, data constraints, and measurable business outcomes." },
    { title: "Govern", text: "Create AI-aware forums, RAID models, guardrails, dashboards, evaluation criteria, and escalation paths leaders can trust." },
    { title: "Orchestrate", text: "Coordinate product, architecture, engineering, data, risk, and agent workflows across agile and waterfall execution." },
    { title: "Scale", text: "Track adoption, benefits, model quality, operating rhythm, and candidate use cases for autonomous agents or agent farms." },
  ],
};

const metricRoot = document.querySelector("#hero-metrics");
const capabilitiesRoot = document.querySelector("#capabilities-list");
const expertiseVisualRoot = document.querySelector("#expertise-visual");
const filtersRoot = document.querySelector("#work-filters");
const projectsRoot = document.querySelector("#project-grid");
const experienceRoot = document.querySelector("#experience-timeline");
const principlesRoot = document.querySelector("#principles-list");
const processRoot = document.querySelector("#process-rail");
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const audioToggle = document.querySelector("[data-audio-toggle]");
const pageControlsRoot = document.querySelector("#page-controls");

function getStoredTheme() {
  try {
    return localStorage.getItem("portfolio-theme");
  } catch (error) {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch (error) {
    // Storage can be unavailable in private contexts; the theme still changes for this visit.
  }
}

function startupTheme() {
  return Math.random() >= 0.5 ? "dark" : "light";
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isLight = theme === "light";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} mode`);
  themeToggle.dataset.tooltip = `Switch to ${isLight ? "dark" : "light"} mode`;
}

function setupThemeToggle() {
  setTheme(startupTheme());
  themeToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    storeTheme(nextTheme);
  });
}

function setupAmbientAudio() {
  if (!audioToggle) return;

  const audio = new Audio("recording-2026-05-17-16-16-49.mp3");
  audio.loop = false;
  audio.preload = "auto";
  audio.volume = 0.42;

  let context = null;
  let sourceNode = null;
  let outputGain = null;
  let isPlaying = true;
  let wantsAudio = true;

  audioToggle.setAttribute("aria-pressed", "true");
  audioToggle.setAttribute("aria-label", "Turn music off");
  audioToggle.dataset.tooltip = "Music on";

  function setupMusicSmoothing() {
    if (context || !window.AudioContext && !window.webkitAudioContext) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    sourceNode = context.createMediaElementSource(audio);

    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -34;
    compressor.knee.value = 26;
    compressor.ratio.value = 7.5;
    compressor.attack.value = 0.08;
    compressor.release.value = 0.42;

    outputGain = context.createGain();
    outputGain.gain.value = 0.34;

    sourceNode.connect(compressor);
    compressor.connect(outputGain);
    outputGain.connect(context.destination);
  }

  async function startAmbient() {
    wantsAudio = true;
    if (isPlaying) return;

    if (audio.ended) {
      audio.currentTime = 0;
    }

    try {
      setupMusicSmoothing();
      if (context?.state === "suspended") {
        await context.resume();
      }
      await audio.play();
      isPlaying = true;
    } catch (error) {
      isPlaying = false;
    }

    audioToggle.setAttribute("aria-pressed", "true");
    audioToggle.setAttribute("aria-label", "Turn music off");
    audioToggle.dataset.tooltip = "Music on";
  }

  function stopAmbient() {
    wantsAudio = false;
    audio.pause();
    isPlaying = false;
    audioToggle.setAttribute("aria-pressed", "false");
    audioToggle.setAttribute("aria-label", "Turn music on");
    audioToggle.dataset.tooltip = "Music off";
  }

  audioToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    if (isPlaying) {
      stopAmbient();
    } else {
      startAmbient();
    }
  });

  audio.addEventListener("ended", () => {
    wantsAudio = false;
    isPlaying = false;
    audioToggle.setAttribute("aria-pressed", "false");
    audioToggle.setAttribute("aria-label", "Music finished");
    audioToggle.dataset.tooltip = "Music finished";
  });

  const startOnFirstGesture = () => {
    if (wantsAudio && isPlaying && audio.paused && !audio.ended) {
      isPlaying = false;
      startAmbient();
    }
  };

  ["pointerdown", "keydown", "wheel", "touchstart"].forEach((eventName) => {
    window.addEventListener(eventName, startOnFirstGesture, { once: true, passive: true });
  });
}

function renderMetrics() {
  metricRoot.innerHTML = siteData.metrics
    .map(
      (metric) => `
        <div class="metric">
          <strong>${metric.value}</strong>
          <span>${metric.label}</span>
        </div>
      `,
    )
    .join("");
}

function renderCapabilities() {
  capabilitiesRoot.innerHTML = siteData.capabilities
    .map(
      (item, index) => `
        <button class="capability-item${index === 0 ? " active" : ""}" type="button" data-capability="${index}" aria-pressed="${index === 0}" data-tooltip="Show ${item.title.toLowerCase()} skills">
          <span class="capability-number">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </button>
      `,
    )
    .join("");
}

function skillSvg(index, skills) {
  const layouts = [
    [
      [310, 34], [126, 76], [494, 76], [94, 174], [526, 174], [310, 306], [142, 268], [478, 268],
    ],
    [
      [310, 34], [138, 76], [482, 76], [98, 170], [522, 170], [150, 268], [470, 268], [310, 304],
    ],
    [
      [310, 34], [128, 82], [492, 82], [116, 186], [504, 186], [310, 306], [154, 262], [466, 262],
    ],
    [
      [310, 38], [116, 96], [504, 96], [140, 268], [480, 268], [310, 306], [166, 178], [454, 178],
    ],
  ];
  const points = layouts[index] || layouts[0];
  const paths = points
    .map(([x, y], pointIndex) => `M310 170 L${x} ${y}${pointIndex % 2 === 0 ? ` M${x} ${y} L${points[(pointIndex + 1) % points.length][0]} ${points[(pointIndex + 1) % points.length][1]}` : ""}`)
    .join(" ");
  const chips = skills
    .map(([label, x, y], skillIndex) => {
      const width = Math.max(68, label.length * 8.4 + 24);
      return `
        <g class="skill-chip" data-base-x="${x - width / 2}" data-base-y="${y - 16}" data-center-x="${x}" data-center-y="${y}" style="--skill-delay: ${skillIndex * 90}ms" transform="translate(${x - width / 2} ${y - 16})">
          <rect width="${width}" height="32" rx="7" />
          <text x="${width / 2}" y="21" text-anchor="middle">${label}</text>
        </g>
      `;
    })
    .join("");

  return `
    <svg class="skills-map" viewBox="0 0 620 340" aria-hidden="true">
      <path class="skill-links" d="${paths}" />
      <circle class="skill-core" cx="310" cy="170" r="40" />
      <text class="skill-core-text" x="310" y="165" text-anchor="middle">Skills</text>
      <text class="skill-core-subtext" x="310" y="187" text-anchor="middle">map</text>
      ${chips}
    </svg>
  `;
}

function visualSvg(index) {
  const svgs = [
    `
      <svg viewBox="0 0 360 220" aria-hidden="true">
        <g class="svg-grid">
          <path d="M48 58h94v52H48zM218 42h86v52h-86zM80 146h86v42H80zM210 132h106v54H210z" />
          <path d="M142 84h76M122 146l20-36M218 94l-52 52M210 158h-44" />
        </g>
        <g class="svg-nodes">
          <circle cx="48" cy="58" r="5" /><circle cx="142" cy="84" r="5" /><circle cx="218" cy="94" r="5" />
          <circle cx="304" cy="42" r="5" /><circle cx="166" cy="146" r="5" /><circle cx="316" cy="158" r="5" />
        </g>
        <path class="svg-pulse" d="M48 58h94v52H48zM218 42h86v52h-86zM80 146h86v42H80zM210 132h106v54H210z" />
      </svg>
    `,
    `
      <svg viewBox="0 0 360 220" aria-hidden="true">
        <path class="svg-shield" d="M180 30 292 72v50c0 62-42 96-112 120C110 218 68 184 68 122V72l112-42Z" />
        <g class="svg-bars">
          <rect x="116" y="134" width="22" height="44" rx="5" />
          <rect x="154" y="104" width="22" height="74" rx="5" />
          <rect x="192" y="82" width="22" height="96" rx="5" />
          <rect x="230" y="120" width="22" height="58" rx="5" />
        </g>
        <path class="svg-scan" d="M94 96h172M86 124h188M104 152h152" />
      </svg>
    `,
    `
      <svg viewBox="0 0 360 220" aria-hidden="true">
        <g class="svg-orbits">
          <ellipse cx="180" cy="110" rx="124" ry="44" />
          <ellipse cx="180" cy="110" rx="124" ry="44" transform="rotate(60 180 110)" />
          <ellipse cx="180" cy="110" rx="124" ry="44" transform="rotate(120 180 110)" />
        </g>
        <circle class="svg-core" cx="180" cy="110" r="22" />
        <g class="svg-agents">
          <circle cx="88" cy="84" r="7" /><circle cx="260" cy="72" r="7" /><circle cx="270" cy="154" r="7" />
          <circle cx="116" cy="164" r="7" /><circle cx="180" cy="42" r="7" /><circle cx="180" cy="178" r="7" />
        </g>
      </svg>
    `,
    `
      <svg viewBox="0 0 360 220" aria-hidden="true">
        <g class="svg-rings">
          <circle cx="180" cy="110" r="74" />
          <circle cx="180" cy="110" r="112" />
        </g>
        <g class="svg-people">
          <circle cx="180" cy="110" r="22" />
          <circle cx="104" cy="86" r="15" /><circle cx="250" cy="80" r="15" />
          <circle cx="118" cy="158" r="15" /><circle cx="260" cy="150" r="15" />
        </g>
        <path class="svg-links" d="M180 110 104 86M180 110l70-30M180 110l-62 48M180 110l80 40M104 86l14 72M250 80l10 70" />
      </svg>
    `,
  ];
  return svgs[index] || svgs[0];
}

function renderExpertiseVisual(index = 0) {
  const item = siteData.capabilities[index];
  const skillPoints = item.skills.map((skill, skillIndex) => {
    const layouts = [
      [[310, 34], [126, 76], [494, 76], [94, 174], [526, 174], [310, 306], [142, 268], [478, 268]],
      [[310, 34], [138, 76], [482, 76], [98, 170], [522, 170], [150, 268], [470, 268], [310, 304]],
      [[310, 34], [128, 82], [492, 82], [116, 186], [504, 186], [310, 306], [154, 262], [466, 262]],
      [[310, 38], [116, 96], [504, 96], [140, 268], [480, 268], [310, 306], [166, 178], [454, 178]],
    ];
    return [skill, ...layouts[index][skillIndex]];
  });
  expertiseVisualRoot.innerHTML = `
    <div class="expertise-visual-topline">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${item.title}</strong>
    </div>
    ${skillSvg(index, skillPoints)}
    <p>${item.text}</p>
  `;
  resetSkillPills();
}

function resetSkillPills() {
  expertiseVisualRoot.querySelectorAll(".skill-chip").forEach((chip) => {
    chip.setAttribute("transform", `translate(${chip.dataset.baseX} ${chip.dataset.baseY})`);
  });
}

function setupCapabilityVisuals() {
  capabilitiesRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-capability]");
    if (!button) return;

    const index = Number(button.dataset.capability);
    capabilitiesRoot.querySelectorAll("[data-capability]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderExpertiseVisual(index);
  });

  expertiseVisualRoot.addEventListener("pointermove", (event) => {
    const svg = expertiseVisualRoot.querySelector(".skills-map");
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const pointX = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 620;
    const pointY = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 340;

    expertiseVisualRoot.querySelectorAll(".skill-chip").forEach((chip) => {
      const centerX = Number(chip.dataset.centerX);
      const centerY = Number(chip.dataset.centerY);
      const baseX = Number(chip.dataset.baseX);
      const baseY = Number(chip.dataset.baseY);
      const dx = centerX - pointX;
      const dy = centerY - pointY;
      const distance = Math.hypot(dx, dy) || 1;
      const force = Math.max(0, 1 - distance / 112);
      const push = force * 32;
      chip.setAttribute("transform", `translate(${baseX + (dx / distance) * push} ${baseY + (dy / distance) * push})`);
    });
  });

  expertiseVisualRoot.addEventListener("pointerleave", resetSkillPills);
}

function renderFilters() {
  const categories = ["All", ...new Set(siteData.projects.map((project) => project.category))];
  filtersRoot.innerHTML = categories
    .map(
      (category) => `
        <button class="filter-button${category === "All" ? " active" : ""}" type="button" data-filter="${category}">
          ${category}
        </button>
      `,
    )
    .join("");
}

function projectVisual(project, index) {
  const category = project.category.toLowerCase();
  const variants = {
    ai: {
      className: "trace-ai",
      paths: [
        "M20 90 C58 28 98 120 136 58 S210 44 260 86",
        "M42 42 C88 74 124 30 168 54 S224 104 258 42",
      ],
      nodes: [
        [34, 72],
        [86, 56],
        [140, 60],
        [198, 72],
        [244, 52],
      ],
    },
    agents: {
      className: "trace-agents",
      paths: [
        "M28 78 C70 34 110 40 142 76 S216 112 256 58",
        "M42 98 C88 100 112 62 152 50 S220 40 252 86",
      ],
      nodes: [
        [42, 82],
        [94, 46],
        [146, 74],
        [206, 96],
        [248, 58],
      ],
    },
    cloud: {
      className: "trace-cloud",
      paths: [
        "M26 68 C72 36 102 106 146 72 S214 42 258 76",
        "M36 100 C82 82 108 44 152 58 S220 116 250 84",
      ],
      nodes: [
        [34, 68],
        [96, 82],
        [146, 72],
        [198, 58],
        [248, 78],
      ],
    },
    product: {
      className: "trace-product",
      paths: [
        "M24 98 C72 92 86 44 126 54 S182 114 258 36",
        "M36 70 C78 108 118 96 156 74 S218 52 252 92",
      ],
      nodes: [
        [34, 96],
        [92, 58],
        [134, 60],
        [190, 86],
        [248, 38],
      ],
    },
    controls: {
      className: "trace-controls",
      paths: [
        "M24 52 C76 52 82 98 136 98 S200 46 260 46",
        "M40 92 C78 36 130 42 158 74 S218 116 248 70",
      ],
      nodes: [
        [34, 52],
        [88, 76],
        [138, 98],
        [198, 58],
        [250, 46],
      ],
    },
  };
  const visual = variants[category] || variants.controls;
  const paths = visual.paths
    .map((path, pathIndex) => `<path class="trace-path path-${pathIndex + 1}" d="${path}" />`)
    .join("");
  const nodes = visual.nodes
    .map(([cx, cy], nodeIndex) => `<circle class="trace-node node-${nodeIndex + 1}" cx="${cx}" cy="${cy}" r="3.4" />`)
    .join("");

  return `
    <div class="project-visual ${visual.className}" aria-hidden="true" style="--visual-index: ${index}">
      <svg class="trace-visual" viewBox="0 0 280 130" focusable="false">
        <defs>
          <linearGradient id="traceGradient-${index}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="currentColor" stop-opacity="0" />
            <stop offset="38%" stop-color="currentColor" stop-opacity="0.62" />
            <stop offset="100%" stop-color="currentColor" stop-opacity="0.08" />
          </linearGradient>
        </defs>
        <g class="trace-grid">
          <line x1="28" y1="32" x2="252" y2="32" />
          <line x1="28" y1="65" x2="252" y2="65" />
          <line x1="28" y1="98" x2="252" y2="98" />
        </g>
        <g class="trace-lines" style="--trace-color: url(#traceGradient-${index})">
          ${paths}
        </g>
        <g class="trace-nodes">
          ${nodes}
        </g>
      </svg>
    </div>
  `;
}

function renderProjects(category = "All") {
  const projects =
    category === "All"
      ? siteData.projects
      : siteData.projects.filter((project) => project.category === category);

  projectsRoot.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card reveal visible" style="--project-index: ${index}">
          <div>
            ${projectVisual(project, index)}
            <p class="eyebrow">${project.category}</p>
            <h3>${project.title}</h3>
            <p>${project.text}</p>
          </div>
          <div class="project-meta">
            ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderPrinciples() {
  principlesRoot.innerHTML = siteData.principles
    .map(
      (principle) => `
        <article class="principle">
          <h3>${principle.title}</h3>
          <p>${principle.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderExperience() {
  experienceRoot.innerHTML = siteData.experience
    .map(
      (item) => `
        <article class="timeline-item">
          <div>
            <span>${item.dates}</span>
            <h3>${item.org}</h3>
          </div>
          <div>
            <strong>${item.role}</strong>
            <p>${item.text}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderProcess() {
  processRoot.innerHTML = siteData.process
    .map(
      (step, index) => `
        <article class="process-step">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${step.title}</h3>
          <p>${step.text}</p>
        </article>
      `,
    )
    .join("");
}

function setupFilters() {
  filtersRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    filtersRoot.querySelectorAll(".filter-button").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    renderProjects(button.dataset.filter);
  });
}

function setupFallingTerms() {
  const termRoot = document.querySelector(".falling-terms");
  if (!termRoot) return;

  const terms = Array.from(termRoot.children);
  const randomValue = (min, max) => min + Math.random() * (max - min);

  terms
    .sort(() => Math.random() - 0.5)
    .forEach((term, index) => {
      const rootWidth = termRoot.clientWidth || 340;
      const termWidth = term.getBoundingClientRect().width || 120;
      const sidePadding = Math.min(Math.max(termWidth * 0.5 + 12, 34), rootWidth * 0.45);
      const x = randomValue(sidePadding, Math.max(sidePadding, rootWidth - sidePadding));
      term.style.setProperty("--x", `${x.toFixed(1)}px`);
      term.style.setProperty("--delay", `${(index * 0.72 + randomValue(0, 1.8)).toFixed(2)}s`);
      term.style.setProperty("--duration", `${Math.round(randomValue(24, 42))}s`);
      term.style.setProperty("--drift", `${Math.round(randomValue(-18, 18))}px`);
      term.style.setProperty("--r", `${Math.round(randomValue(-7, 7))}deg`);
      termRoot.appendChild(term);
      term.style.animationDelay = "var(--delay)";
    });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function setupHeader() {
  const update = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function setupBars() {
  document.querySelectorAll(".signal-bars span").forEach((bar, index) => {
    const height = 28 + ((index * 17) % 62);
    bar.style.setProperty("--bar-height", `${height}%`);
    bar.style.setProperty("--delay", `${index * 90}ms`);
  });
}

function setupCanvas() {
  const canvas = document.querySelector("#signal-canvas");
  const swarmCanvas = document.querySelector("#swarm-canvas");
  const ctx = canvas.getContext("2d");
  const swarmCtx = swarmCanvas.getContext("2d");
  const pointer = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
    px: window.innerWidth * 0.5,
    py: window.innerHeight * 0.5,
    active: false,
    intensity: 0,
  };
  let width = 0;
  let height = 0;
  let nodes = [];
  let swarm = [];
  let pulses = [];
  let pulseEchoes = [];
  let frame = 0;
  const seededRandom = (seed) => {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
  };

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    swarmCanvas.width = width * ratio;
    swarmCanvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    swarmCanvas.style.width = `${width}px`;
    swarmCanvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    swarmCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(112, Math.floor((width * height) / 10500));
    nodes = Array.from({ length: count }, (_, index) => ({
      x: seededRandom(index + 1) * width,
      y: height * 0.66 + seededRandom(index + 101) * Math.max(height * 0.38, 1),
      vx: (seededRandom(index + 201) - 0.5) * 0.45,
      vy: (seededRandom(index + 301) - 0.5) * 0.32,
      baseVx: (seededRandom(index + 201) - 0.5) * 0.45,
      baseVy: (seededRandom(index + 301) - 0.5) * 0.32,
      radius: 1.35 + seededRandom(index + 401) * 0.95,
    }));
    swarm = Array.from({ length: 18 }, (_, index) => ({
      x: pointer.x + Math.cos(index) * 28,
      y: pointer.y + Math.sin(index) * 28,
      vx: 0,
      vy: 0,
      orbit: 18 + (index % 6) * 9,
      speed: 0.028 + (index % 5) * 0.006,
      phase: index * 0.72,
      radius: 1.1 + (index % 4) * 0.28,
    }));
    pulseEchoes = [];
    pulses = Array.from({ length: 8 }, (_, index) => {
      const from = Math.floor(seededRandom(index + 701) * nodes.length);
      const to = findNextPulseNode(from, -1, index);
      return {
        from,
        to,
        previous: -1,
        progress: seededRandom(index + 801),
        speed: 0.0038 + seededRandom(index + 901) * 0.0013,
        flare: 0,
        phase: index,
      };
    });
  }

  function findNextPulseNode(fromIndex, previousIndex, salt = 0) {
    const from = nodes[fromIndex];
    if (!from) return 0;

    let candidates = [];
    nodes.forEach((node, index) => {
      if (index === fromIndex || index === previousIndex) return;
      const distance = Math.hypot(from.x - node.x, from.y - node.y);
      if (distance < 138) {
        candidates.push({ index, distance });
      }
    });

    if (!candidates.length && previousIndex >= 0) {
      return previousIndex;
    }

    if (!candidates.length) {
      candidates = nodes
        .map((node, index) => ({ index, distance: Math.hypot(from.x - node.x, from.y - node.y) }))
        .filter((candidate) => candidate.index !== fromIndex)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 6);
    }

    candidates.sort((a, b) => a.distance - b.distance);
    const choice = Math.floor(seededRandom(frame + salt * 17 + fromIndex * 3) * Math.min(candidates.length, 4));
    return candidates[Math.max(0, choice)]?.index ?? previousIndex ?? fromIndex;
  }

  function drawPulses(pulseColor, echoColor, lineColor) {
    pulses.forEach((pulse) => {
      const from = nodes[pulse.from];
      const to = nodes[pulse.to];
      if (!from || !to) return;

      pulse.progress += pulse.speed;
      while (pulse.progress >= 1) {
        pulse.progress -= 1;
        pulse.previous = pulse.from;
        pulse.from = pulse.to;
        pulse.to = findNextPulseNode(pulse.from, pulse.previous, pulse.phase);
        pulse.flare = 1;
        pulseEchoes.push({
          x: nodes[pulse.from]?.x ?? 0,
          y: nodes[pulse.from]?.y ?? 0,
          life: 1,
          radius: 10 + seededRandom(frame + pulse.phase) * 5,
        });
      }
      pulse.flare *= 0.86;

      const start = nodes[pulse.from];
      const end = nodes[pulse.to];
      if (!start || !end) return;

      const pulseX = start.x + (end.x - start.x) * pulse.progress;
      const pulseY = start.y + (end.y - start.y) * pulse.progress;

      ctx.save();
      ctx.globalAlpha = Math.min(0.94, 0.58 + pulse.flare * 0.28);
      ctx.fillStyle = pulseColor;
      ctx.shadowColor = pulseColor;
      ctx.shadowBlur = 16 + pulse.flare * 18;
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 3.8 + pulse.flare * 6.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = lineColor;
    });

    pulseEchoes = pulseEchoes.filter((echo) => {
      echo.life *= 0.975;
      if (echo.life < 0.025) return false;

      ctx.save();
      ctx.globalAlpha = echo.life * 0.22;
      ctx.fillStyle = echoColor;
      ctx.shadowColor = echoColor;
      ctx.shadowBlur = 22 * echo.life;
      ctx.beginPath();
      ctx.arc(echo.x, echo.y, echo.radius * (1.15 + (1 - echo.life) * 1.2), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return true;
    });
  }

  function getFallingTermFields() {
    if (document.body.dataset.page !== "1") return [];

    return Array.from(document.querySelectorAll(".falling-terms span"))
      .map((term) => {
        const rect = term.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > height || rect.right < 0 || rect.left > width) return null;

        const opacity = Number(getComputedStyle(term).opacity);
        if (opacity < 0.06) return null;

        return {
          x: rect.left + rect.width * 0.5,
          y: rect.top + rect.height * 0.5,
          rx: Math.max(58, rect.width * 0.72),
          ry: Math.max(32, rect.height * 2.15),
          strength: Math.min(0.82, opacity * 1.55),
        };
      })
      .filter(Boolean);
  }

  function draw() {
    frame += 1;
    ctx.clearRect(0, 0, width, height);
    swarmCtx.clearRect(0, 0, width, height);
    const styles = getComputedStyle(document.documentElement);
    ctx.fillStyle = styles.getPropertyValue("--canvas-dot").trim();
    const lineColor = styles.getPropertyValue("--canvas-line").trim();
    const pulseColor = styles.getPropertyValue("--canvas-swarm").trim();
    const echoColor = styles.getPropertyValue("--accent-3").trim();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.35;
    pointer.intensity += ((pointer.active ? 1 : 0) - pointer.intensity) * 0.08;
    const pointerSpeed = Math.min(36, Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py));
    const influenceRadius = 190 + pointerSpeed * 2.8;
    const termFields = getFallingTermFields();

    if (pointer.intensity > 0.02) {
      const fieldA = styles.getPropertyValue("--canvas-field-a").trim();
      const fieldB = styles.getPropertyValue("--canvas-field-b").trim();
      const cursorGradient = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        influenceRadius * 0.9,
      );
      cursorGradient.addColorStop(0, fieldA);
      cursorGradient.addColorStop(0.45, fieldB);
      cursorGradient.addColorStop(1, "rgba(109, 214, 200, 0)");
      ctx.globalAlpha = pointer.intensity;
      ctx.fillStyle = cursorGradient;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, influenceRadius * 0.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = styles.getPropertyValue("--canvas-dot").trim();
    }

    if (pointer.intensity > 0.015) {
      const swarmColor = styles.getPropertyValue("--canvas-swarm").trim();
      swarmCtx.fillStyle = swarmColor;
      swarmCtx.strokeStyle = swarmColor;
      swarmCtx.lineWidth = 1.35;

      swarm.forEach((particle, index) => {
        const angle = frame * particle.speed + particle.phase;
        const targetX =
          pointer.x +
          Math.cos(angle) * particle.orbit +
          Math.sin(angle * 0.7) * 12;
        const targetY =
          pointer.y +
          Math.sin(angle) * particle.orbit +
          Math.cos(angle * 0.9) * 10;

        particle.vx += (targetX - particle.x) * (0.012 + index * 0.0004);
        particle.vy += (targetY - particle.y) * (0.012 + index * 0.0004);
        particle.vx *= 0.86;
        particle.vy *= 0.86;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const alpha = pointer.intensity * (0.46 + (index % 5) * 0.07);
        swarmCtx.globalAlpha = alpha;
        swarmCtx.beginPath();
        swarmCtx.arc(particle.x, particle.y, particle.radius + pointer.intensity * 0.45, 0, Math.PI * 2);
        swarmCtx.fill();

        if (index > 0 && index % 3 === 0) {
          const previous = swarm[index - 1];
          swarmCtx.globalAlpha = alpha * 0.48;
          swarmCtx.beginPath();
          swarmCtx.moveTo(previous.x, previous.y);
          swarmCtx.lineTo(particle.x, particle.y);
          swarmCtx.stroke();
        }
      });

      swarmCtx.globalAlpha = 1;
      ctx.fillStyle = styles.getPropertyValue("--canvas-dot").trim();
      ctx.strokeStyle = lineColor;
    }

    nodes.forEach((node, index) => {
      const dx = node.x - pointer.x;
      const dy = node.y - pointer.y;
      const pointerDistance = Math.hypot(dx, dy) || 1;
      const force = pointer.active ? Math.max(0, 1 - pointerDistance / influenceRadius) : 0;
      const swirl = Math.sin(frame * 0.018 + index) * force * 0.12;
      const lowerBias = pointer.active ? 0 : Math.max(0, (height * 0.66 - node.y) / Math.max(height * 0.34, 1));

      node.vx += (dx / pointerDistance) * force * (0.42 + pointerSpeed * 0.015);
      node.vy += (dy / pointerDistance) * force * (0.42 + pointerSpeed * 0.015);
      node.vx += (-dy / pointerDistance) * swirl;
      node.vy += (dx / pointerDistance) * swirl;

      termFields.forEach((field) => {
        const termDx = node.x - field.x;
        const termDy = node.y - field.y;
        const normalizedDistance = Math.hypot(termDx / field.rx, termDy / field.ry) || 1;
        if (normalizedDistance >= 1) return;

        const termForce = (1 - normalizedDistance) * field.strength;
        node.vx += (termDx / field.rx / normalizedDistance) * termForce * 1.55;
        node.vy += (termDy / field.ry / normalizedDistance) * termForce * 1.2;
      });

      node.vy += lowerBias * 0.035;
      node.vx += (node.baseVx - node.vx) * 0.016;
      node.vy += (node.baseVy - node.vy) * 0.016;
      node.vx *= 0.972;
      node.vy *= 0.972;

      node.x += node.vx;
      node.y += node.vy;

      if (node.x < -20) node.x = width + 20;
      if (node.x > width + 20) node.x = -20;
      if (node.y < -20) node.y = height + 20;
      if (node.y > height + 20) node.y = pointer.active ? -20 : height * 0.66;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + force * 1.9, 0, Math.PI * 2);
      ctx.fill();

      for (let otherIndex = index + 1; otherIndex < nodes.length; otherIndex += 1) {
        const other = nodes[otherIndex];
        const distance = Math.hypot(node.x - other.x, node.y - other.y);
        if (distance < 138) {
          const otherPointerDistance = Math.hypot(other.x - pointer.x, other.y - pointer.y);
          const pointerBoost =
            pointer.intensity *
            Math.max(0, 1 - Math.min(pointerDistance, otherPointerDistance) / influenceRadius);
          ctx.globalAlpha = Math.min(0.9, Math.max(0.1, 1 - distance / 138) + pointerBoost * 0.48);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
          ctx.globalAlpha = 1;

        }
      }
    });

    drawPulses(pulseColor, echoColor, lineColor);

    pointer.px += (pointer.x - pointer.px) * 0.42;
    pointer.py += (pointer.y - pointer.py) * 0.42;
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    },
    { passive: true },
  );
  window.addEventListener(
    "pointerleave",
    () => {
      pointer.active = false;
    },
    { passive: true },
  );
  window.addEventListener(
    "blur",
    () => {
      pointer.active = false;
    },
    { passive: true },
  );

  resize();
  draw();
}

function setupPagedNavigation() {
  const pageSelectors = ["#top", "#home", "#work", "#experience", "#capabilities", "#about", "#process", "#contact"];
  const pages = pageSelectors.map((selector) => document.querySelector(selector)).filter(Boolean);
  const pageIds = ["top", "home", "work", "experience", "capabilities", "about", "process", "contact"];
  let activeIndex = Math.max(0, pageIds.indexOf(window.location.hash.replace("#", "")));
  let isLocked = false;
  let touchStartY = null;
  let touchStartScrollTop = 0;

  document.documentElement.classList.add("paged-root");
  document.body.classList.add("paged-site");
  pages.forEach((page, index) => {
    page.classList.add("page-section");
    page.dataset.pageIndex = String(index);
  });

  pageControlsRoot.innerHTML = pages
    .map(
      (_, index) => `
        <button class="page-dot" type="button" data-page-dot="${index}" aria-label="Go to ${pageIds[index]} page" data-tooltip="${pageIds[index] === "top" ? "Opening" : pageIds[index].charAt(0).toUpperCase() + pageIds[index].slice(1)}"></button>
      `,
    )
    .join("");

  function setActivePage(index, updateHash = true) {
    const nextIndex = Math.max(0, Math.min(index, pages.length - 1));
    activeIndex = nextIndex;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.body.dataset.page = String(nextIndex);

    pages.forEach((page, pageIndex) => {
      const isActive = pageIndex === nextIndex;
      page.classList.toggle("active", isActive);
      page.setAttribute("aria-hidden", String(!isActive));
      if (isActive) {
        page.scrollTop = 0;
        page.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
      }
    });

    pageControlsRoot.querySelectorAll("[data-page-dot]").forEach((dot, dotIndex) => {
      const isActive = dotIndex === nextIndex;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-current", isActive ? "page" : "false");
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      const target = link.getAttribute("href").slice(1) || "top";
      const normalizedTarget = target === "home" ? "top" : target;
      const activeTarget = pageIds[nextIndex] === "home" ? "top" : pageIds[nextIndex];
      link.classList.toggle("active", normalizedTarget === activeTarget && nextIndex !== 0);
    });

    if (updateHash) {
      history.replaceState(null, "", `#${pageIds[nextIndex]}`);
    }
  }

  function movePage(direction) {
    if (isLocked) return;
    const nextIndex = activeIndex + direction;
    if (nextIndex < 0 || nextIndex >= pages.length) return;
    isLocked = true;
    setActivePage(nextIndex);
    window.setTimeout(() => {
      isLocked = false;
    }, 720);
  }

  function activePage() {
    return pages[activeIndex];
  }

  function canScrollActivePage(direction) {
    const page = activePage();
    if (!page) return false;
    const scrollRoom = page.scrollHeight - page.clientHeight;
    if (scrollRoom <= 2) return false;
    if (direction > 0) return page.scrollTop < scrollRoom - 2;
    return page.scrollTop > 2;
  }

  window.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) < 18) return;
      if (canScrollActivePage(event.deltaY > 0 ? 1 : -1)) return;
      event.preventDefault();
      movePage(event.deltaY > 0 ? 1 : -1);
    },
    { passive: false },
  );

  window.addEventListener("keydown", (event) => {
    if (["ArrowDown", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      movePage(1);
    }
    if (["ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault();
      movePage(-1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActivePage(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      setActivePage(pages.length - 1);
    }
  });

  window.addEventListener(
    "touchstart",
    (event) => {
      touchStartY = event.touches[0]?.clientY ?? null;
      touchStartScrollTop = activePage()?.scrollTop ?? 0;
    },
    { passive: true },
  );

  window.addEventListener(
    "touchend",
    (event) => {
      if (touchStartY === null) return;
      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - touchEndY;
      const direction = delta > 0 ? 1 : -1;
      const page = activePage();
      const scrollMoved = page ? Math.abs(page.scrollTop - touchStartScrollTop) : 0;
      if (Math.abs(delta) > 42 && scrollMoved < 8 && !canScrollActivePage(direction)) {
        movePage(direction);
      }
      touchStartY = null;
    },
    { passive: true },
  );

  document.addEventListener("click", (event) => {
    if (activeIndex === 0) {
      if (event.target.closest("[data-audio-toggle], [data-theme-toggle]")) return;
      event.preventDefault();
      setActivePage(1);
      return;
    }

    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const target = link.getAttribute("href").slice(1) || "top";
    const index = pageIds.indexOf(target);
    if (index === -1) return;
    event.preventDefault();
    setActivePage(index);
  });

  pageControlsRoot.addEventListener("click", (event) => {
    const dot = event.target.closest("[data-page-dot]");
    if (!dot) return;
    setActivePage(Number(dot.dataset.pageDot));
  });

  setActivePage(activeIndex, window.location.hash !== `#${pageIds[activeIndex]}`);
}

renderMetrics();
renderCapabilities();
renderExpertiseVisual();
renderFilters();
renderProjects();
renderExperience();
renderPrinciples();
renderProcess();
setupFallingTerms();
setupThemeToggle();
setupAmbientAudio();
setupCapabilityVisuals();
setupFilters();
setupReveal();
setupHeader();
setupBars();
setupPagedNavigation();
setupCanvas();

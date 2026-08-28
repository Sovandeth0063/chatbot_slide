document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var deck = document.querySelector(".deck");
  if (!deck) return;

  function frame(title, page, content, extra) {
    var shownPage = page;
    return `
      <section class="slide slide--content generated-slide ${extra || ""}" data-slide="content">
        <header class="slide-header">
          <div class="brand-mark" aria-label="GDCE"><div class="brand-mark__icon">▤</div></div>
          <div class="slide-title"><span class="slide-title__en">${title}</span></div>
          <div class="org-mark" aria-label="GDCE logo">GDCE</div>
        </header>
        <div class="gold-rule"></div>
        <div class="slide-body"><div class="slide-content generated-content">${content}</div></div>
        <footer class="slide-footer"><div class="footer-left">General Department of Customs and Excise of Cambodia</div><div class="page-number">${shownPage}</div></footer>
      </section>`;
  }

  function section(number, title, page) {
    var shownPage = page;
    return `<section class="slide slide--section" data-slide="section"><div class="section-slide-content"><div class="section-slide__num">${number}</div><h2>${title}</h2><div class="section-slide__line"></div></div><div class="page-number">${shownPage}</div></section>`;
  }

  function cards(title, page, lead, items, cls) {
    var body = `<div class="generated-lead"><h2>${title}</h2><p>${lead}</p></div><div class="generated-cards ${cls || ""}">${items
      .map(function (item, index) {
        return `<article class="generated-card"><span>${String(index + 1).padStart(2, "0")}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`;
      })
      .join("")}</div>`;
    return frame(title, page, body, "generated-slide--cards");
  }

  function objectiveCards(title, page, lead, items) {
    var body = `<div class="generated-lead"><h2>${title}</h2><p>${lead}</p></div><div class="generated-cards generated-cards--five generated-cards--objectives">${items
      .map(function (item, index) {
        var x = (index % 5) * -20;
        var y = index < 5 ? 0 : -50;
        return `<article class="generated-card"><span>${String(index + 1).padStart(2, "0")}</span><figure class="objective-card__art" style="--x:${x}%; --y:${y}%"><img src="img/project-objective-illustrations.png" alt="${item[0]} illustration"></figure><h3>${item[0]}</h3><p>${item[1]}</p></article>`;
      })
      .join("")}</div>`;
    return frame(title, page, body, "generated-slide--cards");
  }

  function conversationManagement() {
    var items = [
      ["Create conversation", "Create a new conversation."],
      ["Select conversation", "Select and open an existing conversation."],
      ["Save conversation history", "Save conversation history locally."],
      ["Rename conversation", "Rename the conversation title."],
      [
        "Pin / unpin conversation",
        "Pin or unpin a conversation for quick access.",
      ],
      ["Move conversation", "Move a conversation to another location."],
      ["Delete conversation", "Delete a conversation permanently."],
      [
        "Group conversations into projects",
        "Group and organize conversations inside projects.",
      ],
      [
        "Restore locally persisted history",
        "Restore previously saved conversations locally.",
      ],
    ];
    var cards = items
      .map(function (item, index) {
        var x = (index % 3) * -33.333;
        var y = index < 3 ? 0 : index < 6 ? -33.5 : -67;
        return `<article class="conversation-management__item"><span>${String(index + 1).padStart(2, "0")}</span><figure class="conversation-management__art" style="--x:${x}%; --y:${y}%"><img src="img/conversation-management-illustrations.png" alt="${item[0]} illustration"></figure><div><h3>${item[0]}</h3><i></i><p>${item[1]}</p></div></article>`;
      })
      .join("");
    return frame(
      "Conversation Management",
      17,
      `<div class="generated-lead"><h2>Conversation Management</h2><p>Conversation controls help users return work without losing context.</p></div><section class="conversation-management">${cards}</section>`,
      "generated-slide--conversation",
    );
  }

  function stateManagement() {
    var stores = [
      [
        "Chat & Message Store",
        "Tracks chat history, active chat, messages, streaming status, and response-render blocks.",
      ],
      [
        "Project Store",
        "Tracks projects and links local chats/projects with their backend IDs.",
      ],
      [
        "Authentication Store",
        "Maintains the signed-in user, JWT access token, refresh token, and session state.",
      ],
      [
        "Preferences & UI Store",
        "Manages language, appearance, chat preferences, dialog state, and interface behavior.",
      ],
      [
        "Local Persistence",
        "Stores selected browser data locally, including chat history, projects, preferences, and authentication tokens.",
      ],
      [
        "Hydration & Recovery",
        "Restores stored chats, projects, preferences, and authentication state when the application reloads.",
      ],
    ];
    var cards = stores
      .map(function (item, index) {
        var x = (index % 3) * -33.333;
        var y = index < 3 ? 0 : -50;
        return `<article class="state-management__card"><span>${String(index + 1).padStart(2, "0")}</span><figure class="state-management__art" style="--x:${x}%; --y:${y}%"><img src="img/state-management-illustrations.png" alt="${item[0]} illustration"></figure><div><h3>${item[0]}</h3><p>${item[1]}</p></div></article>`;
      })
      .join("");
    return frame(
      "State Management",
      19,
      `<div class="generated-lead"><h2>State Management</h2><p>Shared Pinia stores give components a consistent view of chats, authentication, projects, and UI preferences.</p></div><section class="state-management">${cards}</section><div class="state-management__label">PINIA STORES</div>`,
      "generated-slide--state-management",
    );
  }

  function apiIntegration() {
    var request = [
      ["User Message", "User enters a question or attaches files.", 0],
      [
        "Chat Streaming Composable",
        "useChatStreaming prepares the message, chat ID, project ID, and UI state.",
        1,
      ],
      [
        "GDCE Chat API Service",
        "streamGdceChat adds the JWT bearer token and builds the request.",
        2,
      ],
      [
        "POST /api/v1/chat/stream",
        "Sends an authenticated streaming request to the GDCE API Layer.",
        3,
      ],
      [
        "API Layer & Orchestrator",
        "Validates the request and routes it to Retrieval, Calculator, Trade, or General services.",
        6,
      ],
    ];
    var response = [
      [
        "API Layer SSE Response",
        "SSE Events: start → delta → done or error",
        4,
      ],
      [
        "SSE Streaming Handler",
        "readSseStream receives incremental response events.",
        5,
      ],
      [
        "Chat State & Final Response Handler",
        "Replaces temporary streaming text with the final structured response.",
        6,
      ],
      [
        "Normalized Message Blocks",
        "Canonical blocks: markdown, summary, key-value data, table, chart, references, and suggestions.",
        7,
      ],
      [
        "Renderer Registry",
        "useRenderer selects the appropriate UI renderer for each response block.",
        8,
      ],
      [
        "Rendered UI Blocks",
        "Markdown, Summary, Table, Chart, References, Suggestions",
        8,
      ],
    ];
    function stage(item, index, lane, total) {
      var x = (item[2] % 3) * -33.333;
      var y = item[2] < 3 ? 0 : item[2] < 6 ? -33.333 : -66.666;
      var backend =
        lane === "request" && index === 4
          ? " api-integration__stage--backend"
          : "";
      var last = index === total - 1 ? " api-integration__stage--last" : "";
      return `<article class="api-integration__stage api-integration__stage--${lane}-${index + 1}${backend}${last}"><figure class="api-integration__art" style="--x:${x}%; --y:${y}%"><img src="img/api-integration-illustrations.png" alt="${item[0]} illustration"></figure><h3>${item[0]}</h3><p>${item[1]}</p></article>`;
    }
    return `<section class="api-integration" aria-label="API request and response integration flow"><div class="api-integration__lane api-integration__lane--request"><b>REQUEST FLOW</b>${request
      .map(function (item, index) {
        return stage(item, index, "request", request.length);
      })
      .join(
        "",
      )}</div><div class="api-integration__lane api-integration__lane--response"><b>RESPONSE FLOW</b>${response
      .map(function (item, index) {
        return stage(item, index, "response", response.length);
      })
      .join(
        "",
      )}</div><p class="api-integration__note">Frontend communicates with the API Layer; internal services communicate through Docker network.</p></section>`;
  }

  function frontendBestPractices() {
    var practices = [
      [
        "Component Reuse",
        "Reusable Vue components and composables keep UI patterns modular and consistent.",
      ],
      [
        "Type Safety & Validation",
        "TypeScript and Zod schemas validate API response structures and make data handling predictable.",
      ],
      [
        "Sanitized Rich Rendering",
        "Markdown output is sanitized with DOMPurify, with validated response blocks and safe fallback rendering.",
      ],
      [
        "Responsive Design",
        "Tailwind-based responsive layouts support desktop, tablet, and mobile experiences.",
      ],
      [
        "Accessible Feedback",
        "Loading, streaming, error, and interaction states use clear visual feedback and accessibility attributes.",
      ],
      [
        "Testable Architecture",
        "API services, Pinia stores, composables, and UI components are separated for focused unit testing.",
      ],
    ];
    var cards = practices
      .map(function (item, index) {
        var x = (index % 3) * -33.333;
        var y = index < 3 ? 0 : -50;
        return `<article class="best-practices__card"><span>${String(index + 1).padStart(2, "0")}</span><figure class="best-practices__art" style="--x:${x}%; --y:${y}%"><img src="img/frontend-best-practices-illustrations.png" alt="${item[0]} illustration"></figure><div><h3>${item[0]}</h3><p>${item[1]}</p></div></article>`;
      })
      .join("");
    return frame(
      "Frontend Best Practices",
      20,
      `<div class="generated-lead"><h2>Frontend Best Practices</h2><p>Consistent engineering practices support a reliable, secure, and maintainable user experience.</p></div><section class="best-practices">${cards}</section><div class="best-practices__label">Vue 3 • Nuxt • TypeScript • Pinia • Zod • DOMPurify • Tailwind CSS</div>`,
      "generated-slide--best-practices",
    );
  }

  function systemImplementation() {
    var stages = [
      [
        "Project Setup",
        "Configure Nuxt, Vue, TypeScript, Tailwind CSS, Pinia, tooling, and environment variables.",
      ],
      [
        "UI Design",
        "Define layouts, typography, colors, themes, responsive rules, and Khmer/English language support.",
      ],
      [
        "Reusable Components",
        "Build reusable sidebar, chat messages, composer, settings, feedback, and renderer components.",
      ],
      [
        "Chat Logic",
        "Validate input, send requests, stream responses, handle failures, and render final response blocks.",
      ],
      [
        "State Management",
        "Connect shared chat, project, authentication, preferences, UI, and notification state.",
      ],
      [
        "API Integration",
        "Implement typed API requests, JWT authentication, response validation, SSE streaming, adapters, and error handling.",
      ],
      [
        "Responsive & Accessible UI",
        "Support desktop, tablet, and mobile layouts with accessible loading, error, and interaction feedback.",
      ],
      [
        "Integration & Verification",
        "Verify key frontend flows with unit tests for API services, streaming, normalized responses, renderers, and error handling.",
      ],
    ];
    var cards = stages
      .map(function (item, index) {
        var x = (index % 4) * -25;
        var y = index < 4 ? 0 : -50;
        return `<article class="system-implementation__card system-implementation__card--${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span><figure class="system-implementation__art" style="--x:${x}%; --y:${y}%"><img src="img/system-implementation-illustrations.png" alt="${item[0]} illustration"></figure><h3>${item[0]}</h3><p>${item[1]}</p></article>`;
      })
      .join("");
    return frame(
      "System Implementation",
      22,
      `<div class="generated-lead"><h2>System Implementation</h2><p>Implementation progresses from frontend foundations to integrated, testable API behavior.</p></div><section class="system-implementation">${cards}</section>`,
      "generated-slide--system-implementation",
    );
  }

  function testingEvaluation() {
    var areas = [
      [
        "Renderer Safety Testing",
        "Validates sanitized Markdown and safe rich-content rendering.",
      ],
      [
        "Component & Renderer Testing",
        "Tests reusable response-rendering logic and UI block behavior.",
      ],
      [
        "Chat Streaming Testing",
        "Tests request flow, streaming deltas, final normalized responses, and cancellation/error paths.",
      ],
      [
        "API Service Testing",
        "Tests typed requests, responses, authentication handling, and API error cases.",
      ],
      [
        "Responsive Design Review",
        "Responsive layouts support desktop, tablet, and mobile; verification is manual.",
      ],
      [
        "Error & Recovery Testing",
        "Tests network, stream, validation, and API failure handling.",
      ],
      [
        "Integration Readiness",
        "Unit-tested frontend modules support reliable integration.",
      ],
    ];
    var cards = areas
      .map(function (item, index) {
        var x = (index % 4) * -25;
        var y = index < 4 ? 0 : -50;
        return `<article class="testing-evaluation__card testing-evaluation__card--${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span><figure class="testing-evaluation__art" style="--x:${x}%; --y:${y}%"><img src="img/testing-evaluation-illustrations.png" alt="${item[0]} illustration"></figure><h3>${item[0]}</h3><p>${item[1]}</p></article>`;
      })
      .join("");
    return frame(
      "Testing and Evaluation",
      23,
      `<div class="generated-lead"><h2>Testing and Evaluation</h2><p>Frontend validation focuses on unit-tested API, streaming, renderer, normalization, and error-handling behavior.</p></div><section class="testing-evaluation">${cards}</section>`,
      "generated-slide--testing-evaluation",
    );
  }

  function results() {
    var items = [
      "Authenticated users can send chat messages.",
      "Responses stream progressively in the chat area.",
      "Final answers render as structured blocks, including text, tables, charts, references, and suggestions.",
      "Chats and projects can be created, viewed, and managed.",
      "The interface supports responsive desktop, tablet, and mobile layouts.",
      "Loading, validation, network, and API error states provide clear feedback.",
    ];
    return frame(
      "Results",
      24,
      `<div class="generated-lead"><h2>Results</h2><p>The implemented frontend supports authenticated chat, streaming responses, structured rendering, and responsive interaction.</p></div><section class="results-showcase"><div class="results-showcase__screens"><figure class="results-showcase__desktop"><img src="img/ui-desktop.png" alt="GDCE frontend desktop chat interface"><figcaption>DESKTOP FRONTEND VIEW</figcaption></figure><figure class="results-showcase__mobile"><img src="img/ui-mobile-transparent.png" alt="GDCE frontend mobile chat interface"><figcaption>MOBILE FRONTEND VIEW</figcaption></figure></div><div class="results-showcase__list">${items
        .map(function (item, index) {
          return `<article><span>${String(index + 1).padStart(2, "0")}</span><p>${item}</p></article>`;
        })
        .join("")}</div></section>`,
      "generated-slide--results",
    );
  }

  function systemLimitations() {
    var items = [
      [
        "Backend Service Availability",
        "The frontend depends on the API Layer, Orchestrator, and specialized services.",
      ],
      [
        "Variable Response Time",
        "Streaming speed depends on routing, AI processing, retrieval, calculations, and downstream services.",
      ],
      [
        "Network Dependency",
        "External AI providers and online data sources require a stable internet connection.",
      ],
      [
        "AI Result Verification",
        "Answer quality depends on the selected model, source documents, retrieved data, and service logic.",
      ],
      [
        "Full-Stack Configuration",
        "Docker networking, environment variables, credentials, and dependent services must be configured correctly.",
      ],
      [
        "Development Data Limits",
        "Orchestrator chat history and feedback are kept in memory and can be cleared when the service restarts.",
      ],
    ];
    var cards = items
      .map(function (item, index) {
        var x = (index % 3) * -33.333;
        var y = index < 3 ? 0 : -50;
        return `<article class="system-limitations__card"><span>${String(index + 1).padStart(2, "0")}</span><figure class="system-limitations__art" style="--x:${x}%; --y:${y}%"><img src="img/system-limitations-illustrations.png" alt="${item[0]} illustration"></figure><div><h3>${item[0]}</h3><p>${item[1]}</p></div></article>`;
      })
      .join("");
    return frame(
      "System Limitations & Dependencies",
      25,
      `<div class="generated-lead"><h2>System Limitations & Dependencies</h2><p>The frontend experience depends on backend services, AI/data providers, and the current development environment.</p></div><section class="system-limitations">${cards}</section>`,
      "generated-slide--system-limitations",
    );
  }

  function futureUiRecommendation() {
    function panel(label, title, bullets, type) {
      return `<section class="future-ui__panel future-ui__panel--${type}"><small>${label}</small><div class="future-ui__logos">${type === "current" ? techLogo("Vuetify 4") + techLogo("Tailwind CSS") : techLogo("shadcn-vue")}</div><h3>${title}</h3><ul>${bullets
        .map(function (item) {
          return `<li>${item}</li>`;
        })
        .join("")}</ul></section>`;
    }
    var current = [
      "Vuetify provides established Material Design components.",
      "Tailwind CSS is already used for custom layout and styling.",
      "The existing frontend contains reusable Vue components and composables.",
      "This stack supports the current application release.",
    ];
    var future = [
      "Not currently installed or implemented in the project.",
      "May provide greater control over component source and design tokens.",
      "Could fit a more custom chatbot visual identity.",
      "Requires a proof of concept, accessibility review, testing, and migration effort.",
    ];
    var recommendations = [
      [
        "Preserve Current Stack",
        "Continue using Vuetify 4 and Tailwind CSS for the current release.",
      ],
      [
        "Prototype Before Migration",
        "Build a small representative chatbot interface with shadcn-vue.",
      ],
      [
        "Compare Design Control",
        "Evaluate custom styling, theming, accessibility, performance, and developer effort.",
      ],
      [
        "Decide With Evidence",
        "Migrate only if the prototype provides clear benefits over the current stack.",
      ],
    ];
    return frame(
      "Future UI Technology Recommendation",
      26,
      `<div class="generated-lead"><h2>Future UI Technology Recommendation</h2><p>The current frontend uses Vuetify 4 and Tailwind CSS. Any component-library migration should be evaluated through a proof of concept before adoption.</p></div><section class="future-ui"><div class="future-ui__comparison">${panel("CURRENT STACK", "Vuetify 4 + Tailwind CSS", current, "current")}<div class="future-ui__arrow"><i>→</i><b>PROOF OF CONCEPT</b></div>${panel("EVALUATE FOR FUTURE", "shadcn-vue", future, "future")}</div><div class="future-ui__recommendations">${recommendations
        .map(function (item, index) {
          return `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`;
        })
        .join("")}</div></section>`,
      "generated-slide--future-ui",
    );
  }

  function futureRoadmap() {
    var items = [
      [
        "Controlled Workflow Actions",
        "AI-assisted actions require user approval, role-based access, and audit logs.",
      ],
      [
        "Enhanced Retrieval & Citations",
        "Improve source quality, document coverage, retrieval accuracy, and citations.",
      ],
      [
        "Expanded Multimodal Input",
        "Extend current image support with PDF, scanned-document, OCR, and voice input.",
      ],
      [
        "Smart Human Handover",
        "Transfer complex requests to support staff with the relevant conversation context.",
      ],
      [
        "Role-Aware Personalization",
        "Adapt responses using approved user roles and saved preferences.",
      ],
      [
        "Explainable, Cited Answers",
        "Improve source transparency, references, and confidence information.",
      ],
      [
        "Secure External System Integration",
        "Connect approved GDCE and internal systems through authenticated APIs.",
      ],
      [
        "Observability & Quality Monitoring",
        "Add production metrics, tracing, feedback analysis, and response-quality evaluation.",
      ],
    ];
    return frame(
      "Future Roadmap Recommendations",
      27,
      `<div class="generated-lead"><h2>Future Roadmap Recommendations</h2><p>Prioritized enhancements after the current chat, security, and API workflows are stable.</p></div><section class="future-roadmap"><b>FUTURE GDCE CHATBOT ROADMAP</b><div>${items
        .map(function (item, index) {
          var x = (index % 4) * -25;
          var y = Math.floor(index / 4) * -50;
          return `<article><span>${String(index + 1).padStart(2, "0")}</span><figure class="future-roadmap__art" style="--x:${x}%; --y:${y}%"><img src="img/future-roadmap-illustrations.png" alt="${item[0]} illustration"></figure><h3>${item[0]}</h3><p>${item[1]}</p></article>`;
        })
        .join(
          "",
        )}</div><small>Foundation: image attachments and structured references already exist for future items 03 and 06.</small></section>`,
      "generated-slide--future-roadmap",
    );
  }

  function conclusion() {
    var cards = [
      [
        "01",
        "◌",
        "Core Chat Journey",
        "Users can sign in, send messages, receive streamed responses, and continue conversations.",
      ],
      [
        "02",
        "↔",
        "Integrated Frontend",
        "UI, chat logic, shared state, and API/SSE streaming work together.",
      ],
      [
        "03",
        "◇",
        "Maintainable Foundation",
        "Reusable components, typed services, and clear boundaries support future development.",
      ],
    ];
    return frame(
      "Conclusion",
      28,
      `<section class="conclusion-summary">${cards
        .map(function (item, index) {
          return `<article><span>${item[0]}</span><figure class="conclusion-summary__art" style="--x:${index * -25}%"><img src="img/chat-interaction-flow-illustrations.png" alt="${item[2]} illustration"></figure><h3>${item[2]}</h3><p>${item[3]}</p></article>`;
        })
        .join(
          "",
        )}</section><p class="conclusion-summary__statement">The result is a responsive, maintainable, and extensible chatbot frontend foundation.</p>`,
      "generated-slide--conclusion",
    );
  }

  function scope(title, page, lead, inScope, outScope) {
    function panel(name, type, items, x) {
      return `<section class="scope-panel scope-panel--${type}"><div class="scope-panel__heading"><div><small>${type === "in" ? "FRONTEND DELIVERY" : "EXTERNAL RESPONSIBILITY"}</small><h3>${name}</h3></div><span aria-hidden="true">${type === "in" ? "✓" : "×"}</span></div><figure class="scope-panel__art" style="--x:${x}"><img src="img/project-scope-illustrations.png" alt="${name} illustration"></figure><ul>${items
        .map(function (item) {
          return `<li>${item}</li>`;
        })
        .join("")}</ul></section>`;
    }
    return frame(
      title,
      page,
      `<div class="generated-lead"><h2>${title}</h2><p>${lead}</p></div><div class="scope-layout scope-layout--visual">${panel("In Scope", "in", inScope, "0%")}${panel("Out of Scope", "out", outScope, "-50%")}</div>`,
      "generated-slide--scope",
    );
  }

  function process(title, page, lead, items) {
    var isChatFlow = title === "Chat Interaction Flow";
    if (isChatFlow) {
      return frame(
        title,
        page,
        `<div class="generated-lead"><h2>${title}</h2><p>${lead}</p></div>${chatFlowRoadmap(items)}`,
        "generated-slide--process generated-slide--chat-flow",
      );
    }
    var road = isChatFlow
      ? `<svg class="chat-flow-road" viewBox="0 0 1400 600" preserveAspectRatio="none" aria-hidden="true"><path class="chat-flow-road__edge" d="M80 210 H1260 Q1330 210 1330 280 V330 Q1330 400 1260 400 H80"></path><path class="chat-flow-road__lane" d="M80 210 H1260 Q1330 210 1330 280 V330 Q1330 400 1260 400 H80"></path></svg>`
      : "";
    var steps = items
      .map(function (item, index) {
        var art = isChatFlow
          ? `<figure class="chat-flow-step__art" style="--x:${(index % 4) * -25}%; --y:${index < 4 ? 0 : -50}%"><img src="img/chat-interaction-flow-illustrations.png" alt="${item[0]} illustration"></figure>`
          : "";
        return `<article class="generated-step"><span>${String(index + 1).padStart(2, "0")}</span>${art}<h3>${item[0]}</h3><p>${item[1]}</p></article>`;
      })
      .join("");
    return frame(
      title,
      page,
      `<div class="generated-lead"><h2>${title}</h2><p>${lead}</p></div><div class="generated-process${isChatFlow ? " generated-process--chat-flow" : ""}">${road}${steps}</div>`,
      `generated-slide--process${isChatFlow ? " generated-slide--chat-flow" : ""}`,
    );
  }

  function chatFlowRoadmap(items) {
    var route = `<svg class="architecture-roadmap__route" viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden="true"><path class="architecture-roadmap__base" d="M150 135 H1080 Q1125 135 1125 180 V340 Q1125 385 1080 385 H150"></path><path class="architecture-roadmap__accent" d="M150 135 H1080 Q1125 135 1125 180 V340 Q1125 385 1080 385 H150"></path><g class="architecture-roadmap__arrows"><path d="M284 124 306 135 284 146 291 135Z"></path><path d="M584 124 606 135 584 146 591 135Z"></path><path d="M884 124 906 135 884 146 891 135Z"></path><path d="M1114 252 1125 274 1136 252 1125 259Z"></path><path d="M916 374 894 385 916 396 909 385Z"></path><path d="M616 374 594 385 616 396 609 385Z"></path><path d="M316 374 294 385 316 396 309 385Z"></path></g></svg>`;
    var stages = items
      .map(function (item, index) {
        var x = (index % 4) * -25;
        var y = index < 4 ? 0 : -50;
        return `<article class="architecture-stage architecture-stage--${index + 1}"><figure class="architecture-stage__art" style="--x:${x}%; --y:${y}%"><img src="img/chat-interaction-flow-illustrations.png" alt="${item[0]} illustration"></figure><div class="architecture-stage__content"><span>${String(index + 1).padStart(2, "0")}</span><h3>${item[0]}</h3></div><p>${item[1]}</p></article>`;
      })
      .join("");
    return `<section class="architecture-diagram" aria-label="Chat interaction flow roadmap">${route}${stages}</section>`;
  }

  function benchmarkChart(rows) {
    var width = 1320,
      height = 500,
      left = 88,
      right = 1260,
      top = 48,
      bottom = 350;
    var step = (right - left) / (rows.length - 1);
    function y(value) {
      return bottom - (value / 100) * (bottom - top);
    }
    function point(value, index) {
      return (left + index * step).toFixed(1) + "," + y(value).toFixed(1);
    }
    var currentPoints = rows
      .map(function (row, index) {
        return point(row[1], index);
      })
      .join(" ");
    var previousPoints = rows
      .map(function (row, index) {
        return point(row[2], index);
      })
      .join(" ");
    var grids = [0, 25, 50, 75, 100]
      .map(function (value) {
        return `<g><line x1="${left}" y1="${y(value)}" x2="${right}" y2="${y(value)}"></line><text x="${left - 20}" y="${y(value) + 5}" text-anchor="end">${value}</text></g>`;
      })
      .join("");
    var labels = rows
      .map(function (row, index) {
        var x = left + index * step;
        return `<text class="benchmark-chart__label" x="${x}" y="${bottom + 42}" text-anchor="middle">${row[0]}</text>`;
      })
      .join("");
    var points = rows
      .map(function (row, index) {
        var x = left + index * step;
        return `<g class="benchmark-chart__point"><circle class="benchmark-chart__current-dot" cx="${x}" cy="${y(row[1])}" r="6"></circle><text class="benchmark-chart__current-value" x="${x}" y="${y(row[1]) - 16}" text-anchor="middle">${row[1]}</text><circle class="benchmark-chart__previous-dot" cx="${x}" cy="${y(row[2])}" r="6"></circle><text class="benchmark-chart__previous-value" x="${x}" y="${y(row[2]) + 24}" text-anchor="middle">${row[2]}</text><title>${row[0]}: Current ${row[1]}, Previous ${row[2]}</title></g>`;
      })
      .join("");
    return `<section class="benchmark-chart"><div class="benchmark-chart__heading"><h3>Old vs Current Technology Stack Benchmark</h3><div class="benchmark-chart__legend"><span>Old Stack</span><span>Current Stack</span></div></div><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart comparing old and current technology stacks across seven engineering criteria"><g class="benchmark-chart__grid">${grids}</g><polyline class="benchmark-chart__previous-line" points="${previousPoints}"></polyline><polyline class="benchmark-chart__current-line" points="${currentPoints}"></polyline>${points}${labels}</svg><div class="benchmark-chart__insight"><b>Key insight</b><span>The current stack scores higher across every benchmark criterion, with the largest gains in maintainability, testing, and development speed.</span></div></section>`;
  }

  function architectureDiagram() {
    var stages = [
      ["User Interface", "Entry point for users to interact with the chatbot."],
      ["Pages & Components", "Route-level screens and reusable UI components."],
      [
        "Composables & Logic",
        "Encapsulates chat workflows, streaming, and UI state logic.",
      ],
      [
        "Pinia State",
        "Centralizes conversations, messages, settings, and UI state.",
      ],
      [
        "Chat API Service",
        "Handles requests, streaming, async operations, and errors.",
      ],
      [
        "Response Normalization",
        "Adapts raw API responses into consistent typed blocks.",
      ],
      ["Renderer Registry", "Maps normalized blocks to the correct renderer."],
      [
        "Assistant Response",
        "Renders final text, tables, charts, and references.",
      ],
    ];
    return `<section class="architecture-diagram" aria-label="Frontend architecture roadmap"><svg class="architecture-roadmap__route" viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden="true"><path class="architecture-roadmap__base" d="M150 135 H1080 Q1125 135 1125 180 V340 Q1125 385 1080 385 H150"></path><path class="architecture-roadmap__accent" d="M150 135 H1080 Q1125 135 1125 180 V340 Q1125 385 1080 385 H150"></path><g class="architecture-roadmap__arrows"><path d="M284 124 306 135 284 146 291 135Z"></path><path d="M584 124 606 135 584 146 591 135Z"></path><path d="M884 124 906 135 884 146 891 135Z"></path><path d="M1114 252 1125 274 1136 252 1125 259Z"></path><path d="M916 374 894 385 916 396 909 385Z"></path><path d="M616 374 594 385 616 396 609 385Z"></path><path d="M316 374 294 385 316 396 309 385Z"></path></g></svg>${stages
      .map(function (stage, index) {
        var x = (index % 4) * -25;
        var y = index < 4 ? 0 : -50;
        return `<article class="architecture-stage architecture-stage--${index + 1}"><figure class="architecture-stage__art" style="--x:${x}%; --y:${y}%"><img src="img/frontend-architecture-illustrations.png" alt="${stage[0]} illustration"></figure><div class="architecture-stage__content"><span>${String(index + 1).padStart(2, "0")}</span><h3>${stage[0]}</h3></div><p>${stage[1]}</p></article>`;
      })
      .join("")}</section>`;
  }

  function uiModule() {
    return `<div class="generated-lead ui-module__lead"><h2>User Interface Module</h2><p>A responsive GDCE chatbot workspace keeps rich answers, source references, and conversation controls clear on every device.</p></div><section class="ui-showcase ui-showcase--screens"><figure class="ui-showcase__desktop"><img src="img/ui-desktop.png" alt="GDCE Customs AI desktop chatbot interface"><figcaption><span>DESKTOP WORKSPACE</span><b>Conversation, HS prediction, and sources</b></figcaption></figure><figure class="ui-showcase__mobile"><img src="img/ui-mobile-full.png" alt="Full GDCE Customs AI mobile chatbot interface"><figcaption>MOBILE EXPERIENCE</figcaption></figure></section>`;
  }

  function methodology(title, page, lead, items) {
    var steps = items
      .map(function (item, index) {
        var x = (index % 3) * -33.333;
        var y = index < 3 ? 0 : -50;
        return `<article class="methodology-step"><span>${String(index + 1).padStart(2, "0")}</span><figure class="methodology-step__art" style="--x:${x}%; --y:${y}%"><img src="img/research-methodology-illustrations.png" alt="${item[0]} illustration"></figure><h3>${item[0]}</h3><p>${item[1]}</p></article>`;
      })
      .join("");
    return frame(
      title,
      page,
      `<div class="generated-lead"><h2>${title}</h2><p>${lead}</p></div><div class="generated-methodology">${steps}</div>`,
      "generated-slide--methodology",
    );
  }

  function tech(title, page, lead, items) {
    var cards = items
      .map(function (item) {
        return `<article class="tech-showcase-card"><div class="tech-showcase-card__top"><span class="tech-showcase-card__badge">${item[0]}</span><span class="tech-showcase-card__tag">${techTag(item[0])}</span></div><div class="tech-showcase-card__main">${techLogo(item[1])}<div><b>${item[1]}</b><span>${techPurpose(item[0])}</span></div></div></article>`;
      })
      .join("");
    return frame(
      title,
      page,
      `<div class="generated-lead"><h2>${title}</h2><p>${lead}</p></div><div class="tech-grid">${cards}</div>`,
      "generated-slide--tech",
    );
  }

  function techTag(category) {
    var tags = {
      Framework: "CORE",
      "UI Library": "UI",
      "UI Components": "COMPONENTS",
      Styling: "DESIGN",
      State: "STATE",
      Language: "LANGUAGE",
      Charts: "VISUALS",
      "HTTP Client": "NETWORK",
      UI: "MARKUP",
      Icons: "ICONS",
      Markdown: "CONTENT",
      Sanitization: "SECURITY",
      "Code Highlighting": "RENDERING",
      Diagrams: "VISUALS",
      Validation: "QUALITY",
      Testing: "TESTING",
    };
    return tags[category] || "TOOL";
  }

  function techPurpose(category) {
    var purposes = {
      Framework: "App routing and server rendering",
      "UI Library": "Reactive application layer",
      "UI Components": "Reusable interface controls",
      Styling: "Consistent visual system",
      State: "Shared frontend session state",
      Language: "Application logic and types",
      Charts: "Interactive data visualisation",
      "HTTP Client": "Backend API communication",
      UI: "Semantic page structure",
      Icons: "Interface icon system",
      Markdown: "Rich text response rendering",
      Sanitization: "Safe generated-content output",
      "Code Highlighting": "Readable formatted code",
      Diagrams: "Flow and process diagrams",
      Validation: "Runtime data checks",
      Testing: "Automated quality assurance",
    };
    return purposes[category] || "Frontend development tool";
  }

  function techGroups(title, page, lead, groups) {
    var cards = groups
      .map(function (group) {
        return `<article class="tech-group-card"><div class="tech-group-card__top"><span>${group.badge}</span><small>${group.tag}</small></div><div class="tech-group-card__logos">${group.logos.map(techLogo).join("")}</div><h3>${group.name}</h3><p>${group.description}</p></article>`;
      })
      .join("");
    return frame(
      title,
      page,
      `<div class="generated-lead"><h2>${title}</h2><p>${lead}</p></div><div class="tech-groups">${cards}</div>`,
      "generated-slide--tech",
    );
  }

  function selectionContent() {
    var decisions = [
      {
        area: "Type safety",
        previous: "JavaScript",
        before: ["JavaScript"],
        limitation: "Runtime errors are easier to miss as the project grows.",
        selected: "TypeScript",
        logos: ["TypeScript"],
        benefit:
          "Catches errors earlier and improves long-term maintainability.",
      },
      {
        area: "Conversation state",
        previous: "Vuex",
        before: ["Vuex"],
        limitation:
          "More setup is needed for chat, history, and project state.",
        selected: "Pinia",
        logos: ["Pinia"],
        benefit: "Simpler Nuxt-first stores for the active conversation.",
      },
      {
        area: "Rich AI responses",
        previous: "Basic rendering",
        before: [],
        limitation: "Cannot fully present the formats returned by AI services.",
        selected: "Markdown · Shiki · Mermaid · ECharts",
        logos: ["markdown-it", "Shiki", "Mermaid", "ECharts"],
        benefit: "Displays formatted text, code, diagrams, and data clearly.",
      },
      {
        area: "Safe output",
        previous: "Limited validation",
        before: [],
        limitation: "Generated content needs stronger checks before display.",
        selected: "DOMPurify · Zod",
        logos: ["DOMPurify", "Zod"],
        benefit: "Sanitizes output and validates response data safely.",
      },
    ];
    var cards = decisions
      .map(function (item, index) {
        var previousLogos = item.before.length
          ? item.before.map(techLogo).join("")
          : '<span class="selection-matrix__empty">—</span>';
        return `<article class="selection-highlight-card"><div class="selection-highlight-card__top"><span>${String(index + 1).padStart(2, "0")}</span><small>${item.area}</small></div><div class="selection-highlight-card__comparison"><section class="selection-highlight-card__previous"><div>${previousLogos}</div><strong>${item.previous}</strong></section><i aria-hidden="true">→</i><section class="selection-highlight-card__selected"><div>${item.logos.map(techLogo).join("")}</div><strong>${item.selected}</strong></section></div><p>${item.benefit}</p></article>`;
      })
      .join("");
    return `<div class="generated-lead"><h2>Technology Selection Rationale</h2><p>Four focused changes make the chatbot safer, easier to maintain, and ready for rich AI responses.</p></div><section class="selection-highlights">${cards}</section><aside class="selection-conclusion"><b>Key message</b><span>The current stack fits the chatbot’s needs for reliable conversation state, rich responses, and safe rendering.</span></aside>`;
  }

  function techLogo(value) {
    var logos = {
      "Nuxt 4": ["nuxt"],
      "Vue 3": ["vue"],
      "Vuetify 4": ["vuetify"],
      "Tailwind CSS": ["tailwind"],
      "Tailwind CSS 4": ["tailwind"],
      Vuex: ["vue"],
      JavaScript: ["javascript"],
      "Chart.js": ["chartdotjs"],
      Axios: ["axios"],
      "HTML & CSS": ["html5", "css"],
      "Font Awesome": ["fontawesome"],
      Pinia: ["pinia"],
      TypeScript: ["typescript"],
      "Lucide Vue": ["lucide"],
      "markdown-it": ["markdown"],
      DOMPurify: ["javascript"],
      Shiki: ["shiki"],
      ECharts: ["apacheecharts"],
      Mermaid: ["mermaid"],
      Zod: ["zod"],
      "Node Test Runner + tsx": ["nodedotjs"],
      "shadcn-vue": ["shadcn-vue"],
    };
    var selected = logos[value] || ["javascript"];
    return `<figure class="tech-logo ${selected.length > 1 ? "tech-logo--dual" : ""}">${selected
      .map(function (logo) {
        return `<img src="img/tech-logos/${logo}.svg" alt="${value} logo">`;
      })
      .join("")}</figure>`;
  }

  function techIllustrationPosition(topic) {
    var positions = {
      Framework: ["0%", "0%"],
      "UI Library": ["-25%", "0%"],
      "UI Components": ["-50%", "0%"],
      Styling: ["-75%", "0%"],
      State: ["0%", "-25%"],
      Language: ["-25%", "-25%"],
      Charts: ["-50%", "-25%"],
      "HTTP Client": ["-75%", "-25%"],
      UI: ["0%", "-50%"],
      Icons: ["-25%", "-50%"],
      Markdown: ["-50%", "-50%"],
      Sanitization: ["-75%", "-50%"],
      "Code Highlighting": ["0%", "-75%"],
      Diagrams: ["-25%", "-75%"],
      Validation: ["-50%", "-75%"],
      Testing: ["-75%", "-75%"],
    };
    return positions[topic] || ["0%", "-50%"];
  }

  function techIcon(topic) {
    var icons = {
      Framework:
        '<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4zM8 9h8M8 13h5"/></svg>',
      "UI Library":
        '<svg viewBox="0 0 24 24"><path d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v4H4zM14 15h6v4h-6z"/></svg>',
      "UI Components":
        '<svg viewBox="0 0 24 24"><path d="M5 4h14v5H5zM5 15h6v5H5zM14 15h5v5h-5z"/></svg>',
      Styling:
        '<svg viewBox="0 0 24 24"><path d="M5 19 17 7l2 2L7 21H5zM14 5l2-2 3 3-2 2z"/></svg>',
      State:
        '<svg viewBox="0 0 24 24"><path d="M7 7h10v10H7zM4 12H2m20 0h-2M12 4V2m0 20v-2M7 7 5 5m12 14 2 2M17 7l2-2M7 17l-2 2"/></svg>',
      Language:
        '<svg viewBox="0 0 24 24"><path d="m9 18-6-6 6-6M15 6l6 6-6 6M13 4l-2 16"/></svg>',
      Charts:
        '<svg viewBox="0 0 24 24"><path d="M4 20V4m0 16h16M8 16v-4m4 4V8m4 8v-7"/></svg>',
      "HTTP Client":
        '<svg viewBox="0 0 24 24"><path d="M8 7H5a3 3 0 0 0 0 6h2m9-6h3a3 3 0 0 1 0 6h-3M8 12h8"/></svg>',
      UI: '<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4zM4 9h16M8 7h.01M11 7h.01"/></svg>',
      Icons:
        '<svg viewBox="0 0 24 24"><path d="M12 3 14.7 8.5 21 9.4l-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.4l6.3-.9z"/></svg>',
      Markdown:
        '<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4zM7 16V9l3 4 3-4v7m3-1h2"/></svg>',
      Sanitization:
        '<svg viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6zM8 12l2.5 2.5L16 9"/></svg>',
      "Code Highlighting":
        '<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4zM8 10h8M8 14h5"/></svg>',
      Diagrams:
        '<svg viewBox="0 0 24 24"><path d="M6 5h5v5H6zM13 14h5v5h-5zM8.5 10v2h7v2"/></svg>',
      Validation:
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="m8.5 12 2.2 2.2 4.8-4.8"/></svg>',
      Testing:
        '<svg viewBox="0 0 24 24"><path d="M9 3v6l-4 8a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-4-8V3M8 3h8M8 16h8"/></svg>',
    };
    return icons[topic] || icons["UI"];
  }

  function frontendCover() {
    return `<section class="slide slide--title frontend-cover" data-slide="title"><div class="title-slide-content"><img class="title-slide__logo" src="img/web/gdce-logo.png" alt="GDCE logo"><h1>Customs Assistant Frontend</h1><p class="title-slide__sub">Multi-domain Customs AI Assistant User Interface</p><p class="title-slide__features">Chat Experience · Conversation Management · Responsive Design · API Integration</p><p class="title-slide__org">General Department of Customs and Excise of Cambodia</p><p class="title-slide__meta">Technical Presentation · Frontend Development Team · August 2026</p></div><div class="page-number">0</div></section>`;
  }

  function frontendAgenda() {
    var items = [
      ["01", "Introduction & Problem Statement", "#073d52", 3],
      ["02", "Project Objectives, Scope & Deliverables", "#0e7490", 6],
      ["03", "Development Methodology & Technology Stack", "#2e7d5b", 9],
      ["04", "System Architecture & Frontend Design", "#b08d57", 14],
      ["05", "Core Modules, Backend Services & API Integration", "#7e57c2", 17],
      ["06", "System Implementation, Security & Testing", "#c25e3a", 23],
      ["07", "Results, Limitations & Evaluation", "#3b6fb6", 26],
      ["08", "Conclusion & Future Roadmap", "#8f6b2e", 29],
    ];
    return `<section class="slide slide--content slide--agenda frontend-agenda" data-slide="content"><header class="slide-header"><div class="brand-mark" aria-label="GDCE"><div class="brand-mark__icon">▤</div><div class="brand-mark__text">GDCE<br>CUSTOMS</div></div><div class="slide-title"><span class="slide-title__en">Customs Assistant System · Agenda</span></div><div class="org-mark" aria-label="GDCE logo">GDCE</div></header><div class="gold-rule"></div><div class="slide-body"><div class="slide-content"><div class="agenda-modern">${items
      .map(function (item) {
        return `<article class="agenda-modern__item" style="--agenda-color: ${item[2]}"><span>${item[0]}</span><h2>${item[1]}</h2><small>SLIDE ${item[3]}</small></article>`;
      })
      .join(
        "",
      )}</div></div></div><footer class="slide-footer"><div class="footer-left">General Department of Customs and Excise of Cambodia</div><div class="page-number">0</div></footer></section>`;
  }

  function frontendIntroduction() {
    var modules = [
      [
        "0%",
        "0%",
        "API communication illustration",
        "User-Focused Chat Interface",
        "Provides an authenticated, end-to-end chat interaction experience.",
      ],
      [
        "-33.333%",
        "0%",
        "Message interaction illustration",
        "Message Interaction",
        "Accepts user questions and displays streamed assistant responses.",
      ],
      [
        "-66.666%",
        "0%",
        "Conversation management illustration",
        "Conversation Management",
        "Maintains local chats, message history, projects, and active chat state.",
      ],
      [
        "0%",
        "-50%",
        "User interface illustration",
        "API Communication",
        "Connects the frontend to authenticated GDCE API and streaming endpoints.",
      ],
      [
        "-33.333%",
        "-50%",
        "Multiple response rendering illustration",
        "Structured Response Rendering",
        "Renders Markdown, summaries, tables, charts, references, predictions, suggestions, and errors.",
      ],
      [
        "-66.666%",
        "-50%",
        "Responsive experiences illustration",
        "Responsive Experience",
        "Supports responsive layouts for desktop, tablet, and mobile devices.",
      ],
    ];
    return `<section class="slide slide--content slide--introduction" data-slide="content"><header class="slide-header"><div class="brand-mark" aria-label="GDCE"><div class="brand-mark__icon">▤</div><div class="brand-mark__text">GDCE<br>CUSTOMS</div></div><div class="slide-title"><span class="slide-title__en">Introduction</span></div><div class="org-mark" aria-label="GDCE logo">GDCE</div></header><div class="gold-rule"></div><div class="slide-body"><div class="slide-content introduction-content"><div class="introduction-layout"><div class="introduction-layout__details"><div class="introduction-content__heading"><h2>Introduction</h2><p>A web-based chatbot frontend that connects users to GDCE chatbot services through a clear, responsive, and maintainable interface.</p></div><div class="introduction-modules">${modules
      .map(function (item, index) {
        return `<article class="introduction-module"><span>${String(index + 1).padStart(2, "0")}</span><figure class="introduction-module__art" style="--x: ${item[0]}; --y: ${item[1]}"><img src="img/web/introduction-topic-illustrations.png" alt="${item[2]}"></figure><h3>${item[3]}</h3><p>${item[4]}</p></article>`;
      })
      .join(
        "",
      )}</div></div></div></div></div><footer class="slide-footer"><div class="footer-left">General Department of Customs and Excise of Cambodia</div><div class="page-number">0</div></footer></section>`;
  }

  function frontendProblemStatement() {
    var challenges = [
      [
        "0%",
        "0%",
        "Multiple response formats illustration",
        "Multiple Response Formats",
        "Backend services can return text and structured content.",
      ],
      [
        "-33.333%",
        "0%",
        "Streaming responses illustration",
        "Streaming Responses",
        "Users need progressive feedback instead of waiting for a completed answer.",
      ],
      [
        "-66.666%",
        "0%",
        "Complex generated content illustration",
        "Complex Generated Content",
        "Tables, charts, references, and other formats must remain readable.",
      ],
      [
        "0%",
        "-50%",
        "Responsive interface illustration",
        "Responsive Interface",
        "Chat controls and generated content must work across desktop and mobile.",
      ],
      [
        "-33.333%",
        "-50%",
        "Long conversations illustration",
        "Long Conversations",
        "Conversation history and state must remain manageable.",
      ],
      [
        "-66.666%",
        "-50%",
        "Safe rendering illustration",
        "Safe Rendering",
        "Generated output requires validation, sanitization, and safe fallbacks.",
      ],
    ];
    return `<section class="slide slide--content slide--problems" data-slide="content"><header class="slide-header"><div class="brand-mark" aria-label="GDCE"><div class="brand-mark__icon">▤</div><div class="brand-mark__text">GDCE<br>CUSTOMS</div></div><div class="slide-title"><span class="slide-title__en">Problem Statement</span></div><div class="org-mark" aria-label="GDCE logo">GDCE</div></header><div class="gold-rule"></div><div class="slide-body"><div class="slide-content problems-content"><div class="problems-content__intro"><p class="problems-content__eyebrow">FRONTEND CHALLENGES</p><h2>Problem Statement</h2><p>A modern AI chatbot frontend must handle more than plain text.</p></div><div class="challenge-map">${challenges
      .map(function (item) {
        return `<article class="challenge-node"><figure class="challenge-node__art" style="--x: ${item[0]}; --y: ${item[1]}"><img src="img/web/problem-topic-illustrations.png" alt="${item[2]}"></figure><h3>${item[3]}</h3><p>${item[4]}</p></article>`;
      })
      .join(
        "",
      )}</div></div></div><footer class="slide-footer"><div class="footer-left">General Department of Customs and Excise of Cambodia</div><div class="page-number">0</div></footer></section>`;
  }

  var slides = [];

  slides.push(frontendCover());
  slides.push(frontendAgenda());
  slides.push(section("01", "Introduction & Problem Statement", 0));
  slides.push(frontendIntroduction());
  slides.push(frontendProblemStatement());

  slides.push(section("02", "Project Objectives, Scope & Deliverables", 0));

  slides.push(
    objectiveCards(
      "Project Objectives",
      6,
      "Build a complete, reliable frontend chatbot application for GDCE systems.",
      [
        [
          "Responsive Chatbot Interface",
          "Develop a Nuxt/Vue interface that works clearly across desktop and mobile.",
        ],
        [
          "Reusable Components",
          "Build modular interface components that remain easy to maintain and extend.",
        ],
        [
          "Conversation Management",
          "Manage conversations, messages, projects, and local session history.",
        ],
        [
          "Message Input & Validation",
          "Support message input, file attachments, and client-side validation.",
        ],
        [
          "Backend API Integration",
          "Connect GDCE chatbot services through typed requests and error handling.",
        ],
        [
          "Streaming Responses",
          "Support Server-Sent Events for progressive chatbot responses.",
        ],
        [
          "Response Normalization",
          "Convert backend results into consistent frontend message blocks.",
        ],
        [
          "Rich Response Rendering",
          "Render Markdown, tables, charts, references, and HS predictions.",
        ],
        [
          "Reliable State",
          "Use Pinia and local persistence for stable frontend state.",
        ],
        [
          "Testing & Delivery",
          "Prepare the frontend for testing, deployment, and future improvements.",
        ],
      ],
      "generated-cards--five",
    ),
  );

  slides.push(
    scope(
      "Project Scope",
      7,
      "Frontend responsibilities are clearly separated from backend, model, and infrastructure concerns.",
      [
        "Chat interface, navigation, and settings",
        "Message input, validation, and streaming",
        "Response normalization and rich rendering",
        "Conversation management and frontend API integration",
        "Local persistence, responsive design, and localization",
        "Frontend testing and deployment preparation",
      ],
      [
        "AI model training and model architecture",
        "Retrieval algorithms and backend domain rules",
        "Backend database and infrastructure operations",
        "Backend performance tuning and security certification",
      ],
    ),
  );

  slides.push(section("03", "Development Methodology & Technology Stack", 0));

  slides.push(
    methodology(
      "Development Methodology",
      9,
      "The project followed a structured workflow from requirements and design through API integration and validation.",
      [
        [
          "Requirement Analysis",
          "Identify chatbot functions, API requirements, response formats, and frontend constraints.",
        ],
        [
          "UI/UX Design",
          "Define chat layouts, interaction feedback, accessibility, and responsive behavior.",
        ],
        [
          "Technology Selection",
          "Select Nuxt, Vue, TypeScript, Pinia, Vuetify, and Tailwind CSS for maintainable frontend development.",
        ],
        [
          "API Contract Design",
          "Define authentication, typed requests, streaming responses, normalized response blocks, and error behavior.",
        ],
        [
          "Frontend Implementation",
          "Build reusable components, composables, stores, API services, and renderers.",
        ],
        [
          "Testing & Validation",
          "Validate API services, streaming, normalized responses, renderer safety, error handling, and responsive layouts.",
        ],
      ],
    ),
  );

  slides.push(
    techGroups(
      "Previous Technology Stack",
      10,
      "The original stack established the frontend foundation, with core UI and API tools selected for initial delivery.",
      [
        {
          badge: "APP FOUNDATION",
          tag: "CORE",
          name: "Nuxt + Vue",
          logos: ["Nuxt 4", "Vue 3"],
          description:
            "Framework and reactive UI layer used to build the first chatbot application experience.",
        },
        {
          badge: "UI SYSTEM",
          tag: "DESIGN",
          name: "Vuetify + Tailwind",
          logos: ["Vuetify 4", "Tailwind CSS"],
          description:
            "Component library and utility styling system for consistent layouts and responsive screens.",
        },
        {
          badge: "CLIENT STATE",
          tag: "STATE",
          name: "Vuex",
          logos: ["Vuex"],
          description:
            "Centralized store for conversations, messages, and frontend session information.",
        },
        {
          badge: "API LAYER",
          tag: "NETWORK",
          name: "Axios",
          logos: ["Axios"],
          description:
            "HTTP client used to connect the chatbot interface with backend services.",
        },
        {
          badge: "CONTENT + DATA",
          tag: "RENDERING",
          name: "JavaScript + Chart.js",
          logos: ["JavaScript", "Chart.js"],
          description:
            "Application logic and data visualisation for early chatbot response requirements.",
        },
        {
          badge: "INTERFACE ASSETS",
          tag: "UI",
          name: "HTML/CSS + Font Awesome",
          logos: ["HTML & CSS", "Font Awesome"],
          description:
            "Semantic page structure and interface icons supporting the initial visual design.",
        },
      ],
    ),
  );

  slides.push(
    techGroups(
      "Current Technology Stack",
      11,
      "The current stack improves type safety, rich content support, validation, and frontend maintainability.",
      [
        {
          badge: "APP FOUNDATION",
          tag: "CORE",
          name: "Nuxt + Vue + TypeScript",
          logos: ["Nuxt 4", "Vue 3", "TypeScript"],
          description:
            "Modern framework foundation with stronger contracts and safer application development.",
        },
        {
          badge: "UI SYSTEM",
          tag: "DESIGN",
          name: "Vuetify + Tailwind + Lucide",
          logos: ["Vuetify 4", "Tailwind CSS 4", "Lucide Vue"],
          description:
            "Reusable components, flexible styling, and a consistent interface icon system.",
        },
        {
          badge: "STATE + API",
          tag: "DATA",
          name: "Pinia + Axios",
          logos: ["Pinia", "Axios"],
          description:
            "Simple shared state and reliable communication with chatbot backend services.",
        },
        {
          badge: "RICH RESPONSES",
          tag: "CONTENT",
          name: "Markdown + Shiki + Mermaid",
          logos: ["markdown-it", "Shiki", "Mermaid"],
          description:
            "Render structured text, highlighted code, and readable diagrams inside chatbot answers.",
        },
        {
          badge: "VALIDATION + SAFETY",
          tag: "SECURITY",
          name: "DOMPurify + Zod",
          logos: ["DOMPurify", "Zod"],
          description:
            "Sanitize rich output and validate runtime data before it reaches the interface.",
        },
        {
          badge: "VISUALS + QUALITY",
          tag: "DELIVERY",
          name: "ECharts + Node Test Runner",
          logos: ["ECharts", "Node Test Runner + tsx"],
          description:
            "Present response data clearly and verify frontend behavior through automated testing.",
        },
      ],
    ),
  );

  slides.push(
    frame(
      "Benchmark Approach",
      12,
      `<div class="generated-lead"><h2>Benchmark Approach</h2><p>Comparison of the old and current frontend stacks across seven engineering criteria.</p></div>${benchmarkChart(
        [
          ["Performance", 90, 72],
          ["Bundle efficiency", 86, 68],
          ["Development speed", 91, 65],
          ["Maintainability", 92, 55],
          ["Scalability", 90, 58],
          ["Security", 89, 60],
          ["Testing", 88, 52],
        ],
      )}`,
      "generated-slide--benchmark",
    ),
  );

  slides.push(section("04", "System Architecture & Frontend Design", 0));

  slides.push(
    frame(
      "Frontend Architecture",
      14,
      `<div class="generated-lead"><h2>Frontend Architecture</h2><p>A modular pipeline turns user input and backend responses into a reliable, rich chatbot experience.</p></div>${architectureDiagram()}`,
      "generated-slide--architecture",
    ),
  );

  slides.push(
    frame("User Interface Module", 15, uiModule(), "generated-slide--ui"),
  );

  slides.push(
    section("05", "Core Modules, Backend Services & API Integration", 0),
  );

  slides.push(
    process(
      "Chat Interaction Flow",
      16,
      "End-to-end workflow from user input to final rendered response and persistence.",
      [
        ["INPUT", "User enters message / attachment"],
        ["VALIDATE", "Validate text and allowed files"],
        ["CREATE MESSAGE", "Add user message immediately"],
        ["STREAM REQUEST", "Send request to GDCE API"],
        ["RECEIVE EVENTS", "Start • Progress • Delta Block • Done • Error"],
        ["NORMALIZE", "Convert final response into canonical message blocks"],
        ["RENDER", "Render registry displays the response"],
        ["PERSIST", "Save conversation state"],
      ],
    ),
  );

  slides.push(conversationManagement());

  slides.push(
    frame(
      "API Integration",
      18,
      apiIntegration(),
      "generated-slide--api-integration",
    ),
  );

  slides.push(stateManagement());

  slides.push(frontendBestPractices());

  slides.push(section("06", "System Implementation, Security & Testing", 0));

  slides.push(systemImplementation());

  slides.push(testingEvaluation());

  slides.push(section("07", "Results, Limitations & Evaluation", 0));

  slides.push(results());

  slides.push(systemLimitations());

  slides.push(section("08", "Conclusion & Future Roadmap", 0));

  slides.push(futureUiRecommendation());

  slides.push(futureRoadmap());

  slides.push(conclusion());

  slides.push(
    `<section class="slide slide--title frontend-thank-you" data-slide="title"><div class="title-slide-content"><img class="title-slide__logo" src="img/web/gdce-logo.png" alt="GDCE logo"><h1>Thank You</h1><p class="title-slide__sub">Questions &amp; Discussion</p><p class="title-slide__org">General Department of Customs and Excise of Cambodia</p></div><div class="page-number">0</div></section>`,
  );

  slides.push(
    `<section class="slide slide--content demo-slide" data-slide="content"><header class="slide-header"><div class="brand-mark" aria-label="GDCE"><div class="brand-mark__icon">▤</div></div><div class="slide-title"><span class="slide-title__en">Demonstration</span></div><div class="org-mark" aria-label="GDCE logo">GDCE</div></header><div class="gold-rule"></div><div class="slide-body"><div class="slide-content demo-slide__content"><h2>GDCE AI Assistant Frontend Demo</h2><video controls playsinline preload="metadata" aria-label="GDCE AI Assistant Frontend demonstration video"><source src="video/web/customs-chatbot-demo-edited.mp4" type="video/mp4">Your browser does not support HTML video.</video></div></div><footer class="slide-footer"><div class="footer-left">General Department of Customs and Excise of Cambodia</div><div class="page-number">30</div></footer></section>`,
  );

  var markup = slides.join("").replace(/src="img\/(?!web\/)/g, 'src="img/web/');
  deck.replaceChildren();
  deck.insertAdjacentHTML("beforeend", markup);
});

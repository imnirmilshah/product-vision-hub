// TODO: Replace with Contentful CMS integration. See /docs/contentful-setup.md for migration guide.
// Data shape is designed to match Contentful's response structure for easy migration.

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Product Management" | "AI/ML" | "Cloud" | "Career";
  publishDate: string;
  readTime: number;
  featuredGradient: string;
  heroImage?: string;
  body: string;
}

export const categoryGradients: Record<string, string> = {
  "AI/ML": "from-purple to-primary",
  "Product Management": "from-orange to-yellow-400",
  Cloud: "from-blue-500 to-green",
  Career: "from-pink-500 to-orange",
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "claude-ai-product-management",
    title: "How I Use Claude AI to Ship Products 3x Faster at AWS",
    excerpt:
      "A practical walkthrough of how I integrate Claude into my daily PM workflow, from PRD drafts to competitive analysis to stakeholder comms.",
    category: "AI/ML",
    publishDate: "2026-02-10",
    readTime: 8,
    featuredGradient: "from-purple to-primary",
    heroImage: "/product-vision-hub/images/blog/01-claude-ai-pm.svg",
    body: `## The Problem with Traditional PM Workflows

Product management has always been a discipline of context-switching. On any given day, you're writing PRDs in the morning, synthesizing customer research by lunch, drafting stakeholder emails in the afternoon, and reviewing competitive intel before EOD. Each task demands deep focus, but the sheer volume means you're constantly operating at 60% depth. I spent two years in this cycle at AWS before realizing there had to be a better way: not to replace the thinking, but to accelerate the scaffolding around it.

## How Claude Changes the Game

Claude isn't a magic button that does your job. It's more like a senior colleague who's read everything, never forgets context, and can draft at the speed of thought. The key insight is that most PM artifacts follow patterns: PRDs have a predictable structure, competitive analyses follow frameworks, OKRs need to be SMART. Claude excels at generating high-quality first drafts that follow these patterns, freeing you to focus on the strategic decisions that actually matter: the "what" and "why," not the "how do I format this."

## Specific Examples: Where Claude Delivers 3x Value

**PRD Generation:** I feed Claude a one-paragraph product brief and get back a structured PRD with user stories, acceptance criteria, success metrics, and edge cases in under 2 minutes. What used to take 3-4 hours of writing now takes 45 minutes of editing and refining.

**Research Synthesis:** After customer interviews, I paste raw notes into Claude and ask for theme extraction with supporting quotes. It identifies patterns I might miss and organizes them into actionable insight clusters.

**OKR Writing:** Claude understands the difference between aspirational and committed OKRs. I describe the strategic intent, and it generates measurable key results that are actually specific enough to track.

## The claude.md Setup That Makes It Work

The secret sauce is the \`claude.md\` project file, a persistent context document that tells Claude who you are, what you're working on, and how you like to operate. Here's a simplified version of mine:

\`\`\`markdown
# Project Context
- Role: Senior Technical PM at AWS AI/ML
- Current focus: Bedrock regional expansion, Nova model launches
- Stakeholders: Engineering (2 teams), Design, BD, Legal
- Writing style: Direct, data-driven, minimal jargon
- PRD template: Follow Amazon's Working Backwards format
- OKR format: Committed (90%+ confidence) vs Aspirational (70%)

# Key Metrics
- API latency p99 targets
- Regional adoption rates
- Enterprise customer activation
\`\`\`

## Results and Takeaway

Since adopting this workflow, I've cut document creation time by roughly 65%, increased my PRD output from 2 to 5 per sprint, and, most importantly, freed up 8+ hours per week for actual strategic thinking, customer conversations, and cross-team alignment. The takeaway isn't "use AI to do less." It's "use AI to do more of what matters." Claude handles the scaffolding so you can focus on the architecture.`,
  },
  {
    id: "2",
    slug: "rag-pipeline-explained",
    title: "The RAG Pipeline Explained: How AI Answers Questions It Was Never Trained On",
    excerpt:
      "A deep dive into Retrieval-Augmented Generation, the architecture powering every enterprise AI product, from Amazon Bedrock to ChatGPT plugins.",
    category: "AI/ML",
    publishDate: "2026-01-28",
    readTime: 12,
    featuredGradient: "from-purple to-primary",
    heroImage: "/product-vision-hub/images/blog/02-rag-pipeline.svg",
    body: `## What Is RAG and Why It Matters

Retrieval-Augmented Generation (RAG) is the most important architecture pattern in applied AI today. At its core, RAG solves a fundamental problem: large language models are incredibly capable reasoners, but they only know what they were trained on. RAG gives them access to external knowledge (your company's docs, your product data, the latest research) at inference time, without retraining. Every enterprise AI product you've seen in the last two years, from Amazon Bedrock's Knowledge Bases to ChatGPT plugins to Notion AI, is running some version of this pattern.

## The Problem with Pure LLMs

Pure LLMs have three critical limitations. First, **hallucination**: when they don't know something, they'll confidently make it up. Second, **stale data**: a model trained in 2024 doesn't know about your Q1 2026 product launch. Third, **no access to private data**: GPT-4 has never read your internal wiki, your Confluence pages, or your customer support tickets. Fine-tuning can partially address these issues, but it's expensive, slow, and the model can still hallucinate. RAG offers a more elegant solution: give the model the right context at the right time.

## The Pipeline: Embed → Store → Retrieve → Generate

The RAG pipeline has four stages:

1. **Embedding**: Your documents are split into chunks (typically 256-512 tokens) and converted into vector embeddings using a model like Amazon Titan Embeddings or OpenAI's ada-002. These vectors capture semantic meaning: similar concepts cluster together in vector space.

2. **Storage**: Vectors are stored in a vector database. Options include Amazon OpenSearch Serverless, Pinecone, pgvector (Postgres extension), or Weaviate. Each vector is linked back to its original text chunk.

3. **Retrieval**: When a user asks a question, the question itself is embedded into the same vector space. A similarity search (typically cosine similarity or dot product) finds the top-k most relevant chunks. This is where the "retrieval" in RAG happens.

4. **Generation**: The retrieved chunks are injected into the LLM's prompt as context, along with the user's question. The model generates an answer grounded in the retrieved information, dramatically reducing hallucination.

## Real-World Example: Spotify Pricing Analysis

Imagine you're a PM analyzing competitive pricing. You have 200 pages of analyst reports, earnings transcripts, and internal research. Without RAG, you'd ask Claude "What's Spotify's pricing strategy?" and get a generic 2024-era answer. With RAG, the system retrieves your specific documents (the Q4 2025 earnings call where Daniel Ek discussed price elasticity, your internal competitive analysis from last month) and generates an answer grounded in *your* data. The difference between generic and actionable.

## Infrastructure Options

For teams building RAG systems, the infrastructure landscape has matured significantly:

- **Amazon Bedrock Knowledge Bases**: Fully managed RAG. Upload your docs, Bedrock handles chunking, embedding, storage (OpenSearch Serverless), and retrieval. Best for AWS-native teams who want zero infrastructure management.
- **Pinecone + Any LLM**: Purpose-built vector DB with excellent performance. Great for teams that want fine-grained control over their retrieval layer.
- **pgvector**: Vector search as a Postgres extension. Perfect if you're already running Postgres and want to avoid adding another database to your stack.

## When to Use RAG vs Fine-Tuning

Use RAG when you need the model to access specific, frequently updated information: product docs, knowledge bases, recent data. Use fine-tuning when you need the model to adopt a specific style, tone, or behavioral pattern. In practice, most enterprise applications use RAG as the primary pattern and fine-tuning as an optimization layer. The two aren't mutually exclusive. Many production systems combine both for maximum accuracy.`,
  },
  {
    id: "3",
    slug: "spotify-pricing-analysis",
    title: "Why Spotify's Price Increase Won't Hurt Them: A PM's Analysis",
    excerpt:
      "Spotify raised prices three times in three years. Here's why their churn rate barely moved, and what product managers can learn from it.",
    category: "Product Management",
    publishDate: "2026-01-15",
    readTime: 6,
    featuredGradient: "from-orange to-yellow-400",
    heroImage: "/product-vision-hub/images/blog/03-spotify-pricing.svg",
    body: `## The Pricing History: $9.99 → $12.99

Spotify has raised its individual Premium plan price three times since 2023: from $9.99 to $10.99, then to $11.99, and most recently to $12.99. That's a 30% increase in under three years. On paper, this looks like a churn landmine. In practice, Spotify's premium subscriber count has continued to grow every quarter, and their churn rate has remained remarkably stable at around 3.9% monthly. How? Because Spotify understood something most product teams don't: the time to raise prices is *after* you've built the moat, not before.

## Why Costs Forced the Increase

Let's be honest about the economics. Spotify pays roughly 70 cents of every dollar in royalties to labels and rights holders. Their gross margins have historically hovered around 25-28%, razor thin for a tech company. Meanwhile, they've been investing heavily in podcasts (the Joe Rogan deal alone was reportedly $250M), audiobooks, and AI-powered features like DJ. The price increases weren't a greed play; they were a survival necessity to fund the transition from "music streamer" to "audio platform." The question was never *whether* to raise prices, but whether users would stay.

## The Four Moats Preventing Churn

**Switching costs are astronomical.** After years of use, your Spotify account contains thousands of hours of listening history, curated playlists, Discover Weekly algorithms tuned to your taste, and social connections. Moving to Apple Music means starting from zero. The data moat alone is worth $2/month to most users.

**Utility pricing psychology.** At $12.99/month, Spotify costs roughly 43 cents per day. Users subconsciously compare this to a single coffee ($5+), a movie ticket ($15+), or a vinyl record ($30+). When the perceived value vastly exceeds the price, small increases feel irrelevant. Spotify delivers 100M+ songs for the price of half a latte.

**Historical proof of tolerance.** Each successive price increase was a test. When the first hike from $9.99 to $10.99 barely registered in churn metrics, it gave Spotify confidence (and Wall Street proof) that demand was inelastic at these price points. They're operating on data, not guesswork.

**Deepening engagement prevents churn.** Spotify isn't just raising prices; they're simultaneously adding features. AI DJ, audiobooks (15 hours/month included), podcast video, and collaborative playlists all launched in the same period. Users feel like they're getting *more* for the higher price, not the same thing for more money.

## The PM Lesson: Build the Moat Before Raising the Bridge

The lesson for product managers is architectural: pricing power is earned, not assumed. Before you can raise prices, you need switching costs (data, network effects, integrations), perceived value that exceeds the price by 5-10x, and a track record of delivering new value continuously. Spotify spent a decade building these moats before touching the price lever. If your product doesn't have at least two of these three moats, a price increase will accelerate churn, not revenue. Build the moat first, then raise the bridge.`,
  },
  {
    id: "4",
    slug: "data-engineer-to-product-manager",
    title: "From Data Engineer to Product Manager: My Career Pivot Playbook",
    excerpt:
      "I went from building data pipelines to leading product strategy at AWS. Here's the honest truth about making the switch, and why technical depth is a PM superpower.",
    category: "Career",
    publishDate: "2025-12-20",
    readTime: 7,
    featuredGradient: "from-pink-500 to-orange",
    heroImage: "/product-vision-hub/images/blog/04-career-pivot.svg",
    body: `## Why I Made the Switch

I spent four years as a data engineer: building ETL pipelines, designing data warehouses, writing Spark jobs that processed billions of rows. I was good at it, and I liked it. But I kept finding myself more interested in *why* we were building things than *how*. In sprint planning, I'd ask about customer impact metrics. In design reviews, I'd question whether we were solving the right problem. I was, without realizing it, already thinking like a PM. The actual transition was less of a leap and more of a formalization of where my curiosity had already taken me.

## What Transferred: Systems Thinking, Data Literacy, and Credibility

Three skills from data engineering translated directly. **Systems thinking** (understanding how components interact, where bottlenecks form, and how changes cascade) is the foundation of good product strategy. When I think about a feature, I naturally think about the entire system: data flow, API contracts, infrastructure implications, and failure modes.

**Data literacy** is a superpower. Most PMs struggle with SQL, can't read a metrics dashboard critically, and rely on analysts for basic questions. I can pull my own data, build my own dashboards, and, critically, spot when metrics are misleading. This saves days per sprint and earns enormous credibility with engineering teams.

**Technical credibility** opens doors that are locked for non-technical PMs. Engineers trust me because I've been in their shoes. I can review a technical design doc and ask informed questions. I never hand-wave about implementation complexity. This trust is the foundation of the PM-engineering relationship.

## What I Had to Learn: The Hard Parts

The technical skills were the easy part. The hard parts were all human. **Stakeholder management** (navigating competing priorities between engineering leads, design, business development, and leadership) was a completely new muscle. As an engineer, I had one manager and clear requirements. As a PM, I have a dozen stakeholders with conflicting needs, and my job is to synthesize them into a coherent strategy.

**Prioritization** was harder than any technical challenge I'd faced. With engineering, there's usually an objectively correct approach. With product, every decision is a tradeoff, and the data rarely gives you a definitive answer. Learning to make decisions with 60% confidence and iterate was deeply uncomfortable for my engineer brain.

**Communication** (specifically, writing for non-technical audiences) required complete rewiring. Engineering docs optimize for precision; product docs optimize for clarity and persuasion. I had to learn to lead with the "why" and the customer impact, not the technical architecture.

## How Technical Background Helps Daily at AWS

At AWS, being a technical PM isn't a nice-to-have; it's essential. I work on AI/ML services where understanding model architectures, inference optimization, and distributed systems isn't optional. I can have direct technical conversations with principal engineers, evaluate architectural tradeoffs without translation layers, and write PRDs that engineers actually respect. My data engineering background specifically helps with understanding ML pipelines, data infrastructure at scale, and the real costs (compute, latency, storage) behind product decisions.

## Advice for Engineers Considering the Move

If you're an engineer thinking about PM, here's my honest advice: don't rush it. First, start doing PM-adjacent work in your current role: volunteer for sprint planning, write a mini-PRD for a feature you care about, present a customer problem to your team. Second, find a PM mentor who can give you unfiltered feedback on your product thinking. Third, consider an internal transfer before an external one, since you already have context and credibility at your current company. And finally, know that you'll feel like a beginner again. That discomfort is the growth. Lean into it.`,
  },
  {
    id: "5",
    slug: "passive-to-active-cloud",
    title: "The Cloud Is Going from Passive to Active: Here's What That Means",
    excerpt:
      "Cloud infrastructure is evolving from 'do what I say' to 'do what I need.' AI-native services from AWS, GCP, and Azure are making self-healing, self-optimizing infrastructure a reality.",
    category: "Cloud",
    publishDate: "2025-12-05",
    readTime: 10,
    featuredGradient: "from-blue-500 to-green",
    heroImage: "/product-vision-hub/images/blog/05-cloud-active.svg",
    body: `## The Old Model: User-Driven, Reactive Infrastructure

For the past 15 years, cloud computing has operated on a fundamentally passive model. You tell AWS to spin up an EC2 instance, and it spins up an EC2 instance. You configure auto-scaling rules, and it follows those rules. You set up CloudWatch alarms, and it fires when thresholds are breached. The cloud does exactly what you tell it to do, no more, no less. This model has been incredibly successful, powering everything from startups to Fortune 500 companies. But it has a fundamental limitation: it requires humans to anticipate every scenario, configure every response, and monitor every metric. The cloud is smart infrastructure operated by human decision-making.

## The New Model: AI-Driven, Proactive Infrastructure

We're now witnessing a paradigm shift. Cloud providers are embedding AI directly into infrastructure services, creating systems that don't just execute commands but anticipate needs, prevent failures, and optimize themselves autonomously. This isn't about adding an AI chatbot to the console. It's about fundamentally changing the relationship between operator and infrastructure from "do what I say" to "do what I need." The cloud is becoming an active participant in operations, not a passive executor.

## Examples from AWS: Aurora ML, DevOps Guru, and Predictive Scaling

AWS has been systematically embedding intelligence into its core services. **Amazon DevOps Guru** uses ML to detect operational anomalies before they become outages. It analyzes CloudWatch metrics, CloudTrail logs, and resource configurations to identify patterns that precede failures. It doesn't just alert; it recommends specific remediation actions.

**Predictive Auto Scaling** for EC2 uses ML models trained on your historical traffic patterns to scale capacity *before* demand spikes, not after. Instead of reactive scaling (which always has a latency gap), predictive scaling pre-provisions resources based on learned patterns.

**Aurora ML** brings inference directly to the database layer. You can call ML models from SQL queries, eliminating the need to extract data, run inference externally, and load results back. The database isn't just storing data; it's actively analyzing it.

## How GCP and Azure Are Approaching It

Google Cloud has taken the AI-native approach furthest with **Autopilot for GKE**, which automatically manages node provisioning, scaling, and security for Kubernetes clusters. You describe what you want to run; GKE figures out the optimal infrastructure configuration. **Active Assist** provides proactive recommendations for cost optimization, security hardening, and performance tuning across your entire GCP footprint.

Microsoft Azure's **Automanage** automatically applies best practices for VM configuration, backup, monitoring, and updates. **Azure Advisor** has evolved from passive recommendations to active, automated remediation for common issues. The trend is consistent across all three providers: less manual configuration, more intelligent automation.

## What This Means for Product Managers

For PMs building on cloud infrastructure, this shift is transformative. Instead of writing specs that say "provision 4 c5.xlarge instances with auto-scaling min 2 max 8 and CloudWatch alarms at 80% CPU," you'll write outcome-based specs: "ensure API latency stays below 200ms p99 with 99.9% availability at minimum cost." The infrastructure layer will figure out the *how*. This means PMs need to think in terms of **service-level objectives (SLOs)** rather than infrastructure configurations. It also means the barrier to building reliable, scalable products drops significantly.

## The Future: Fully Autonomous Operations by 2028

Extrapolating current trends, I believe we'll see fully autonomous cloud operations (what some call "NoOps") become mainstream by 2028. Infrastructure will self-heal from failures, self-optimize for cost and performance, self-scale based on predicted demand, and self-secure against emerging threats. The role of operations engineers will shift from "keeping things running" to "defining objectives and constraints." And the role of PMs will shift from specifying infrastructure requirements to specifying business outcomes, with the cloud as an intelligent partner that figures out the rest.`,
  },
  {
    id: "6",
    slug: "ai-agents-for-pms",
    title: "Building AI Agents: What Product Managers Need to Know",
    excerpt:
      "AI agents are the next frontier: autonomous systems that reason, plan, and act. Here's the architecture every PM should understand before their next roadmap planning.",
    category: "AI/ML",
    publishDate: "2025-11-18",
    readTime: 9,
    featuredGradient: "from-purple to-primary",
    heroImage: "/product-vision-hub/images/blog/06-ai-agents.svg",
    body: `## What Is an AI Agent?

An AI agent is fundamentally different from the AI tools most people are familiar with. While a chatbot takes your input and returns output in a single turn, an agent operates in a continuous loop: **Perception → Reasoning → Planning → Action → Memory → Repeat**. It observes its environment, reasons about what it sees, makes a plan to achieve its goal, takes action (often using external tools), stores what it learned, and then loops back. The key distinction is *autonomy*: an agent can pursue multi-step goals without human intervention at each step. Think of the difference between asking someone a question (chatbot) and delegating a task (agent).

## Tool Use and Function Calling

The breakthrough that enabled modern AI agents is **tool use** (also called function calling). Instead of being limited to generating text, agents can invoke external tools (APIs, databases, code interpreters, web browsers, calculators) to interact with the real world. When an agent needs to check a customer's order status, it doesn't hallucinate an answer; it calls your order management API and returns real data.

The architecture typically works like this: the LLM receives a goal and a list of available tools with their descriptions. It reasons about which tool to use, generates a structured tool call (JSON with function name and parameters), the system executes the tool call and returns results, and the LLM incorporates the results into its next reasoning step. This loop continues until the goal is achieved or the agent determines it needs human input.

## RAG as the Knowledge Layer

If tool use gives agents *hands*, RAG gives them *memory and knowledge*. Most production agents combine real-time tool use with RAG-based knowledge retrieval. When a customer support agent receives a question about your refund policy, it doesn't need to call an API. It retrieves the relevant policy documents from a vector store and reasons over them. The combination of RAG (for knowledge) and tool use (for action) creates agents that can both *know* things and *do* things.

## Multi-Agent Orchestration Patterns

The most powerful agent architectures don't use a single agent. They orchestrate multiple specialized agents. Common patterns include:

- **Supervisor pattern**: A "manager" agent breaks down complex tasks and delegates to specialist agents (research agent, writing agent, code agent), then synthesizes their outputs.
- **Debate pattern**: Multiple agents analyze the same problem from different perspectives, then a judge agent synthesizes the best answer.
- **Pipeline pattern**: Agents are chained sequentially. Agent A's output becomes Agent B's input, like an assembly line for cognitive tasks.

Amazon Bedrock's multi-agent collaboration feature implements these patterns at scale, allowing you to define agent teams with specific roles and communication protocols.

## What PMs Should Be Thinking About

If you're a PM planning your 2026-2027 roadmap, here's what matters. First, **identify agent-shaped problems** in your product: tasks that are multi-step, require tool use, and currently require human orchestration. Customer support, code review, research synthesis, and workflow automation are prime candidates. Second, **design for human-in-the-loop**: the best agent architectures include checkpoints where humans can review, redirect, or approve before the agent continues. Third, **think about failure modes**: agents can get stuck in loops, use wrong tools, or pursue suboptimal plans. Your product needs graceful degradation and clear escalation paths. Finally, **measure agent quality differently**: task completion rate, average steps to completion, tool use accuracy, and human escalation rate are the metrics that matter, not just response quality.`,
  },
  {
    id: "7",
    slug: "ai-agents_structured-data",
    title: "AI agent interaction with Strcutured Data: Why its different",
    excerpt:
      "AI agents are the next frontier: autonomous systems that reason, plan, and act. Here's the architecture every PM should understand before their next roadmap planning.",
    category: "AI/ML",
    publishDate: "2025-11-18",
    readTime: 9,
    featuredGradient: "from-purple to-primary",
    heroImage: "/product-vision-hub/images/blog/06-ai-agents.svg",
    body: `## What Is an AI Agent?

An AI agent is fundamentally different from the AI tools most people are familiar with. While a chatbot takes your input and returns output in a single turn, an agent operates in a continuous loop: **Perception → Reasoning → Planning → Action → Memory → Repeat**. It observes its environment, reasons about what it sees, makes a plan to achieve its goal, takes action (often using external tools), stores what it learned, and then loops back. The key distinction is *autonomy*: an agent can pursue multi-step goals without human intervention at each step. Think of the difference between asking someone a question (chatbot) and delegating a task (agent).

## Tool Use and Function Calling

The breakthrough that enabled modern AI agents is **tool use** (also called function calling). Instead of being limited to generating text, agents can invoke external tools (APIs, databases, code interpreters, web browsers, calculators) to interact with the real world. When an agent needs to check a customer's order status, it doesn't hallucinate an answer; it calls your order management API and returns real data.

The architecture typically works like this: the LLM receives a goal and a list of available tools with their descriptions. It reasons about which tool to use, generates a structured tool call (JSON with function name and parameters), the system executes the tool call and returns results, and the LLM incorporates the results into its next reasoning step. This loop continues until the goal is achieved or the agent determines it needs human input.

## RAG as the Knowledge Layer

If tool use gives agents *hands*, RAG gives them *memory and knowledge*. Most production agents combine real-time tool use with RAG-based knowledge retrieval. When a customer support agent receives a question about your refund policy, it doesn't need to call an API. It retrieves the relevant policy documents from a vector store and reasons over them. The combination of RAG (for knowledge) and tool use (for action) creates agents that can both *know* things and *do* things.

## Multi-Agent Orchestration Patterns

The most powerful agent architectures don't use a single agent. They orchestrate multiple specialized agents. Common patterns include:

- **Supervisor pattern**: A "manager" agent breaks down complex tasks and delegates to specialist agents (research agent, writing agent, code agent), then synthesizes their outputs.
- **Debate pattern**: Multiple agents analyze the same problem from different perspectives, then a judge agent synthesizes the best answer.
- **Pipeline pattern**: Agents are chained sequentially. Agent A's output becomes Agent B's input, like an assembly line for cognitive tasks.

Amazon Bedrock's multi-agent collaboration feature implements these patterns at scale, allowing you to define agent teams with specific roles and communication protocols.

## What PMs Should Be Thinking About

If you're a PM planning your 2026-2027 roadmap, here's what matters. First, **identify agent-shaped problems** in your product: tasks that are multi-step, require tool use, and currently require human orchestration. Customer support, code review, research synthesis, and workflow automation are prime candidates. Second, **design for human-in-the-loop**: the best agent architectures include checkpoints where humans can review, redirect, or approve before the agent continues. Third, **think about failure modes**: agents can get stuck in loops, use wrong tools, or pursue suboptimal plans. Your product needs graceful degradation and clear escalation paths. Finally, **measure agent quality differently**: task completion rate, average steps to completion, tool use accuracy, and human escalation rate are the metrics that matter, not just response quality.`,
  },
];

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

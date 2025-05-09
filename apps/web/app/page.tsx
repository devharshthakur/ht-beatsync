import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { Code2, Zap, Layers, ChevronRight, ExternalLink, Server, Database, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative pb-24 pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <div className="border-border/30 bg-muted/10 text-muted-foreground mb-6 inline-flex items-center rounded-md border px-4 py-1.5 text-sm font-medium">
                Student Project • In Development
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="from-muted-foreground via-foreground/80 to-foreground bg-gradient-to-r bg-clip-text text-transparent">
                  ht-beatSync
                </span>
              </h1>

              <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg sm:text-xl lg:mx-0">
                My modern port of beatsync.gg built to learn NestJS, WebSockets, and best practices for maintainable
                code.
              </p>

              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
                <a
                  href="https://github.com/devharshthakur/ht-beatsync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-foreground border-primary/60 before:border-primary/30 after:border-primary/20 relative inline-flex w-full items-center justify-center space-x-2 rounded-md border-2 bg-transparent px-6 py-3 text-base font-medium shadow-lg transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-md before:border-2 before:content-[''] after:absolute after:inset-[-5px] after:-z-20 after:rounded-lg after:border-2 after:content-[''] hover:brightness-110 sm:w-auto"
                >
                  <FaGithub className="h-5 w-5" />
                  <span>View on GitHub</span>
                </a>
                <a
                  href="https://github.com/freeman-jiang/beatsync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-primary/60 hover:border-primary inline-flex w-full items-center justify-center space-x-2 rounded-md border-2 px-6 py-3 text-base font-medium shadow-md transition-all duration-300 sm:w-auto"
                >
                  <span>Original Project</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-lg">
                {/* App preview window */}
                <div className="border-border bg-card/80 shadow-background/5 overflow-hidden rounded-lg border shadow-xl backdrop-blur-sm">
                  {/* App header */}
                  <div className="border-border flex items-center justify-between border-b px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-md bg-red-500"></div>
                      <div className="h-3 w-3 rounded-md bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-md bg-green-500"></div>
                    </div>
                    <div className="text-muted-foreground text-xs">beatsync.gg port</div>
                    <div className="w-16"></div> {/* Spacer for balance */}
                  </div>

                  {/* App content */}
                  <div className="p-6">
                    <div className="mb-6 text-center">
                      <h3 className="mb-2 text-xl font-semibold">Join a BeatSync Room</h3>
                      <p className="text-muted-foreground text-sm">Enter a room code to join or create a new room</p>
                    </div>

                    <div className="mb-6">
                      <div className="relative">
                        <input
                          type="text"
                          className="bg-secondary border-border text-secondary-foreground focus:ring-ring w-full rounded-md border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2"
                          placeholder="Enter room code"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border flex w-full items-center justify-center space-x-2 rounded-md border-2 px-4 py-2 transition-colors">
                        <span>Join room</span>
                      </button>

                      <button className="border-border hover:bg-secondary/20 text-foreground/80 flex w-full items-center justify-center space-x-2 rounded-md border-2 bg-transparent px-4 py-2 transition-colors">
                        <span>Create new room</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              <span className="from-foreground/80 to-foreground bg-gradient-to-r bg-clip-text text-transparent">
                What I'm Learning
              </span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              As a student, I'm using this project to learn modern web development practices and improve my skills
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Server className="text-foreground/80 h-6 w-6" />,
                title: 'NestJS Backend',
                description:
                  "I'm learning to build APIs with NestJS following MVC principles for a clean, maintainable architecture.",
              },
              {
                icon: <Zap className="text-foreground/80 h-6 w-6" />,
                title: 'WebSockets',
                description:
                  'Implementing real-time communication between clients using WebSockets for synchronized audio playback.',
              },
              {
                icon: <BookOpen className="text-foreground/80 h-6 w-6" />,
                title: 'Documentation',
                description:
                  'Practicing thorough code documentation and comments to make the codebase more accessible to others.',
              },
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="border-border bg-card/50 group-hover:border-border/70 relative h-full rounded-lg border p-6 backdrop-blur-sm transition-all duration-300">
                  <div className="bg-secondary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                <span className="from-foreground/80 to-foreground bg-gradient-to-r bg-clip-text text-transparent">
                  My Learning Goals
                </span>
              </h3>
              <p className="text-muted-foreground mb-6">
                As a student, I'm using this port to learn and apply best practices in web development while creating a
                more maintainable version of beatsync.gg.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    icon: <Code2 className="text-foreground/80 h-5 w-5" />,
                    title: 'Separation of Concerns',
                    description:
                      'Learning to structure code with clear separation between models, views, and controllers',
                  },
                  {
                    icon: <Database className="text-foreground/80 h-5 w-5" />,
                    title: 'API Design',
                    description: 'Practicing RESTful API design with proper error handling and validation',
                  },
                  {
                    icon: <Layers className="text-foreground/80 h-5 w-5" />,
                    title: 'TypeScript Mastery',
                    description: 'Improving my TypeScript skills by building a fully typed codebase',
                  },
                ].map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1">{spec.icon}</div>
                    <div>
                      <h4 className="text-foreground font-medium">{spec.title}</h4>
                      <p className="text-muted-foreground text-sm">{spec.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-1 lg:order-2">
              <div className="border-border bg-card/50 shadow-background/5 relative overflow-hidden rounded-lg border p-6 shadow-xl backdrop-blur-sm">
                <div className="relative font-mono text-sm">
                  <div className="text-muted-foreground mb-4">{"// NestJS Controller I'm Learning"}</div>
                  <div className="text-foreground/80">@Controller('rooms')</div>
                  <div className="text-foreground/80">export class RoomsController {'{'}</div>
                  <div className="text-foreground/80 ml-4">constructor(</div>
                  <div className="text-foreground/80 ml-8">private readonly roomsService: RoomsService</div>
                  <div className="text-foreground/80 ml-4">) {'{}'}</div>
                  <div className="text-foreground/80 ml-4 mt-2">@Post()</div>
                  <div className="text-foreground/80 ml-4">
                    async create(@Body() createRoomDto: CreateRoomDto) {'{'}
                  </div>
                  <div className="text-foreground/80 ml-8">return this.roomsService.create(createRoomDto);</div>
                  <div className="text-foreground/80 ml-4">{'}'}</div>
                  <div className="text-foreground/80 ml-4 mt-2">@Get(':id')</div>
                  <div className="text-foreground/80 ml-4">async findOne(@Param('id') id: string) {'{'}</div>
                  <div className="text-foreground/80 ml-8">return this.roomsService.findOne(id);</div>
                  <div className="text-foreground/80 ml-4">{'}'}</div>
                  <div className="text-foreground/80">{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-secondary/20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-border bg-card/50 shadow-background/5 relative overflow-hidden rounded-lg border p-8 shadow-xl backdrop-blur-sm md:p-10">
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <div className="bg-secondary mb-6 inline-flex h-12 w-12 items-center justify-center rounded-md">
                  <FaGithub className="text-secondary-foreground h-6 w-6" />
                </div>

                <h2 className="mb-6 text-3xl font-bold">
                  <span className="from-foreground/80 to-foreground bg-gradient-to-r bg-clip-text text-transparent">
                    My Project Journey
                  </span>
                </h2>

                <p className="text-foreground/80 mb-6">
                  👋 I'm a student developer working on a modern port of{' '}
                  <a
                    href="https://beatsync.gg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-foreground decoration-border hover:decoration-border/70 underline underline-offset-4 transition-colors"
                  >
                    beatsync.gg
                  </a>{' '}
                  by Freeman Jiang.
                </p>

                <p className="text-muted-foreground mb-8">
                  I started this project to learn Node.js, NestJS, and WebSockets while creating something useful. My
                  goal is to build a more maintainable and well-documented version of the original application, applying
                  best practices I'm learning in my studies.
                </p>

                <a
                  href="https://github.com/devharshthakur/ht-beatsync#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border inline-flex items-center space-x-2 rounded-md border-2 px-6 py-3 text-base font-medium transition-all duration-300"
                >
                  <span>Read my documentation</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              <div className="relative">
                <div className="border-border bg-card/80 overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm">
                  <div className="p-6">
                    <h3 className="mb-4 flex items-center text-xl font-semibold">
                      <span className="from-foreground/80 to-foreground bg-gradient-to-r bg-clip-text text-transparent">
                        Why I'm Building This
                      </span>
                    </h3>

                    <div className="space-y-4">
                      <div className="border-border rounded-md border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">Learning Experience</h4>
                          <span className="bg-secondary text-muted-foreground rounded-md px-2 py-1 text-xs">
                            Primary Goal
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-3 text-sm">
                          To gain hands-on experience with modern web technologies and architectural patterns.
                        </p>
                      </div>

                      <div className="border-border from-secondary/20 to-secondary/30 rounded-md border bg-gradient-to-r p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">Node.js Alternative</h4>
                          <span className="bg-secondary text-muted-foreground rounded-md px-2 py-1 text-xs">
                            Secondary Goal
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-3 text-sm">
                          To create a Node.js-based alternative to the original project with better code organization.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              <span className="from-foreground/80 to-foreground bg-gradient-to-r bg-clip-text text-transparent">
                My Development Roadmap
              </span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Follow my progress as I continue to learn and build this modern port of beatsync.gg
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                status: 'Code Review Needed',
                title: 'Backend Port',
                description: "I've ported core functionality to NestJS with improved architecture and API design.",
                date: 'April 2024',
                icon: <div className="h-3 w-3 rounded-md bg-yellow-500"></div>,
                color: 'border-yellow-500/30 bg-yellow-500/10',
              },
              {
                status: 'In Progress',
                title: 'Performance Optimization',
                description:
                  "I'm currently working on enhancing performance and optimizing code for better resource utilization.",
                date: 'Current Phase',
                icon: <div className="h-3 w-3 rounded-md bg-blue-500"></div>,
                color: 'border-blue-500/30 bg-blue-500/10',
              },
              {
                status: 'Planned',
                title: 'Frontend Development',
                description:
                  "Next, I'll build a modern, responsive user interface to complement the backend functionality.",
                date: 'Coming Soon',
                icon: <div className="bg-muted-foreground h-3 w-3 rounded-md"></div>,
                color: 'border-border bg-secondary/10',
              },
            ].map((phase, index) => (
              <div key={index} className="relative">
                <div className="border-border bg-card/50 hover:border-border/70 h-full rounded-lg border p-6 backdrop-blur-sm transition-all duration-300">
                  <div
                    className={`mb-4 inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium ${phase.color}`}
                  >
                    <div className="mr-2">{phase.icon}</div>
                    {phase.status}
                  </div>

                  <h3 className="mb-2 text-xl font-semibold">{phase.title}</h3>
                  <p className="text-muted-foreground mb-4">{phase.description}</p>

                  <div className="text-muted-foreground mt-auto text-sm">{phase.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary/20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-border from-secondary/20 via-card to-secondary/20 rounded-lg border bg-gradient-to-r p-8 text-center md:p-10">
            <h2 className="text-foreground mb-6 text-3xl font-bold sm:text-4xl">
              <span className="from-foreground/80 to-foreground bg-gradient-to-r bg-clip-text text-transparent">
                How to Contribute
              </span>
            </h2>

            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
              Learn how to set up the project locally and contribute to its development. Your contributions help me
              learn and improve this project.
            </p>

            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="/contribute"
                className="from-primary/80 to-primary/60 text-primary-foreground border-primary inline-flex w-full max-w-xs items-center justify-center space-x-2 rounded-md border-2 bg-gradient-to-r px-6 py-3 text-base font-medium shadow-lg transition-all duration-300 hover:brightness-110 sm:w-auto"
              >
                <span>View Contribution Guide</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/devharshthakur/ht-beatsync"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground border-primary/60 hover:bg-secondary/90 hover:border-primary before:border-primary/20 after:border-primary/10 relative inline-flex w-full max-w-xs items-center justify-center space-x-2 rounded-md border-2 px-6 py-3 text-base font-medium shadow-md transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-md before:border-2 before:content-[''] after:absolute after:inset-[-5px] after:-z-20 after:rounded-lg after:border-2 after:content-[''] sm:w-auto"
              >
                <FaGithub className="h-5 w-5" />
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

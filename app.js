import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, Shield, Network, Cloud, Terminal, 
  Cpu, Coffee, HardDrive, Key, CheckCircle, 
  ArrowRight, ArrowUp, Mail, Phone, Linkedin, Download, 
  ExternalLink, Layers, Sparkles, Send, Flame,
  GitBranch, Activity, Wifi, Lock
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [systemStatus, setSystemStatus] = useState('Optimal');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'input', text: 'nirmal --version' },
    { type: 'output', text: 'nirmal-acharya-it-officer v2.6.0 (Built on coffee, curiosity, and uptime)' },
    { type: 'input', text: 'help' },
    { type: 'output', text: 'Available commands: [about, contact, skills, ping, clear]' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef(null);

  // Monitor scroll height to trigger back-to-top button
  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Terminal logic
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    let response = '';
    switch(command) {
      case 'about':
        response = 'Nirmal Acharya is an IT Officer based in Nepal, specializing in bulletproof infrastructure, homelabbing, and avoiding 3 AM database emergencies.';
        break;
      case 'contact':
        response = 'Email: nirmal.acharya@example.com | Phone: +977 980-0000000';
        break;
      case 'skills':
        response = 'Core specs: Network Eng (Cisco/Ubiquiti), Virtualization (Proxmox/Docker), Cyber Sec, Systems (Linux/Win Server).';
        break;
      case 'ping':
        response = 'pong! Latency to Nirmal\'s brain: 14ms (Highly responsive today).';
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        response = `Command not found: "${command}". Type "help" for a list of valid commands.`;
    }

    setTerminalHistory(prev => [
      ...prev, 
      { type: 'input', text: command },
      { type: 'output', text: response }
    ]);
    setTerminalInput('');
  };

  const triggerSystemSelfTest = () => {
    setSystemStatus('Running Diagnostics...');
    setTimeout(() => {
      setSystemStatus('99.98% Uptime Verified');
      setTimeout(() => {
        setSystemStatus('Optimal');
      }, 3000);
    }, 1500);
  };

  const myHomelabStack = [
    { name: 'Proxmox VE', category: 'Virtualization', desc: 'Running home server automation pipelines, dev environments, and sandbox nodes.' },
    { name: 'OPNsense / PfSense', category: 'Networking', desc: 'Custom firewall setups with multi-WAN failover, wireguard VPNs, and VLAN segregation.' },
    { name: 'Docker & Compose', category: 'Containers', desc: 'Containerizing self-hosted utilities: Nextcloud, Pi-hole, and monitoring dashboards.' },
    { name: 'TrueNAS Scale', category: 'Storage', desc: 'Resilient ZFS pool configurations with automated offsite encryption backups.' },
  ];

  const projects = [
    {
      id: "PROJ-RECOVERY",
      title: "Automated Disaster Recovery & Backup Integrity Engine",
      category: "automation",
      status: "In Production",
      description: "Tired of untested backups, I built a zero-intervention orchestration system. It extracts server backups, sends encrypted blocks to private cloud clusters, and automatically spins up a sandboxed hypervisor weekly to test, boot, and verify DB integrity.",
      impact: "Reduced recovery test time from 4 hours to 0 minutes (fully autonomous verification).",
      tags: ["Bash", "Docker", "Ansible", "ZFS Storage", "Proxmox API"],
      icon: HardDrive,
      url: "#",
      logOutput: "BASH: [INIT] S3 Storage integrity check... [PASS] | Hypervisor auto-boot simulation... [SUCCESS] | DB Health Check query response: 200 OK. Backup valid."
    },
    {
      id: "PROJ-SDWAN",
      title: "Multi-Branch Zero-Trust SD-WAN Deployment",
      category: "networking",
      status: "Deployed",
      description: "Designed and configured a resilient, low-latency Site-to-Site network infrastructure linking 4 regional branches. Moved away from insecure standard protocols to dynamic OSPF over WireGuard VPN tunnels with multi-ISP hardware failover.",
      impact: "Uptime increased to 99.98% with automated routing failover taking less than 3 seconds.",
      tags: ["OPNsense", "Cisco IOS", "WireGuard", "OSPF", "VLANs"],
      icon: Network,
      url: "#",
      logOutput: "ROUTE: Configured tunnels on OPNsense interfaces | Failover test priority: high | WAN-1 down check | WAN-2 takeover active in 2.8s | Ping drops: 1"
    },
    {
      id: "PROJ-AUTH",
      title: "Active Directory & Enterprise WPA3 Wi-Fi Overhaul",
      category: "security",
      status: "Completed",
      description: "Eliminated static shared passwords on company Wi-Fi. Deployed an enterprise authentication architecture integrating Active Directory domain services with FreeRADIUS servers to enforce personal token validation and dynamic VLAN assignment.",
      impact: "100% elimination of unauthorized personal devices accessing the local subnet.",
      tags: ["Windows Server", "FreeRADIUS", "Ubiquiti UniFi", "WPA3 Enterprise"],
      icon: Lock,
      url: "#",
      logOutput: "RADIUS: Access request received from user_pc -> Auth method: PEAP-MSCHAPv2 -> Dynamic VLAN 10 assigned. Status: Approved."
    }
  ];

  const handleProjectOpen = (project, e) => {
    if (project.url === '#') {
      e.preventDefault();
      
      // Update terminal history with custom project simulation command
      setTerminalHistory(prev => [
        ...prev,
        { type: 'input', text: `cat infrastructure/${project.id.toLowerCase()}.log` },
        { type: 'output', text: `Fetching architecture configurations and telemetry metrics...` },
        { type: 'output', text: project.logOutput }
      ]);

      // Scroll to home/terminal viewport seamlessly
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 font-mono selection:bg-amber-200 selection:text-amber-900 pb-0">
      
      {/* Dynamic Status Banner */}
      <div className="bg-slate-900 text-slate-300 text-[10px] sm:text-xs py-2 px-3 sm:px-4 border-b border-slate-800 flex justify-between items-center overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 shrink-0">
            <span className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full ${systemStatus === 'Optimal' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-spin'} inline-block`}></span>
            <span className="font-semibold text-slate-100">SYSTEM: {systemStatus}</span>
          </span>
          <span className="text-slate-700">|</span>
          <span className="shrink-0">Location: Bharatpur, Nepal</span>
          <span className="text-slate-700">|</span>
          <span className="shrink-0">Target: Zero unassigned tickets</span>
        </div>
        <button 
          onClick={triggerSystemSelfTest}
          className="text-[9px] sm:text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-2 py-0.5 rounded transition-all border border-slate-700 hover:border-amber-400 shrink-0 ml-4"
        >
          [ Test ]
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        
        {/* Header / Identity */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 sm:mb-20 pb-8 border-b-2 border-dashed border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <Terminal className="text-amber-600 shrink-0" size={24} />
              nirmal_acharya
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">~/it-officer/infrastructure-lead</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <a href="#homelab" className="text-xs sm:text-sm bg-amber-50 hover:bg-amber-100 text-amber-900 px-4 py-3 sm:py-2 rounded-lg border border-amber-200 transition-all font-semibold flex items-center justify-center gap-1.5 shadow-sm">
              <Sparkles size={14} className="shrink-0" /> Homelab Specs
            </a>
            <a href="#contact" className="text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 sm:py-2 rounded-lg transition-all font-semibold shadow-sm flex items-center justify-center gap-1.5">
              Let's Connect <ArrowRight size={14} className="shrink-0" />
            </a>
          </div>
        </header>

        {/* Hero Section: The "No-BS" Intro */}
        <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-16 sm:mb-24 items-center">
          <div className="lg:col-span-7">
            <div className="inline-block px-3 py-1 bg-amber-100/70 border border-amber-200 text-amber-800 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4">
              Real Humans {" > "} Automated Templates
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-4 sm:mb-6">
              I run the engines that keep companies <span className="underline decoration-amber-500 decoration-wavy">safe, connected, and operating at 100%</span>.
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed mb-6 font-sans">
              "Yes, I've tried turning it off and on again. But my real work starts in the other 99 steps." I'm Nirmal Acharya, a hands-on IT Officer. I don't just sit behind a service desk; I build reliable network pathways, configure bulletproof firewalls, deploy virtualization pools, and translate complex technical requirements into smooth corporate operations.
            </p>

            <div className="flex flex-wrap gap-2.5 sm:gap-4 items-center text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200/80 shadow-sm">
                <Coffee size={14} className="text-amber-600 shrink-0" /> Caffeine Powered
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200/80 shadow-sm">
                <Cpu size={14} className="text-amber-600 shrink-0" /> Linux Lover
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200/80 shadow-sm">
                <HardDrive size={14} className="text-amber-600 shrink-0" /> Self-Hosted
              </div>
            </div>
          </div>

          {/* Retro Shell Widget */}
          <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-4 shadow-xl border border-slate-800 w-full overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-500 font-mono">guest@nirmal: ~</span>
            </div>
            <div className="h-48 sm:h-64 overflow-y-auto text-[11px] sm:text-xs space-y-2 mb-4 scrollbar-thin scrollbar-thumb-slate-800">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className={item.type === 'input' ? 'text-amber-400 break-all' : 'text-slate-300 break-words'}>
                  {item.type === 'input' ? `$ ${item.text}` : item.text}
                </div>
              ))}
              <div ref={terminalEndRef}></div>
            </div>
            <form onSubmit={handleTerminalSubmit} className="flex gap-2">
              <span className="text-amber-500 text-[11px] sm:text-xs">$</span>
              <input 
                type="text" 
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type 'about' or 'skills'..." 
                className="bg-transparent text-[11px] sm:text-xs text-slate-200 outline-none flex-1 font-mono border-b border-transparent focus:border-amber-500/30 pb-0.5"
              />
            </form>
          </div>
        </section>

        {/* Myth vs Reality Card Grid */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center sm:text-left mb-8 sm:mb-10">
            <span className="text-amber-600 text-xs sm:text-sm font-bold uppercase tracking-wider block mb-1">// Operational Philosophy</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">What I actually do all day</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-amber-50 rounded-bl-full z-0 group-hover:bg-amber-100/80 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 text-amber-950 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
                  <Shield size={20} sm:size={24} />
                </div>
                <h4 className="font-bold text-base sm:text-lg text-slate-900 mb-2">Passive Defense</h4>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  Firewall configurations, zero-trust policies, and regular endpoint patching. I keep the system guarded so threat actors never get a comfortable foothold in our networks.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-amber-50 rounded-bl-full z-0 group-hover:bg-amber-100/80 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 text-amber-950 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
                  <Network size={20} sm:size={24} />
                </div>
                <h4 className="font-bold text-base sm:text-lg text-slate-900 mb-2">Predictable Pipework</h4>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  Designing enterprise LAN/WAN layouts with high-availability links. Every device is mapped, every VLAN has a purpose, and bottleneck points are crushed before they manifest.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-amber-50 rounded-bl-full z-0 group-hover:bg-amber-100/80 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 text-amber-950 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
                  <Server size={20} sm:size={24} />
                </div>
                <h4 className="font-bold text-base sm:text-lg text-slate-900 mb-2">Automated Infrastructure</h4>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  Why do it twice manually when you can write a script? I use Ansible, custom bash tools, and container virtualization to deploy servers consistently and rapidly.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Real Projects Showcase */}
        <section className="mb-16 sm:mb-24">
          <div className="mb-8 sm:mb-10">
            <span className="text-amber-600 text-xs sm:text-sm font-bold uppercase tracking-wider block mb-1">// Case Studies & Architectures</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Proven Infrastructures I've Built</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-sans">Real technical responses to hard business performance demands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, idx) => {
              const ProjectIcon = project.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200/85 p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:border-amber-500/40 transition-colors duration-300">
                  <div>
                    <div className="flex justify-between items-start mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center">
                        <ProjectIcon size={20} />
                      </div>
                      <span className="text-[9px] sm:text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase">
                        {project.status}
                      </span>
                    </div>

                    <h4 className="font-black text-base sm:text-lg text-slate-900 leading-snug mb-3">
                      {project.title}
                    </h4>

                    <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4 sm:mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-100 mb-4">
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase mb-1 tracking-wider">Metrics & Output:</span>
                      <p className="text-xs text-slate-800 font-sans leading-relaxed">
                        {project.impact}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="text-[9px] sm:text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono font-bold">{project.id}</span>
                      <a 
                        href={project.url}
                        onClick={(e) => handleProjectOpen(project, e)}
                        className="text-xs bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2.5 sm:py-2 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer touch-manipulation"
                      >
                        <span>Open Project</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Homelab Showcase (The ultimate proof of real technical passion) */}
        <section id="homelab" className="bg-[#1e293b] text-slate-200 rounded-3xl p-6 sm:p-8 md:p-12 mb-16 sm:mb-24 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
            <Server size={200} className="md:w-[300px] md:h-[300px]" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 sm:mb-12">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">{"< Passion-Project />"}</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">The Playground: Home Lab Specs</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl font-sans">
                  The true differentiator of a dedicated IT Officer is what they build in their spare time. My homelab is my sandbox for testing production scenarios at home.
                </p>
              </div>
              <div className="flex items-center self-start md:self-auto gap-2 bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-xl text-xs text-amber-300 shadow-sm">
                <Flame size={14} className="shrink-0 animate-pulse" /> Highly Custom Setup
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {myHomelabStack.map((item, idx) => (
                <div key={idx} className="bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="font-bold text-slate-100 text-sm sm:text-base break-words">{item.name}</span>
                    <span className="text-[9px] sm:text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded border border-amber-900/30 uppercase shrink-0">{item.category}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-World Timeline / Experience */}
        <section className="mb-16 sm:mb-24">
          <div className="mb-8 sm:mb-12">
            <span className="text-amber-600 text-xs sm:text-sm font-bold uppercase tracking-wider block mb-1">// Proven Record</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Battlefields & System Migrations</h3>
          </div>

          <div className="space-y-10 sm:space-y-12 max-w-4xl">
            
            <div className="relative pl-6 md:pl-8 border-l-2 border-amber-500/30">
              <div className="absolute -left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">Information Technology Officer</h4>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500">Leading Enterprise in Nepal</span>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md self-start sm:self-auto">2021 — PRESENT</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-4">
                Managing central operations for 250+ active devices across multiple branch offices. Engineered a clean transition to multi-WAN failover OPNsense setups, completely eliminating client connectivity loss during ISP dropouts. 
              </p>
              <div className="flex flex-wrap gap-1.5 text-[10px] sm:text-xs">
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">Cisco IOS</span>
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">AWS Clouds</span>
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">VMware ESXi</span>
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">SLA Compliance</span>
              </div>
            </div>

            <div className="relative pl-6 md:pl-8 border-l-2 border-amber-500/30">
              <div className="absolute -left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-slate-400"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">Systems and Support Specialist</h4>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500">TechSolutions Nepal</span>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md self-start sm:self-auto">2018 — 2021</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-4">
                Maintained directory services (Active Directory), implemented group policy setups to safeguard end-point devices, and automated redundant backup routines. Handled physical deployment pipelines of complex office setups.
              </p>
              <div className="flex flex-wrap gap-1.5 text-[10px] sm:text-xs">
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">Active Directory</span>
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">Windows Server</span>
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">Veeam Backup</span>
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">Linux Admin</span>
              </div>
            </div>

          </div>
        </section>

        {/* Interactive "Contact & Secure" Area */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 pt-8 sm:pt-12 border-t-2 border-dashed border-slate-200">
          <div className="lg:col-span-5">
            <span className="text-amber-600 text-xs sm:text-sm font-bold uppercase tracking-wider block mb-1">// Open Channel</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Ping My Gateway</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6 sm:mb-8">
              No forms that get lost in corporate spam pools. Reach me straight on standard communication pipelines, or download my validated resume details below.
            </p>
            
            <div className="space-y-4">
              <a href="mailto:nirmal.acharya@example.com" className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 transition-colors group touch-manipulation">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors shrink-0">
                  <Mail size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[9px] sm:text-[10px] text-slate-400 font-mono">DIRECT INBOX</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 break-all">nirmal.acharya@example.com</span>
                </div>
              </a>

              <a href="tel:+9779800000000" className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 transition-colors group touch-manipulation">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors shrink-0">
                  <Phone size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[9px] sm:text-[10px] text-slate-400 font-mono">CALL / WHATSAPP</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 break-all">+977 9865381214</span>
                </div>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 transition-colors group touch-manipulation">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors shrink-0">
                  <Linkedin size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[9px] sm:text-[10px] text-slate-400 font-mono">PROFESSIONAL</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 break-all">linkedin.com/in/nirmalacharya</span>
                </div>
              </a>
            </div>
          </div>

          {/* Secure Message Sandbox / Simulator */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm w-full">
            <h4 className="font-extrabold text-base sm:text-lg text-slate-900 mb-1">Leave an encrypted transmission</h4>
            <p className="text-[10px] sm:text-xs text-slate-500 mb-6 font-sans">Simulate a message dispatch to Nirmal's inbox console.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("Mock submission successful! In a live setup, this payload is securely processed."); }} className="space-y-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-600 uppercase mb-2">Sender Signature</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Chief Operations Officer" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-600 uppercase mb-2">Payload (Your Message)</label>
                <textarea 
                  required
                  rows="4" 
                  placeholder="Tell me what infrastructure puzzle you're currently tackling." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all font-sans"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow flex items-center justify-center gap-2 text-xs sm:text-sm touch-manipulation"
              >
                <Send size={14} /> Deploy Message
              </button>
            </form>
          </div>
        </section>

      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full shadow-lg border border-amber-400/30 transition-all duration-300 transform z-50 flex items-center justify-center cursor-pointer active:scale-95 touch-manipulation ${
          showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-75 pointer-events-none'
        }`}
        aria-label="Back to Top"
      >
        <ArrowUp size={20} className="stroke-[3]" />
      </button>

      {/* Footer (Enhanced Visibility) */}
      <footer className="bg-slate-950 text-slate-300 py-12 border-t-4 border-amber-500/20 mt-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-xs text-center md:text-left">
          <div>
            <p className="font-bold text-slate-100 text-sm">Nirmal Acharya &copy; {new Date().getFullYear()}</p>
            <p className="text-slate-400 mt-2 max-w-md leading-relaxed font-sans">
              Made with genuine intent, modular components, and absolute care. Tailored for scalable, robust technology operations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-slate-400 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Uptime: 100%
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              Server Node: Nepal Node
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Module1() {
return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
<div className="px-6 py-12">
<div className="mx-auto max-w-4xl">
{/* Navigation */}
<Link href="/order/product/RemoteReadyBootcamp" className="text-emerald-400 hover:text-emerald-300 mb-8 inline-block">
← Back to Course
</Link>


      {/* Module Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg p-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-emerald-100 text-sm">Module 1</div>
            <h1 className="text-3xl font-bold text-white">START HERE - FOUNDATION PHASE</h1>
          </div>
        </div>
        <p className="text-emerald-100 text-lg">Master the remote work mindset and set your success foundation</p>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-8 mb-8 border border-emerald-500/20">
        <h2 className="text-3xl font-bold text-white mb-6">🎉 Welcome to Your Freedom Journey!</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-200 leading-relaxed mb-6 text-lg">
            Congratulations on taking the first step toward a life of freedom, flexibility, and adventure! You've just joined thousands of people who have transformed their lives from being stuck in traditional 9-5 jobs to earning money while exploring the world's most beautiful destinations.
          </p>
          
          <p className="text-slate-300 leading-relaxed mb-6">
            Whether you're a recent graduate feeling trapped by limited job prospects, a mid-career professional seeking more meaning and flexibility, a parent wanting to spend more time with family while still earning, or simply someone who refuses to wait until retirement to see the world – this program is designed for YOU. It doesn't matter if you're 22 or 62, tech-savvy or just learning, creative or analytical – the strategies you'll learn here have been proven to work for people from all backgrounds and skill levels.
          </p>

          <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">🌍 Join Our Exclusive WhatsApp Community</h3>
            <p className="text-slate-300 mb-4">
              Before we dive in, make sure to join our exclusive WhatsApp group community! This is where the magic happens – you'll have direct access to your mentor, can ask questions anytime you're stuck, and most importantly, connect with hundreds of others who are on the exact same journey as you.
            </p>
            <p className="text-slate-300 mb-4">
              Remember: <span className="text-emerald-400 font-semibold">Your network is your net worth.</span> The connections you make in this community often lead to partnerships, client referrals, travel buddies, and lifelong friendships. Many of our most successful members credit their breakthrough moments to conversations and collaborations that started in our WhatsApp group.
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 mt-2">
              Join WhatsApp Community →
            </Button>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="bg-slate-800 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">📚 Your 14-Day Transformation Roadmap</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 leading-relaxed mb-6">Day 1-2: Foundation & Mindset Mastery

            Over the next 14 days, you'll undergo a complete transformation – not just in how you work, but in how you think about work, life, and what's possible for your future. This isn't just another online course; it's a comprehensive blueprint that takes you from wherever you are right now to being fully equipped to earn a sustainable income from anywhere in the world.
          </p>

          <p className="text-slate-300 leading-relaxed mb-8">
            Here's exactly what we'll be covering in each module:
          </p>

          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-emerald-500">
              <h3 className="text-xl font-bold text-emerald-400 mb-3">Day 1-2: Foundation & Mindset Mastery</h3>
              <p className="text-slate-300 mb-3">
                We begin by rewiring your brain for remote success. You'll learn why the traditional employment mindset is your biggest obstacle and how to develop an entrepreneurial approach to remote work. We'll cover the psychology of successful digital nomads, how to overcome imposter syndrome, and create unshakeable confidence in your ability to succeed. You'll also set clear, actionable goals and create your personal vision board for the life you want to live.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Key Outcomes:</strong> Mindset transformation, goal setting framework, personal success metrics
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-teal-500">
              <h3 className="text-xl font-bold text-teal-400 mb-3">Day 3-4: Creating Your Remote Business</h3>
              <p className="text-slate-300 mb-3">
                Discover why creating a business (even a simple one-person business) is absolutely essential for sustainable remote work. We'll explore different business models perfect for location independence, from freelancing and consulting to digital products and online services. You'll learn how to identify your marketable skills, validate business ideas quickly, and structure your business for maximum flexibility and minimum overhead. We'll also cover the legal basics of running a location-independent business.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Key Outcomes:</strong> Business model selection, market validation techniques, legal setup basics
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-400 mb-3">Day 5-6: Digital Skills & Online Presence</h3>
              <p className="text-slate-300 mb-3">
                Build your digital arsenal with essential online skills. Learn to create professional websites, master social media marketing, and understand SEO basics. We'll cover content creation strategies, personal branding, and how to establish credibility in your chosen field. You'll also learn about essential digital tools for remote work, from project management platforms to communication apps, and how to present yourself professionally in virtual environments.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Key Outcomes:</strong> Professional online presence, digital marketing basics, remote work tools mastery
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-400 mb-3">Day 7-8: Client Acquisition & Sales</h3>
              <p className="text-slate-300 mb-3">
                Master the art of finding and securing clients from anywhere in the world. Learn proven strategies for cold outreach, networking in digital spaces, and leveraging freelance platforms effectively. We'll cover proposal writing, pricing strategies, and how to handle negotiations confidently. You'll also discover how to build long-term client relationships that provide recurring income and referrals, turning one-time projects into sustainable business relationships.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Key Outcomes:</strong> Client acquisition systems, sales skills, relationship building strategies
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-pink-500">
              <h3 className="text-xl font-bold text-pink-400 mb-3">Day 9-10: Financial Management & Taxes</h3>
              <p className="text-slate-300 mb-3">
                Navigate the complex world of international finances and taxation as a digital nomad. Learn about banking solutions for remote workers, currency exchange strategies, and tax obligations across different countries. We'll cover budgeting for the nomadic lifestyle, emergency fund planning, and investment strategies for location-independent income. You'll also understand legal structures that can optimize your tax situation while staying compliant.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Key Outcomes:</strong> Financial systems setup, tax compliance strategies, money management skills
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-orange-400 mb-3">Day 11-12: Nomad Lifestyle & Travel Strategies</h3>
              <p className="text-slate-300 mb-3">
                Learn the practical side of living and working while traveling. We'll cover choosing destinations based on cost of living, internet quality, and time zones that align with your business needs. Discover accommodation strategies, from short-term rentals to co-living spaces, and how to maintain productivity while constantly moving. You'll also learn about visa requirements, travel insurance, and building routines that keep you healthy and productive on the road.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Key Outcomes:</strong> Destination selection criteria, travel logistics mastery, mobile productivity systems
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6 border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-400 mb-3">Day 13-14: Scaling & Long-term Success</h3>
              <p className="text-slate-300 mb-3">
                Transform from a solo remote worker to a scalable business owner. Learn how to systemize your work, hire virtual assistants, and create passive income streams. We'll cover building digital products, creating online courses, and developing subscription-based services. You'll also master the mindset shifts needed for sustainable growth, time management at scale, and how to maintain work-life balance as your business expands across multiple time zones.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Key Outcomes:</strong> Business scaling strategies, passive income creation, sustainable growth systems
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg p-8 mt-8 border border-emerald-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">🚀 Why This Program Works</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-emerald-400 mb-3">Practical, Not Theoretical</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Every lesson includes actionable steps you can implement immediately. No fluff, no theory without application – just proven strategies that generate real results. By day 14, you'll have a functioning remote business, not just knowledge about one.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-teal-400 mb-3">Real Success Stories</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Learn from actual case studies of people who've used these exact methods to build six-figure remote businesses. See the mistakes they made so you can avoid them, and the breakthroughs that changed everything.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Step-by-Step Implementation</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Each module builds on the previous one, creating a logical progression from complete beginner to competent remote entrepreneur. You'll never feel lost or overwhelmed because we've mapped out every step of the journey.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Community Support</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  You're not doing this alone. Our WhatsApp community, mentor access, and peer support system ensure you have help whenever you need it. Success is much more likely when you're surrounded by people cheering you on.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-bold text-white mb-4">⚡ Your First Action Steps</h3>
            <p className="text-slate-300 mb-4">
              Don't just consume this content – implement it! Here's what you should do right now, before moving to Module 2:
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 text-sm mt-1">1.</span>
                <span><strong>Join the WhatsApp community</strong> and introduce yourself with your current situation and biggest goal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 text-sm mt-1">2.</span>
                <span><strong>Complete the mindset assessment</strong> included in the downloadable resources to identify your limiting beliefs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 text-sm mt-1">3.</span>
                <span><strong>Set your 30, 60, and 90-day goals</strong> using the framework provided in the goal-setting worksheet</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 text-sm mt-1">4.</span>
                <span><strong>Create your vision board</strong> with specific destinations you want to work from and the lifestyle you want to achieve</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 text-sm mt-1">5.</span>
                <span><strong>Schedule your work blocks</strong> for the next 13 days to ensure you complete the entire program</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mt-8 border border-emerald-500/30">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">💡 Pro Tip: Your Success Starts Today</h3>
            <p className="text-slate-300 leading-relaxed">
              The difference between people who succeed with this program and those who don't isn't talent, luck, or background – it's consistency and action. Commit to spending at least 2-3 hours per day on this program for the next 14 days. Block this time in your calendar right now. Treat it like the most important meeting of your day, because it is. Your future self will thank you for the discipline you show today.
            </p>
          </div>

          <div className="text-center mt-8 p-6 bg-slate-700/30 rounded-lg">
            <p className="text-slate-300 text-lg mb-4">
              Remember: Every expert was once a beginner. Every success story started with someone exactly where you are right now, taking the first step toward their dreams.
            </p>
            <p className="text-emerald-400 font-semibold text-xl">
              Your journey to freedom starts now. Let's make it happen! 🌟
            </p>
          </div>
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Progress</h3>
        <div className="flex items-center gap-4">
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full w-full"></div>
          </div>
          <span className="text-emerald-400 font-semibold">100%</span>
        </div>
        <p className="text-slate-400 mt-2">Module completed! You can now access Module 2.</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" disabled>
          Previous Module
        </Button>
        <Link href="/order/product/RemoteReadyBootcamp/module-2">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Next Module →
          </Button>
        </Link>
      </div>
    </div>
  </div>
</div>
)
}

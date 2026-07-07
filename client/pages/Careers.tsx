import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { getApiUrl } from "@/lib/api-config";
import { MapPin, Briefcase, Clock, Building } from "lucide-react";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(getApiUrl("/api/jobs"));
      const data = await response.json();
      if (data.success) {
        setJobs(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fdfbf7]">
      <SEOHead 
        title="Careers | MetLL"
        description="Join the MetLL team and help us build the future of anonymous connections."
        canonicalUrl="https://metll.in/careers"
      />
      
      <header className="w-full px-4 md:px-8 lg:px-12 py-4 relative z-20 bg-white shadow-sm">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <Link to="/" className="text-black text-3xl font-bold" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
            MetLL
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-black/80 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <Link to="/about" className="hover:text-black transition-colors">About</Link>
            <Link to="/contact" className="hover:text-black transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#311717] mb-6" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
            Join Our Team
          </h1>
          <p className="text-lg md:text-xl text-[#311717]/70 max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Help us build a safe, exciting, and innovative platform where people can express their true feelings without fear.
          </p>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-10 text-[#311717]/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Loading open positions...
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-[#311717]/5">
              <p className="text-lg text-[#311717]/70 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                We don't have any open positions right now.
              </p>
              <p className="text-[#311717]/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                But we're always looking for talented people! Send your resume to <a href="mailto:careers@metll.in" className="text-[#4A5E96] font-medium hover:underline">careers@metll.in</a>
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold text-[#311717] mb-4" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
                Open Positions
              </h2>
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#311717]/5 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="text-2xl font-bold text-[#311717] mb-2" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#311717]/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          <span className="flex items-center gap-1.5 bg-[#4A5E96]/10 text-[#4A5E96] px-3 py-1 rounded-full font-medium">
                            <Briefcase className="w-4 h-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                        </div>
                      </div>
                      
                      <div className="prose prose-sm max-w-none text-[#311717]/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        <p className="whitespace-pre-wrap">{job.description}</p>
                      </div>
                    </div>
                    
                    <div className="md:w-auto w-full pt-2 md:pt-0">
                      <a 
                        href={`mailto:careers@metll.in?subject=Application for ${job.title}`}
                        className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 rounded-xl bg-[#4A5E96] text-white font-medium hover:bg-[#3A4A7A] transition-colors"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

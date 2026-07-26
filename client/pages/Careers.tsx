import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { getApiUrl } from "@/lib/api-config";
import { MapPin, Briefcase, Clock, Building, X, Upload } from "lucide-react";

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
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    qualification: "",
    interest: "",
    experience: ""
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const closeApplyModal = () => {
    setSelectedJob(null);
    setApplySuccess(false);
    setApplyError("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      qualification: "",
      interest: "",
      experience: ""
    });
    setResumeFile(null);
  };

  const handleApplySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    if (!resumeFile) {
      setApplyError("Please attach your resume");
      return;
    }

    setIsApplying(true);
    setApplyError("");
    
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("location", formData.location);
    submitData.append("qualification", formData.qualification);
    submitData.append("interest", formData.interest);
    if (formData.experience) submitData.append("experience", formData.experience);
    submitData.append("resume", resumeFile);

    try {
      const response = await fetch(getApiUrl(`/api/jobs/${selectedJob.id}/apply`), {
        method: "POST",
        body: submitData,
      });
      const data = await response.json();
      if (data.success) {
        setApplySuccess(true);
      } else {
        setApplyError(data.message || "Failed to submit application");
      }
    } catch (error) {
      setApplyError("An error occurred. Please try again.");
    } finally {
      setIsApplying(false);
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
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 rounded-xl bg-[#4A5E96] text-white font-medium hover:bg-[#3A4A7A] transition-colors cursor-pointer"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={closeApplyModal}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#311717] mb-1" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
                Apply for {selectedJob.title}
              </h2>
              <p className="text-[#311717]/60 mb-8">{selectedJob.department} • {selectedJob.location}</p>
              
              {applySuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#311717] mb-2" style={{ fontFamily: "'Novaklasse', sans-serif" }}>Application Submitted!</h3>
                  <p className="text-[#311717]/70 mb-6">Thank you for applying. We will review your application and get back to you soon.</p>
                  <button 
                    onClick={closeApplyModal}
                    className="px-6 py-2 bg-[#4A5E96] text-white rounded-lg font-medium hover:bg-[#3A4A7A] transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-5">
                  {applyError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                      {applyError}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#311717]">Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A5E96]/30 focus:border-[#4A5E96] transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#311717]">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A5E96]/30 focus:border-[#4A5E96] transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#311717]">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A5E96]/30 focus:border-[#4A5E96] transition-all"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#311717]">Current Location *</label>
                      <input 
                        type="text" 
                        name="location"
                        required 
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A5E96]/30 focus:border-[#4A5E96] transition-all"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#311717]">Highest Qualification *</label>
                    <input 
                      type="text" 
                      name="qualification"
                      required 
                      value={formData.qualification}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A5E96]/30 focus:border-[#4A5E96] transition-all"
                      placeholder="e.g. B.Tech in Computer Science"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#311717]">Why are you interested in this position? *</label>
                    <textarea 
                      name="interest"
                      required 
                      rows={3}
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A5E96]/30 focus:border-[#4A5E96] transition-all resize-none"
                      placeholder="Tell us why you'd be a great fit..."
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#311717]">Previous Experience (if any)</label>
                    <textarea 
                      name="experience"
                      rows={3}
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A5E96]/30 focus:border-[#4A5E96] transition-all resize-none"
                      placeholder="Briefly describe your relevant past experience..."
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#311717]">Resume / CV (PDF or DOC) *</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#4A5E96] transition-colors relative">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#4A5E96] hover:text-[#3A4A7A] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#4A5E96]">
                            <span>{resumeFile ? resumeFile.name : "Upload a file"}</span>
                            <input 
                              type="file" 
                              className="sr-only" 
                              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              onChange={handleFileChange}
                              required
                            />
                          </label>
                        </div>
                        {!resumeFile && <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={closeApplyModal}
                      className="px-5 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={isApplying}
                      className="px-6 py-2.5 rounded-lg font-medium text-white bg-[#4A5E96] hover:bg-[#3A4A7A] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isApplying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

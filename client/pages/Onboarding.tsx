import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { userApi } from "../lib/userApi";
import { configApi } from "../lib/configApi";
import { AppConfigKey } from "../config/AppConfigKeys";
import { LocationInput } from "../components/LocationInput";
import { DepartmentSelector } from "../components/DepartmentSelector";
import { CollegeDepartmentSelector } from "../components/CollegeDepartmentSelector";
import { useToast } from "@/hooks/use-toast";
import { LogOut, User, Camera, School, Library, Building2, AtSign, Check, Info, Heart, ChevronLeft } from "lucide-react";

type OnboardingStep = "name" | "photo" | "school" | "college" | "office" | "social";
const DEFAULT_STEPS: OnboardingStep[] = ["name", "photo", "school", "college", "office", "social"];

const STEP_CONFIG = {
  name: { icon: User, title: "Your Name" },
  photo: { icon: Camera, title: "Profile Photo" },
  school: { icon: School, title: "School" },
  college: { icon: Library, title: "College" },
  office: { icon: Building2, title: "Office" },
  social: { icon: AtSign, title: "Social Handles" },
};

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();
  const { toast } = useToast();

  const [activeSteps, setActiveSteps] = useState<OnboardingStep[]>(DEFAULT_STEPS);
  const [step, setStep] = useState<OnboardingStep>("name");
  const [whitelistedColleges, setWhitelistedColleges] = useState<string[]>([]);
  const [showCollegeSuggestions, setShowCollegeSuggestions] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      const res = await configApi.getConfigs();
      if (res.success) {
        if (res.data?.[AppConfigKey.WHITELISTED_COLLEGES]) {
          try {
            const parsed = JSON.parse(res.data[AppConfigKey.WHITELISTED_COLLEGES]);
            if (Array.isArray(parsed)) {
              setWhitelistedColleges(parsed.map((c: any) => String(c).trim()));
            } else {
              setWhitelistedColleges(res.data[AppConfigKey.WHITELISTED_COLLEGES].split(',').map((c: string) => c.trim()));
            }
          } catch {
            setWhitelistedColleges(res.data[AppConfigKey.WHITELISTED_COLLEGES].split(',').map((c: string) => c.trim()));
          }
        }
        
        if (res.data?.[AppConfigKey.HIDDEN_ONBOARDING_STEPS]) {
          try {
            const hiddenSteps = JSON.parse(res.data[AppConfigKey.HIDDEN_ONBOARDING_STEPS]);
            if (Array.isArray(hiddenSteps)) {
              setActiveSteps(DEFAULT_STEPS.filter(step => !hiddenSteps.includes(step as any)));
            }
          } catch {
            const hiddenSteps = res.data[AppConfigKey.HIDDEN_ONBOARDING_STEPS].split(',').map((s: string) => s.trim());
            setActiveSteps(DEFAULT_STEPS.filter(step => !hiddenSteps.includes(step as any)));
          }
        }
      }
    };
    fetchConfig();
  }, []);
  
  // Name
  const [name, setName] = useState(user?.name || "");
  
  // Photo
  const [photoPreview, setPhotoPreview] = useState<string | null>(user?.photo || null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // School
  const [hasSchool, setHasSchool] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [schoolCity, setSchoolCity] = useState("");
  const [schoolState, setSchoolState] = useState("");
  const [schoolClass, setSchoolClass] = useState("");
  const [schoolSection, setSchoolSection] = useState("");

  // College
  const [hasCollege, setHasCollege] = useState(false);
  const [collegeName, setCollegeName] = useState("");
  const [collegeDepartment, setCollegeDepartment] = useState("");
  const [collegeLocation, setCollegeLocation] = useState("");

  // Office
  const [hasOffice, setHasOffice] = useState(false);
  const [officeName, setOfficeName] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [officeDepartment, setOfficeDepartment] = useState("");
  const [officeDesignation, setOfficeDesignation] = useState("");

  // Social
  const [instagramHandle, setInstagramHandle] = useState("");
  const [facebookHandle, setFacebookHandle] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout? Your progress will be lost.")) {
      logout();
      navigate("/register");
    }
  };

  const validateStep = (currentStep: OnboardingStep): boolean => {
    switch (currentStep) {
      case "name":
        if (!name.trim()) {
          toast({ title: "Required", description: "Please enter your name", variant: "destructive" });
          return false;
        }
        return true;
      case "photo":
        if (!photoFile && !photoPreview) {
          toast({ title: "Required", description: "Please upload your profile photo", variant: "destructive" });
          return false;
        }
        return true;
      case "school":
        if (hasSchool && (!schoolName || !schoolCity || !schoolState)) {
          toast({ title: "Required", description: "Please fill all required school fields", variant: "destructive" });
          return false;
        }
        return true;
      case "college":
        if (hasCollege && (!collegeName || !collegeDepartment || !collegeLocation)) {
          toast({ title: "Required", description: "Please fill all required college fields", variant: "destructive" });
          return false;
        }
        return true;
      case "office":
        if (hasOffice && (!officeName || !officeLocation || !officeDepartment || !officeDesignation)) {
          toast({ title: "Required", description: "Please fill all required office fields", variant: "destructive" });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (!validateStep(step)) return;

    const currentIndex = activeSteps.indexOf(step);
    
    // If completing the flow
    if (currentIndex === activeSteps.length - 1) {
      if (!hasSchool && !hasCollege && !hasOffice) {
        toast({ title: "Required", description: "Please provide at least one of: School, College, or Office details", variant: "destructive" });
        return;
      }
      
      try {
        let uploadedPhotoUrl = user?.photo;
        // Upload photo if new
        if (photoFile) {
          const res = await userApi.uploadProfilePicture(photoFile);
          if (res.success && res.data?.profilePhoto) {
            uploadedPhotoUrl = res.data.profilePhoto;
            updateUser({ photo: res.data.profilePhoto });
          } else {
            throw new Error(res.message || "Failed to upload profile picture");
          }
        }

        // Save profile
        await userApi.updateProfile({
          name,
          school: hasSchool ? { name: schoolName, city: schoolCity, state: schoolState, class: schoolClass, section: schoolSection } : undefined,
          college: hasCollege ? { name: collegeName, department: collegeDepartment, location: collegeLocation } : undefined,
          office: hasOffice ? { name: officeName, department: officeDepartment, designation: officeDesignation, location: officeLocation } : undefined,
          instagramHandle,
          facebookHandle,
          twitterHandle,
        });

        navigate("/photo-upload", { state: { photo: uploadedPhotoUrl } });
      } catch (error) {
        toast({ title: "Error", description: "Failed to save profile", variant: "destructive" });
      }
    } else {
      setStep(activeSteps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = activeSteps.indexOf(step);
    if (currentIndex > 0) {
      setStep(activeSteps[currentIndex - 1]);
    }
  };

  const getProgress = () => ((activeSteps.indexOf(step) + 1) / activeSteps.length) * 100;

  const renderToggle = (value: boolean, onChange: (v: boolean) => void, label: string) => (
    <button
      onClick={() => onChange(!value)}
      className="flex items-center gap-3 mb-6 focus:outline-none w-full"
    >
      <div className={`w-6 h-6 rounded border-[1.5px] flex items-center justify-center transition-colors ${value ? 'bg-[#1F1F1F] border-[#1F1F1F]' : 'bg-[rgba(0,0,0,0.03)] border-[rgba(0,0,0,0.08)]'}`}>
        {value && <Check size={16} className="text-white" strokeWidth={3} />}
      </div>
      <span className="text-[#1A1A1A] text-[16px]">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col overflow-hidden text-[#1A1A1A] pt-safe pb-safe font-['Inter']">
      
      {/* Header */}
      <div className="px-6 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[20px] font-semibold text-[#1A1A1A]">Complete Your Profile</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 bg-[rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.08)] rounded-lg text-[#6B6B6B] hover:bg-gray-100 transition-colors"
          >
            <LogOut size={16} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-[rgba(0,0,0,0.03)] rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#1F1F1F] to-[#2D2D2D]"
            initial={{ width: 0 }}
            animate={{ width: `${getProgress()}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Stepper Dots */}
      <div className="flex justify-center items-center py-6 px-4">
        {activeSteps.map((s, idx) => {
          const isActive = activeSteps.indexOf(step) >= idx;
          const isCurrent = step === s;
          const Icon = STEP_CONFIG[s].icon;

          return (
            <div key={s} className="flex items-center">
              <div className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ${isActive ? 'border-[#1F1F1F]' : 'border-[rgba(0,0,0,0.08)] bg-[rgba(0,0,0,0.03)]'} ${isCurrent ? 'shadow-sm' : ''}`}>
                {isActive ? (
                  <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#1F1F1F] to-[#2D2D2D] flex items-center justify-center">
                    <Icon size={16} className="text-white" />
                  </div>
                ) : (
                  <Icon size={16} className="text-[#9B9B9B]" />
                )}
              </div>
              {idx < activeSteps.length - 1 && (
                <div className={`w-4 h-[2px] mx-1 transition-colors ${isActive ? 'bg-[#1F1F1F]' : 'bg-[rgba(0,0,0,0.03)]'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full flex flex-col"
          >
            <div className="bg-white rounded-2xl flex-1 flex flex-col p-6 border border-[rgba(0,0,0,0.08)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              {step === "name" && (
                <>
                  <h2 className="text-[24px] font-bold text-[#1A1A1A] mb-1">Your Name</h2>
                  <p className="text-[#6B6B6B] mb-8 text-[14px]">How should we call you?</p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-[#E0E0E0] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1F1F1F] transition-colors placeholder:text-[#9B9B9B]"
                      />
                      <p className="text-[#6B6B6B] text-[13px] mt-2">A good name helps others recognize you.</p>
                    </div>
                  </div>
                </>
              )}

              {step === "photo" && (
                <>
                  <h2 className="text-[24px] font-bold text-[#1A1A1A] mb-1">Add Your Photo</h2>
                  <p className="text-[#6B6B6B] mb-8 text-[14px]">Let others see the real you</p>
                  <div className="flex flex-col items-center mt-4">
                    <label className="relative w-40 h-40 rounded-[24px] border-2 border-dashed border-[#E0E0E0] bg-[#FAFAFA] flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-[#1F1F1F] transition-all">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Camera size={32} className="text-[#9B9B9B] mb-2" />
                          <span className="text-sm font-medium text-[#9B9B9B]">Tap to select</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPhotoFile(file);
                            setPhotoPreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                  </div>
                </>
              )}

              {step === "school" && (
                <>
                  <h2 className="text-[24px] font-bold text-[#1A1A1A] mb-1">School Details</h2>
                  <p className="text-[#6B6B6B] mb-8 text-[14px]">Add your school information</p>
                  {renderToggle(hasSchool, setHasSchool, "I want to add school details")}
                  {hasSchool && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
                      <div className="flex items-start gap-3 bg-[#EFF6FF] border border-[#BFDBFE] p-3 rounded-lg mb-4">
                        <Info size={18} className="text-[#3B82F6] shrink-0 mt-0.5" />
                        <p className="text-[13px] text-[#1E40AF] font-medium leading-tight">
                          Enter your school details to match with others in your school. Make sure to enter the exact school name and location.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">School Name *</label>
                        <input type="text" placeholder="Enter school name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="w-full h-12 px-4 rounded-xl border border-[#E0E0E0] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1F1F1F] placeholder:text-[#9B9B9B]" />
                      </div>
                      <div>
                        <LocationInput
                          label="City *"
                          placeholder="e.g., Mumbai"
                          value={schoolCity}
                          onLocationSelect={(loc) => setSchoolCity(loc.displayText)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">State *</label>
                        <input type="text" placeholder="e.g., Maharashtra" value={schoolState} onChange={(e) => setSchoolState(e.target.value)} className="w-full h-12 px-4 rounded-xl border border-[#E0E0E0] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1F1F1F] placeholder:text-[#9B9B9B]" />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Class</label>
                          <input type="text" placeholder="e.g., 12th" value={schoolClass} onChange={(e) => setSchoolClass(e.target.value)} className="w-full h-12 px-4 rounded-xl border border-[#E0E0E0] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1F1F1F] placeholder:text-[#9B9B9B]" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Section</label>
                          <input type="text" placeholder="e.g., A" value={schoolSection} onChange={(e) => setSchoolSection(e.target.value)} className="w-full h-12 px-4 rounded-xl border border-[#E0E0E0] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1F1F1F] placeholder:text-[#9B9B9B]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}

              {step === "college" && (
                <>
                  <h2 className="text-[24px] font-bold text-[#1A1A1A] mb-1">College Details</h2>
                  <p className="text-[#6B6B6B] mb-8 text-[14px]">Add your college information</p>
                  {renderToggle(hasCollege, setHasCollege, "I want to add college details")}
                  {hasCollege && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
                      <div className="flex items-start gap-3 bg-[#EFF6FF] border border-[#BFDBFE] p-3 rounded-lg mb-4">
                        <Info size={18} className="text-[#3B82F6] shrink-0 mt-0.5" />
                        <p className="text-[13px] text-[#1E40AF] font-medium leading-tight">
                          Enter your college details to match with others in your college. Make sure to enter the exact college name, department, and location.
                        </p>
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">College Name *</label>
                        <input type="text" placeholder="Enter college name" value={collegeName} onChange={(e) => {
                          setCollegeName(e.target.value);
                          setShowCollegeSuggestions(true);
                        }} className="w-full h-12 px-4 rounded-xl border border-[#E0E0E0] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1F1F1F] placeholder:text-[#9B9B9B]" />
                        {showCollegeSuggestions && collegeName.length > 2 && whitelistedColleges.length > 0 && (
                          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                            {whitelistedColleges.filter(c => c.toLowerCase().includes(collegeName.toLowerCase())).map((c, i) => (
                              <button type="button" key={i} className="w-full px-4 py-3 text-left hover:bg-gray-50 text-sm border-b border-gray-100 last:border-0" onClick={() => {
                                setCollegeName(c);
                                setShowCollegeSuggestions(false);
                              }}>
                                {c}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <CollegeDepartmentSelector
                        label="Department *"
                        value={collegeDepartment}
                        onSelect={setCollegeDepartment}
                      />
                      <div>
                        <LocationInput
                          label="Location *"
                          placeholder="e.g., Mumbai, Maharashtra"
                          value={collegeLocation}
                          onLocationSelect={(loc) => setCollegeLocation(loc.displayText)}
                        />
                      </div>
                    </motion.div>
                  )}
                </>
              )}

              {step === "office" && (
                <>
                  <h2 className="text-[24px] font-bold text-[#1A1A1A] mb-1">Office Details</h2>
                  <p className="text-[#6B6B6B] mb-8 text-[14px]">Add your workplace information</p>
                  {renderToggle(hasOffice, setHasOffice, "I want to add office details")}
                  {hasOffice && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
                      <div className="flex items-start gap-3 bg-[#EFF6FF] border border-[#BFDBFE] p-3 rounded-lg mb-4">
                        <Info size={18} className="text-[#3B82F6] shrink-0 mt-0.5" />
                        <p className="text-[13px] text-[#1E40AF] font-medium leading-tight">
                          Enter your office details to match with others in your office. Make sure to enter the exact company name, department, designation, and location.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Company Name *</label>
                        <input type="text" placeholder="Enter company name" value={officeName} onChange={(e) => setOfficeName(e.target.value)} className="w-full h-12 px-4 rounded-xl border border-[#E0E0E0] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1F1F1F] placeholder:text-[#9B9B9B]" />
                      </div>
                      <div>
                        <LocationInput
                          label="Location *"
                          placeholder="e.g., Bangalore, Karnataka"
                          value={officeLocation}
                          onLocationSelect={(loc) => setOfficeLocation(loc.displayText)}
                        />
                      </div>
                      <DepartmentSelector
                        label="Department *"
                        value={officeDepartment}
                        onSelect={setOfficeDepartment}
                      />
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Designation *</label>
                        <input type="text" placeholder="e.g., Software Engineer" value={officeDesignation} onChange={(e) => setOfficeDesignation(e.target.value)} className="w-full h-12 px-4 rounded-xl border border-[#E0E0E0] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1F1F1F] placeholder:text-[#9B9B9B]" />
                      </div>
                    </motion.div>
                  )}
                </>
              )}

              {step === "social" && (
                <>
                  <h2 className="text-[24px] font-bold text-[#1A1A1A] mb-1">Social Media (Optional)</h2>
                  <p className="text-[#6B6B6B] mb-8 text-[14px]">Link your social handles</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-[#FFF1F2] border border-[#FECDD3] p-3 rounded-lg mb-4">
                      <Heart size={24} className="text-[#E11D48] shrink-0 fill-[#E11D48]" />
                      <p className="text-[13px] text-[#BE123C] font-medium leading-tight">
                        Adding your social handles significantly increases your chances of matching with your crush if they use your Instagram, Facebook, or Reddit username to find you!
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Instagram Username</label>
                      <input type="text" placeholder="@username" value={instagramHandle} onChange={(e) => setInstagramHandle(e.target.value)} className="w-full h-12 px-4 rounded-xl border border-[#E0E0E0] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1F1F1F] placeholder:text-[#9B9B9B]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Facebook Username</label>
                      <input type="text" placeholder="username or profile link" value={facebookHandle} onChange={(e) => setFacebookHandle(e.target.value)} className="w-full h-12 px-4 rounded-xl border border-[#E0E0E0] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1F1F1F] placeholder:text-[#9B9B9B]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Reddit Username</label>
                      <input type="text" placeholder="u/username or @username" value={twitterHandle} onChange={(e) => setTwitterHandle(e.target.value)} className="w-full h-12 px-4 rounded-xl border border-[#E0E0E0] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#1F1F1F] placeholder:text-[#9B9B9B]" />
                    </div>
                    <p className="text-[#9B9B9B] text-[13px] text-center mt-6">
                      Your handles are kept strictly private and only used for matching.
                    </p>
                  </div>
                </>
              )}
              
              <div className="flex-1" />

              {/* Buttons */}
              <div className="flex gap-4 mt-8 pt-4 pb-2">
                {step !== "name" && (
                  <button
                    onClick={handleBack}
                    className="flex-1 h-12 border border-[#E0E0E0] text-[#1A1A1A] rounded-xl font-semibold text-[16px] hover:bg-[#F5F5F5] transition-all flex items-center justify-center"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex-[2] h-12 bg-[#1F1F1F] text-white rounded-xl font-semibold text-[16px] hover:bg-[#2D2D2D] transition-all flex items-center justify-center shadow-sm"
                >
                  {activeSteps.indexOf(step) === activeSteps.length - 1 ? "Complete" : "Next"}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

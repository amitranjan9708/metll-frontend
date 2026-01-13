import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    ChevronLeft,
    ChevronRight,
    Camera,
    X,
    Check,
    Sparkles,
} from "lucide-react";

const INTERESTS = [
    "Music",
    "Travel",
    "Photography",
    "Gaming",
    "Fitness",
    "Reading",
    "Movies",
    "Cooking",
    "Art",
    "Sports",
    "Dancing",
    "Hiking",
    "Yoga",
    "Fashion",
    "Tech",
    "Wine",
    "Coffee",
    "Pets",
    "Volunteering",
    "Writing",
];

const RELATIONSHIP_GOALS = [
    { value: "dating", label: "Dating", description: "Casual dating & seeing where it goes" },
    { value: "relationship", label: "Relationship", description: "Looking for something serious" },
    { value: "friendship", label: "Friendship", description: "Making new friends first" },
    { value: "not-sure", label: "Not sure yet", description: "Open to all possibilities" },
];

export default function Onboarding() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    // Step 1: Basic Info
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");

    // Step 2: Preferences
    const [interestedIn, setInterestedIn] = useState("");
    const [relationshipGoal, setRelationshipGoal] = useState("");

    // Step 3: About You
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((i) => i !== interest));
        } else if (selectedInterests.length < 5) {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            // Complete onboarding - go to confession page
            navigate("/confess");
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return dateOfBirth && gender;
            case 2:
                return interestedIn && relationshipGoal;
            case 3:
                return true; // Step 3 fields are optional
            default:
                return false;
        }
    };

    return (
        <div className="min-h-screen bg-[#A4B8E7] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#6C3FF5]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#5A6FA3]/30 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <header className="relative z-10 px-6 py-4 flex items-center justify-between">
                <h1
                    className="text-2xl md:text-3xl font-semibold text-[#311717]"
                    style={{ fontFamily: "'Novaklasse', sans-serif" }}
                >
                    MetLL
                </h1>
                <button
                    onClick={() => navigate("/")}
                    className="text-sm text-[#311717]/70 hover:text-[#311717] transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    Skip for now
                </button>
            </header>

            {/* Progress Bar */}
            <div className="relative z-10 px-6 py-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={`flex-1 h-2 rounded-full transition-all duration-500 ${step <= currentStep ? "bg-[#6C3FF5]" : "bg-white/40"
                                }`}
                        />
                    ))}
                </div>
                <p
                    className="text-sm text-[#311717]/70 text-center"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    Step {currentStep} of {totalSteps}
                </p>
            </div>

            {/* Form Container */}
            <div className="relative z-10 px-6 py-8 max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Basic Info */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <div className="text-center">
                                    <h2
                                        className="text-2xl md:text-3xl font-bold text-[#311717] mb-2"
                                        style={{ fontFamily: "'Novaklasse', sans-serif" }}
                                    >
                                        Let's get to know you
                                    </h2>
                                    <p
                                        className="text-[#311717]/60"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        Tell us a bit about yourself
                                    </p>
                                </div>

                                {/* Profile Photo Upload */}
                                <div className="flex flex-col items-center">
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="relative w-32 h-32 rounded-full bg-[#A4B8E7]/30 border-4 border-dashed border-[#6C3FF5]/40 flex items-center justify-center cursor-pointer hover:border-[#6C3FF5] transition-colors group"
                                    >
                                        {profilePhoto ? (
                                            <>
                                                <img
                                                    src={profilePhoto}
                                                    alt="Profile"
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setProfilePhoto(null);
                                                    }}
                                                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center text-[#6C3FF5]">
                                                <Camera className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                                                <span
                                                    className="text-xs"
                                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                >
                                                    Add Photo
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                    />
                                    <p
                                        className="text-xs text-[#311717]/50 mt-2"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        Optional - You can add this later
                                    </p>
                                </div>

                                {/* Date of Birth */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="dob"
                                        className="text-sm font-medium text-[#311717]"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        Date of Birth
                                    </Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="h-12 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717]"
                                        max={new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                    />
                                    <p
                                        className="text-xs text-[#311717]/50"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        You must be at least 18 years old
                                    </p>
                                </div>

                                {/* Gender */}
                                <div className="space-y-3">
                                    <Label
                                        className="text-sm font-medium text-[#311717]"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        I am a
                                    </Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: "male", label: "Man" },
                                            { value: "female", label: "Woman" },
                                            { value: "non-binary", label: "Non-binary" },
                                            { value: "prefer-not", label: "Prefer not to say" },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => setGender(option.value)}
                                                className={`p-4 rounded-xl border-2 transition-all duration-300 ${gender === option.value
                                                    ? "border-[#6C3FF5] bg-[#6C3FF5]/10 text-[#6C3FF5]"
                                                    : "border-[#A4B8E7]/30 hover:border-[#6C3FF5]/50 text-[#311717]"
                                                    }`}
                                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Preferences */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <div className="text-center">
                                    <h2
                                        className="text-2xl md:text-3xl font-bold text-[#311717] mb-2"
                                        style={{ fontFamily: "'Novaklasse', sans-serif" }}
                                    >
                                        What are you looking for?
                                    </h2>
                                    <p
                                        className="text-[#311717]/60"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        Help us find your perfect match
                                    </p>
                                </div>

                                {/* Interested In */}
                                <div className="space-y-3">
                                    <Label
                                        className="text-sm font-medium text-[#311717]"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        I'm interested in
                                    </Label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { value: "men", label: "Men" },
                                            { value: "women", label: "Women" },
                                            { value: "everyone", label: "Everyone" },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => setInterestedIn(option.value)}
                                                className={`p-4 rounded-xl border-2 transition-all duration-300 ${interestedIn === option.value
                                                    ? "border-[#6C3FF5] bg-[#6C3FF5]/10 text-[#6C3FF5]"
                                                    : "border-[#A4B8E7]/30 hover:border-[#6C3FF5]/50 text-[#311717]"
                                                    }`}
                                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Relationship Goals */}
                                <div className="space-y-3">
                                    <Label
                                        className="text-sm font-medium text-[#311717]"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        What are you looking for?
                                    </Label>
                                    <div className="space-y-3">
                                        {RELATIONSHIP_GOALS.map((goal) => (
                                            <button
                                                key={goal.value}
                                                type="button"
                                                onClick={() => setRelationshipGoal(goal.value)}
                                                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${relationshipGoal === goal.value
                                                    ? "border-[#6C3FF5] bg-[#6C3FF5]/10"
                                                    : "border-[#A4B8E7]/30 hover:border-[#6C3FF5]/50"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p
                                                            className={`font-medium ${relationshipGoal === goal.value
                                                                ? "text-[#6C3FF5]"
                                                                : "text-[#311717]"
                                                                }`}
                                                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                        >
                                                            {goal.label}
                                                        </p>
                                                        <p
                                                            className="text-sm text-[#311717]/60"
                                                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                        >
                                                            {goal.description}
                                                        </p>
                                                    </div>
                                                    {relationshipGoal === goal.value && (
                                                        <div className="w-6 h-6 rounded-full bg-[#6C3FF5] flex items-center justify-center">
                                                            <Check className="w-4 h-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: About You */}
                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <div className="text-center">
                                    <h2
                                        className="text-2xl md:text-3xl font-bold text-[#311717] mb-2"
                                        style={{ fontFamily: "'Novaklasse', sans-serif" }}
                                    >
                                        Tell us more about you
                                    </h2>
                                    <p
                                        className="text-[#311717]/60"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        Make your profile stand out
                                    </p>
                                </div>

                                {/* Bio */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label
                                            htmlFor="bio"
                                            className="text-sm font-medium text-[#311717]"
                                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                                        >
                                            About me{" "}
                                            <span className="text-[#311717]/50 font-normal">
                                                (optional)
                                            </span>
                                        </Label>
                                        <span
                                            className="text-xs text-[#311717]/50"
                                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                                        >
                                            {bio.length}/500
                                        </span>
                                    </div>
                                    <textarea
                                        id="bio"
                                        value={bio}
                                        onChange={(e) =>
                                            setBio(e.target.value.slice(0, 500))
                                        }
                                        placeholder="Write something interesting about yourself..."
                                        className="w-full min-h-[120px] p-4 rounded-xl bg-[#A4B8E7]/10 border border-[#A4B8E7]/30 focus:border-[#6C3FF5] focus:outline-none focus:ring-1 focus:ring-[#6C3FF5] text-[#311717] resize-none"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    />
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="location"
                                        className="text-sm font-medium text-[#311717]"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        Location{" "}
                                        <span className="text-[#311717]/50 font-normal">
                                            (optional)
                                        </span>
                                    </Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="City, Country"
                                        className="h-12 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717]"
                                    />
                                </div>

                                {/* Interests */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <Label
                                            className="text-sm font-medium text-[#311717]"
                                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                                        >
                                            Interests{" "}
                                            <span className="text-[#311717]/50 font-normal">
                                                (optional)
                                            </span>
                                        </Label>
                                        <span
                                            className="text-xs text-[#311717]/50"
                                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                                        >
                                            {selectedInterests.length}/5 selected
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {INTERESTS.map((interest) => (
                                            <button
                                                key={interest}
                                                type="button"
                                                onClick={() => toggleInterest(interest)}
                                                disabled={
                                                    selectedInterests.length >= 5 &&
                                                    !selectedInterests.includes(interest)
                                                }
                                                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${selectedInterests.includes(interest)
                                                    ? "bg-[#6C3FF5] text-white"
                                                    : selectedInterests.length >= 5
                                                        ? "bg-[#A4B8E7]/20 text-[#311717]/40 cursor-not-allowed"
                                                        : "bg-[#A4B8E7]/20 text-[#311717] hover:bg-[#6C3FF5]/20"
                                                    }`}
                                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                            >
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#A4B8E7]/20">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`flex items-center gap-2 ${currentStep === 1
                                ? "opacity-0 pointer-events-none"
                                : "text-[#311717] hover:bg-[#A4B8E7]/20"
                                }`}
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </Button>

                        <Button
                            type="button"
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className="flex items-center gap-2 px-8 py-3 bg-[#6C3FF5] hover:bg-[#5A2ED4] text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {currentStep === totalSteps ? (
                                <>
                                    <Sparkles className="w-4 h-4" />
                                    Complete
                                </>
                            ) : (
                                <>
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom decorative element */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#5A6FA3]/30 to-transparent pointer-events-none" />
        </div>
    );
}

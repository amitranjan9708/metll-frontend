import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Heart, Send, Sparkles, Check, X, Search, Lock } from "lucide-react";

type ConfessionContext = "school" | "college" | "office" | "home" | "";
type ConfessionStep = "details" | "searching" | "photos" | "confession" | "stored" | "success";

// Mock matching profiles - in real app this would come from API
const MOCK_PROFILES = [
    { id: 1, name: "Priya S.", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
    { id: 2, name: "Aisha K.", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
    { id: 3, name: "Meera R.", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" },
    { id: 4, name: "Ananya P.", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face" },
    { id: 5, name: "Rahul M.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
    { id: 6, name: "Arjun T.", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
];

export default function Confession() {
    const navigate = useNavigate();
    const [step, setStep] = useState<ConfessionStep>("details");
    const [context, setContext] = useState<ConfessionContext>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Selected profile from matching
    const [selectedProfile, setSelectedProfile] = useState<typeof MOCK_PROFILES[0] | null>(null);
    const [matchingProfiles, setMatchingProfiles] = useState<typeof MOCK_PROFILES>([]);

    // School fields
    const [schoolName, setSchoolName] = useState("");
    const [classGrade, setClassGrade] = useState("");
    const [section, setSection] = useState("");

    // College fields
    const [collegeName, setCollegeName] = useState("");
    const [department, setDepartment] = useState("");
    const [year, setYear] = useState("");

    // Office fields
    const [companyName, setCompanyName] = useState("");
    const [officeTeam, setOfficeTeam] = useState("");

    // Home-based fields
    const [locality, setLocality] = useState("");
    const [howYouKnow, setHowYouKnow] = useState("");

    // Confession message
    const [confession, setConfession] = useState("");

    const canSearchProfiles = () => {
        if (!context) return false;
        switch (context) {
            case "school":
                return schoolName && classGrade;
            case "college":
                return collegeName && department;
            case "office":
                return companyName;
            case "home":
                return locality;
            default:
                return false;
        }
    };

    const handleSearchProfiles = async () => {
        setStep("searching");

        // Simulate API search delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Randomly decide if we find matches (80% chance of finding some)
        const hasMatches = Math.random() > 0.2;

        if (hasMatches) {
            // Return random subset of profiles (2-6 profiles)
            const numProfiles = Math.floor(Math.random() * 5) + 2;
            const shuffled = [...MOCK_PROFILES].sort(() => Math.random() - 0.5);
            setMatchingProfiles(shuffled.slice(0, numProfiles));
            setStep("photos");
        } else {
            setMatchingProfiles([]);
            setStep("photos");
        }
    };

    const handleSelectProfile = (profile: typeof MOCK_PROFILES[0]) => {
        setSelectedProfile(profile);
    };

    const handleConfirmSelection = () => {
        if (selectedProfile) {
            setStep("confession");
        }
    };

    const handleNoneOfThese = () => {
        setSelectedProfile(null);
        setStep("stored");
    };

    const handleSubmitConfession = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setStep("success");
    };

    const getContextLabel = () => {
        switch (context) {
            case "school": return schoolName;
            case "college": return collegeName;
            case "office": return companyName;
            case "home": return locality;
            default: return "";
        }
    };

    // Stored privately state
    if (step === "stored") {
        return (
            <div className="min-h-screen bg-[#A4B8E7] flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-3xl p-12 text-center max-w-md shadow-2xl"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#5A6FA3] to-[#A4B8E7] flex items-center justify-center"
                    >
                        <Lock className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2
                        className="text-2xl font-bold text-[#311717] mb-3"
                        style={{ fontFamily: "'Novaklasse', sans-serif" }}
                    >
                        Confession Stored Privately 🔒
                    </h2>
                    <p
                        className="text-[#311717]/70 mb-6"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        Your crush details have been stored. When they join MetLL and confess about you, we'll match you both! 💜
                    </p>
                    <Button
                        onClick={() => navigate("/")}
                        className="px-8 py-3 bg-[#6C3FF5] hover:bg-[#5A2ED4] text-white rounded-full"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        Go to Home
                    </Button>
                </motion.div>
            </div>
        );
    }

    // Success state
    if (step === "success") {
        return (
            <div className="min-h-screen bg-[#A4B8E7] flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-3xl p-12 text-center max-w-md shadow-2xl"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#6C3FF5] to-[#A4B8E7] flex items-center justify-center"
                    >
                        <Heart className="w-12 h-12 text-white" fill="white" />
                    </motion.div>
                    <h2
                        className="text-2xl font-bold text-[#311717] mb-3"
                        style={{ fontFamily: "'Novaklasse', sans-serif" }}
                    >
                        Confession Sent! 💜
                    </h2>
                    <p
                        className="text-[#311717]/70 mb-6"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        Your feelings have been anonymously shared with {selectedProfile?.name}. If they confess about you too, you'll both be notified!
                    </p>
                    <motion.div
                        className="flex justify-center gap-2 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 rounded-full bg-[#6C3FF5]"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </motion.div>
                    <Button
                        onClick={() => navigate("/")}
                        className="px-8 py-3 bg-[#6C3FF5] hover:bg-[#5A2ED4] text-white rounded-full"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        Go to Home
                    </Button>
                </motion.div>
            </div>
        );
    }

    // Searching state
    if (step === "searching") {
        return (
            <div className="min-h-screen bg-[#A4B8E7] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-3xl p-12 text-center max-w-md shadow-2xl"
                >
                    <motion.div
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#6C3FF5] to-[#A4B8E7] flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <Search className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2
                        className="text-xl font-bold text-[#311717] mb-3"
                        style={{ fontFamily: "'Novaklasse', sans-serif" }}
                    >
                        Searching for matches...
                    </h2>
                    <p
                        className="text-[#311717]/60"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        Looking for people from {getContextLabel()}
                    </p>
                </motion.div>
            </div>
        );
    }

    // Photo selection state
    if (step === "photos") {
        return (
            <div className="min-h-screen bg-[#A4B8E7] relative overflow-hidden">
                {/* Background decorations */}
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
                        onClick={() => setStep("details")}
                        className="text-sm text-[#311717]/70 hover:text-[#311717] transition-colors"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        ← Go Back
                    </button>
                </header>

                {/* Content */}
                <div className="relative z-10 px-6 py-8 max-w-3xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h2
                                className="text-2xl md:text-3xl font-bold text-[#311717] mb-2"
                                style={{ fontFamily: "'Novaklasse', sans-serif" }}
                            >
                                {matchingProfiles.length > 0 ? "Is your crush here?" : "No matches found"}
                            </h2>
                            <p
                                className="text-[#311717]/60"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                {matchingProfiles.length > 0
                                    ? `We found ${matchingProfiles.length} people from ${getContextLabel()}. Select your crush!`
                                    : "We couldn't find anyone matching those details yet. Your confession will be stored privately."}
                            </p>
                        </div>

                        {matchingProfiles.length > 0 ? (
                            <>
                                {/* Photo Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                    {matchingProfiles.map((profile) => (
                                        <motion.button
                                            key={profile.id}
                                            type="button"
                                            onClick={() => handleSelectProfile(profile)}
                                            className={`relative p-4 rounded-2xl border-3 transition-all duration-300 ${selectedProfile?.id === profile.id
                                                    ? "border-[#6C3FF5] bg-[#6C3FF5]/10 shadow-lg"
                                                    : "border-[#A4B8E7]/30 hover:border-[#6C3FF5]/50"
                                                }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={profile.photo}
                                                    alt={profile.name}
                                                    className="w-full aspect-square rounded-xl object-cover"
                                                />
                                                {selectedProfile?.id === profile.id && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute -top-2 -right-2 w-8 h-8 bg-[#6C3FF5] rounded-full flex items-center justify-center shadow-lg"
                                                    >
                                                        <Check className="w-5 h-5 text-white" />
                                                    </motion.div>
                                                )}
                                            </div>
                                            <p
                                                className={`mt-3 text-sm font-medium ${selectedProfile?.id === profile.id ? "text-[#6C3FF5]" : "text-[#311717]"
                                                    }`}
                                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                            >
                                                {profile.name}
                                            </p>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleNoneOfThese}
                                        className="flex-1 h-14 border-2 border-[#A4B8E7]/50 text-[#311717] hover:bg-[#A4B8E7]/10 rounded-xl"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        <X className="w-5 h-5 mr-2" />
                                        None of these is my crush
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handleConfirmSelection}
                                        disabled={!selectedProfile}
                                        className="flex-1 h-14 bg-gradient-to-r from-[#6C3FF5] to-[#8B5CF6] hover:from-[#5A2ED4] hover:to-[#7C3AED] text-white rounded-xl disabled:opacity-50"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                                        This is my crush!
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <Button
                                type="button"
                                onClick={handleNoneOfThese}
                                className="w-full h-14 bg-gradient-to-r from-[#6C3FF5] to-[#8B5CF6] hover:from-[#5A2ED4] hover:to-[#7C3AED] text-white rounded-xl"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                <Lock className="w-5 h-5 mr-2" />
                                Store my confession privately
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Confession writing state
    if (step === "confession") {
        return (
            <div className="min-h-screen bg-[#A4B8E7] relative overflow-hidden">
                {/* Background decorations */}
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
                        onClick={() => setStep("photos")}
                        className="text-sm text-[#311717]/70 hover:text-[#311717] transition-colors"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        ← Change Selection
                    </button>
                </header>

                {/* Content */}
                <div className="relative z-10 px-6 py-8 max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                        {/* Selected Profile Preview */}
                        <div className="flex items-center gap-4 mb-8 p-4 bg-[#6C3FF5]/5 rounded-2xl">
                            <img
                                src={selectedProfile?.photo}
                                alt={selectedProfile?.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-[#6C3FF5]"
                            />
                            <div>
                                <p
                                    className="text-sm text-[#311717]/60"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    Confessing to
                                </p>
                                <p
                                    className="text-lg font-medium text-[#6C3FF5]"
                                    style={{ fontFamily: "'Novaklasse', sans-serif" }}
                                >
                                    {selectedProfile?.name}
                                </p>
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <h2
                                className="text-2xl md:text-3xl font-bold text-[#311717] mb-2"
                                style={{ fontFamily: "'Novaklasse', sans-serif" }}
                            >
                                Write your confession 💜
                            </h2>
                            <p
                                className="text-[#311717]/60"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Express how you feel. Be genuine, be yourself!
                            </p>
                        </div>

                        <form onSubmit={handleSubmitConfession} className="space-y-6">
                            {/* Confession Message */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label
                                        htmlFor="confession"
                                        className="text-sm font-medium text-[#311717]"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        Your message
                                    </Label>
                                    <span
                                        className="text-xs text-[#311717]/50"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        {confession.length}/500
                                    </span>
                                </div>
                                <textarea
                                    id="confession"
                                    value={confession}
                                    onChange={(e) => setConfession(e.target.value.slice(0, 500))}
                                    placeholder={`Tell ${selectedProfile?.name} how you feel... What makes them special to you? 💕`}
                                    className="w-full min-h-[180px] p-4 rounded-xl bg-[#A4B8E7]/10 border border-[#A4B8E7]/30 focus:border-[#6C3FF5] focus:outline-none focus:ring-1 focus:ring-[#6C3FF5] text-[#311717] resize-none"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                />
                                <p
                                    className="text-xs text-[#311717]/50"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    💡 Tip: Mention something specific you admire about them!
                                </p>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={!confession.trim() || isSubmitting}
                                className="w-full h-14 bg-gradient-to-r from-[#6C3FF5] to-[#8B5CF6] hover:from-[#5A2ED4] hover:to-[#7C3AED] text-white rounded-xl font-medium text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-[#6C3FF5]/30"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        Sending your confession...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Anonymous Confession
                                        <Heart className="w-5 h-5" fill="currentColor" />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Privacy Note */}
                        <p
                            className="text-center text-xs text-[#311717]/50 mt-6"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            🔒 Your confession is 100% anonymous. We'll only reveal the match if it's mutual!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Details entry state (default)
    return (
        <div className="min-h-screen bg-[#A4B8E7] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#6C3FF5]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#5A6FA3]/30 rounded-full blur-3xl" />
                <motion.div
                    className="absolute top-1/4 left-[10%] text-6xl"
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    💜
                </motion.div>
                <motion.div
                    className="absolute bottom-1/4 right-[10%] text-5xl"
                    animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                    💕
                </motion.div>
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
                    Back to Home
                </button>
            </header>

            {/* Main Content */}
            <div className="relative z-10 px-6 py-8 max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="w-6 h-6 text-[#6C3FF5]" />
                            <h2
                                className="text-2xl md:text-3xl font-bold text-[#311717]"
                                style={{ fontFamily: "'Novaklasse', sans-serif" }}
                            >
                                Confess Your Feelings
                            </h2>
                            <Sparkles className="w-6 h-6 text-[#6C3FF5]" />
                        </div>
                        <p
                            className="text-[#311717]/60"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Tell us where you know your crush from, and we'll help you find them!
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Context Selection */}
                        <div className="space-y-3">
                            <Label
                                className="text-sm font-medium text-[#311717]"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Where do you know your crush from?
                            </Label>
                            <Select
                                value={context}
                                onValueChange={(value: ConfessionContext) => setContext(value)}
                            >
                                <SelectTrigger className="h-14 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717] rounded-xl">
                                    <SelectValue placeholder="Select where you met..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="school">🏫 School</SelectItem>
                                    <SelectItem value="college">🎓 College / University</SelectItem>
                                    <SelectItem value="office">🏢 Office / Workplace</SelectItem>
                                    <SelectItem value="home">🏠 Home / Neighborhood</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Context-Specific Fields */}
                        <AnimatePresence mode="wait">
                            {context && (
                                <motion.div
                                    key={context}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4 overflow-hidden"
                                >
                                    {/* School Fields */}
                                    {context === "school" && (
                                        <>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="schoolName"
                                                    className="text-sm font-medium text-[#311717]"
                                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                >
                                                    School Name <span className="text-red-400">*</span>
                                                </Label>
                                                <Input
                                                    id="schoolName"
                                                    type="text"
                                                    value={schoolName}
                                                    onChange={(e) => setSchoolName(e.target.value)}
                                                    placeholder="e.g., DPS, St. Mary's, etc."
                                                    className="h-12 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717] rounded-xl"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="classGrade"
                                                        className="text-sm font-medium text-[#311717]"
                                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                    >
                                                        Class / Grade <span className="text-red-400">*</span>
                                                    </Label>
                                                    <Input
                                                        id="classGrade"
                                                        type="text"
                                                        value={classGrade}
                                                        onChange={(e) => setClassGrade(e.target.value)}
                                                        placeholder="e.g., 12th"
                                                        className="h-12 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717] rounded-xl"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="section"
                                                        className="text-sm font-medium text-[#311717]"
                                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                    >
                                                        Section <span className="text-[#311717]/50 font-normal">(optional)</span>
                                                    </Label>
                                                    <Input
                                                        id="section"
                                                        type="text"
                                                        value={section}
                                                        onChange={(e) => setSection(e.target.value)}
                                                        placeholder="e.g., A, B, C"
                                                        className="h-12 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717] rounded-xl"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* College Fields */}
                                    {context === "college" && (
                                        <>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="collegeName"
                                                    className="text-sm font-medium text-[#311717]"
                                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                >
                                                    College / University Name <span className="text-red-400">*</span>
                                                </Label>
                                                <Input
                                                    id="collegeName"
                                                    type="text"
                                                    value={collegeName}
                                                    onChange={(e) => setCollegeName(e.target.value)}
                                                    placeholder="e.g., IIT Delhi, Stanford, etc."
                                                    className="h-12 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717] rounded-xl"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="department"
                                                        className="text-sm font-medium text-[#311717]"
                                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                    >
                                                        Department <span className="text-red-400">*</span>
                                                    </Label>
                                                    <Input
                                                        id="department"
                                                        type="text"
                                                        value={department}
                                                        onChange={(e) => setDepartment(e.target.value)}
                                                        placeholder="e.g., Computer Science"
                                                        className="h-12 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717] rounded-xl"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="year"
                                                        className="text-sm font-medium text-[#311717]"
                                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                    >
                                                        Year <span className="text-[#311717]/50 font-normal">(optional)</span>
                                                    </Label>
                                                    <Input
                                                        id="year"
                                                        type="text"
                                                        value={year}
                                                        onChange={(e) => setYear(e.target.value)}
                                                        placeholder="e.g., 2nd Year"
                                                        className="h-12 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717] rounded-xl"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Office Fields */}
                                    {context === "office" && (
                                        <>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="companyName"
                                                    className="text-sm font-medium text-[#311717]"
                                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                >
                                                    Company Name <span className="text-red-400">*</span>
                                                </Label>
                                                <Input
                                                    id="companyName"
                                                    type="text"
                                                    value={companyName}
                                                    onChange={(e) => setCompanyName(e.target.value)}
                                                    placeholder="e.g., Google, TCS, etc."
                                                    className="h-12 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717] rounded-xl"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="officeTeam"
                                                    className="text-sm font-medium text-[#311717]"
                                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                >
                                                    Department / Team <span className="text-[#311717]/50 font-normal">(optional)</span>
                                                </Label>
                                                <Input
                                                    id="officeTeam"
                                                    type="text"
                                                    value={officeTeam}
                                                    onChange={(e) => setOfficeTeam(e.target.value)}
                                                    placeholder="e.g., Engineering, Marketing"
                                                    className="h-12 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717] rounded-xl"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* Home-based Fields */}
                                    {context === "home" && (
                                        <>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="locality"
                                                    className="text-sm font-medium text-[#311717]"
                                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                >
                                                    Locality / Area <span className="text-red-400">*</span>
                                                </Label>
                                                <Input
                                                    id="locality"
                                                    type="text"
                                                    value={locality}
                                                    onChange={(e) => setLocality(e.target.value)}
                                                    placeholder="e.g., Koramangala, Manhattan"
                                                    className="h-12 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717] rounded-xl"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="howYouKnow"
                                                    className="text-sm font-medium text-[#311717]"
                                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                                >
                                                    How do you know them? <span className="text-[#311717]/50 font-normal">(optional)</span>
                                                </Label>
                                                <Input
                                                    id="howYouKnow"
                                                    type="text"
                                                    value={howYouKnow}
                                                    onChange={(e) => setHowYouKnow(e.target.value)}
                                                    placeholder="e.g., Neighbor, Same apartment, Park"
                                                    className="h-12 bg-[#A4B8E7]/10 border-[#A4B8E7]/30 focus:border-[#6C3FF5] text-[#311717] rounded-xl"
                                                />
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Search Button */}
                        <Button
                            type="button"
                            onClick={handleSearchProfiles}
                            disabled={!canSearchProfiles()}
                            className="w-full h-14 bg-gradient-to-r from-[#6C3FF5] to-[#8B5CF6] hover:from-[#5A2ED4] hover:to-[#7C3AED] text-white rounded-xl font-medium text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-[#6C3FF5]/30"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            <Search className="w-5 h-5" />
                            Find my crush
                            <Heart className="w-5 h-5" fill="currentColor" />
                        </Button>
                    </div>

                    {/* Privacy Note */}
                    <p
                        className="text-center text-xs text-[#311717]/50 mt-6"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        🔒 Your search is completely private. No one will know you're looking for them!
                    </p>
                </div>
            </div>

            {/* Bottom decorative element */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#5A6FA3]/30 to-transparent pointer-events-none" />
        </div>
    );
}

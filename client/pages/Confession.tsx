import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Clock, School, Library, Briefcase, 
  MapPin, BookOpen, Heart, X, Check, MailOpen, Lock
} from 'lucide-react';
import { confessionApi, PotentialMatchUser, CreateConfessionRequest } from '../lib/confessionApi';

const C = {
    bg: '#FAFAFA',
    white: '#FFFFFF',
    primary: '#1F1F1F',
    accent: '#A4B8E7', // Periwinkle Blue
    accentDark: '#7A96D4',
    accentDeep: '#5470B8',
    textPrimary: '#1A1A1A',
    textSecondary: '#5A5A6A',
    textMuted: '#9B9BAA',
    border: 'rgba(0,0,0,0.06)',
};

type TabType = 'school' | 'college' | 'office' | 'social';

interface LocationSuggestion {
    display_name: string;
    city: string;
    state: string;
    country: string;
}

const TAB_CONFIG = [
    { type: 'school' as TabType, label: 'School', icon: School },
    { type: 'college' as TabType, label: 'College', icon: Library },
    { type: 'office' as TabType, label: 'Office', icon: Briefcase },
    { type: 'social' as TabType, label: 'Social', icon: MailOpen },
];

const CustomInput = ({ label, value, onChange, placeholder, required = false, icon: Icon }: any) => (
    <div className="mb-4">
        <label className="block text-[12px] font-bold text-[#5A5A6A] mb-1.5 ml-1">
            {label} {required && <span className="text-[#7A96D4]">*</span>}
        </label>
        <div className="flex items-center bg-[#F8F9FC] border border-[#A4B8E7]/30 rounded-[16px] h-[52px] px-4 focus-within:border-[#7A96D4]">
            <Icon size={18} className="text-[#7A96D4] mr-3" />
            <input
                className="flex-1 h-full text-[15px] text-[#1A1A1A] placeholder-[#9B9BAA] outline-none bg-transparent"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    </div>
);

export default function Confession() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialTab = location.state?.initialTab || 'school';

    const [activeTab, setActiveTab] = useState<TabType>(initialTab);
    const [searching, setSearching] = useState(false);
    
    const [crushFirstName, setCrushFirstName] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [schoolClass, setSchoolClass] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const [collegeDepartment, setCollegeDepartment] = useState('');
    const [officeName, setOfficeName] = useState('');
    const [socialPlatform, setSocialPlatform] = useState('instagram');
    const [socialUsername, setSocialUsername] = useState('');
    
    // Location State
    const [locationQuery, setLocationQuery] = useState('');
    const [locationCity, setLocationCity] = useState('');
    const [locationState, setLocationState] = useState('');
    const [locationCountry, setLocationCountry] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [searchingLocation, setSearchingLocation] = useState(false);
    
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [potentialMatches, setPotentialMatches] = useState<PotentialMatchUser[]>([]);
    const [selectedMatch, setSelectedMatch] = useState<PotentialMatchUser | null>(null);
    const [loading, setLoading] = useState(false);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const resetForm = () => {
        setCrushFirstName(''); setSchoolName(''); setSchoolClass('');
        setCollegeName(''); setCollegeDepartment(''); setOfficeName('');
        setSocialUsername(''); setSocialPlatform('instagram');
        setLocationQuery(''); setLocationCity(''); setLocationState(''); setLocationCountry('');
        setPotentialMatches([]); setSelectedMatch(null);
    };

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        resetForm();
    };

    const validateForm = () => {
        if (!crushFirstName.trim()) { alert("Please enter your crush's first name 💕"); return false; }
        if (activeTab === 'school' && !schoolName.trim()) { alert('Please enter the school name'); return false; }
        if (activeTab === 'college' && !collegeName.trim()) { alert('Please enter the college name'); return false; }
        if (activeTab === 'office' && !officeName.trim()) { alert('Please enter the office/company name'); return false; }
        if (activeTab === 'social' && !socialUsername.trim()) { alert('Please enter their social username'); return false; }
        return true;
    };

    const getConfessionData = (): CreateConfessionRequest => {
        switch (activeTab) {
            case 'school':  return { crushFirstName: crushFirstName.trim(), institutionType: 'school',  institutionName: schoolName.trim(),  className: schoolClass.trim() || undefined, city: locationCity || undefined, state: locationState || undefined, country: locationCountry || undefined };
            case 'college': return { crushFirstName: crushFirstName.trim(), institutionType: 'college', institutionName: collegeName.trim(), department: collegeDepartment.trim() || undefined, city: locationCity || undefined, state: locationState || undefined, country: locationCountry || undefined };
            case 'office':  return { crushFirstName: crushFirstName.trim(), institutionType: 'office',  institutionName: officeName.trim(),  city: locationCity || undefined, state: locationState || undefined, country: locationCountry || undefined };
            case 'social':  return { crushFirstName: crushFirstName.trim(), institutionType: 'social', socialPlatform, socialUsername: socialUsername.trim() };
        }
    };

    const handleSearchMatches = async () => {
        if (!validateForm()) return;
        setSearching(true);
        try {
            let params: any = {
                crushFirstName: crushFirstName.trim(),
                institutionType: activeTab,
            };

            if (activeTab === 'social') {
                params.socialPlatform = socialPlatform;
                params.socialUsername = socialUsername.trim();
            } else {
                params.institutionName = activeTab === 'school' ? schoolName.trim() : activeTab === 'college' ? collegeName.trim() : officeName.trim();
                params.className = activeTab === 'school' ? schoolClass.trim() : undefined;
                params.department = activeTab === 'college' ? collegeDepartment.trim() : undefined;
                params.city = locationCity || undefined;
                params.state = locationState || undefined;
                params.country = locationCountry || undefined;
            }
            
            const result = await confessionApi.searchPotentialMatches(params);
            if (result.success && result.data) {
                if (result.data.count > 0) {
                    setPotentialMatches(result.data.potentialMatches);
                    setShowPhotoModal(true);
                } else {
                    if (window.confirm("🔍 No Matches Yet\nYour crush doesn't seem to be on MetLL yet. Save this confession and we'll notify you when they join!")) {
                        handleCreateConfession(null);
                    }
                }
            } else {
                alert(result.message || 'Failed to search for matches');
            }
        } catch { alert('Something went wrong. Please try again.'); }
        finally { setSearching(false); }
    };

    const handleCreateConfession = async (selectedUser: PotentialMatchUser | null) => {
        setLoading(true); setShowPhotoModal(false);
        try {
            const data = getConfessionData();
            if (selectedUser) { data.targetUserId = selectedUser.id; data.matchConfidence = selectedUser.matchConfidence; data.matchMethod = selectedUser.matchMethod; }
            const result = await confessionApi.createConfession(data);
            if (result.success) {
                alert(selectedUser ? `💝 Confession Sent!\nYour confession has been sent to ${selectedUser.name}. They'll be notified!` : "💌 Confession Saved!\nYour confession has been saved. We'll notify you when your crush joins MetLL!");
                resetForm();
                navigate('/home');
            } else { alert(result.message || 'Failed to create confession'); }
        } catch { alert('Something went wrong. Please try again.'); }
        finally { setLoading(false); }
    };

    // --- Location Search ---
    const searchLocation = async (query: string) => {
        if (query.length < 3) { setLocationSuggestions([]); setShowLocationDropdown(false); return; }
        setSearchingLocation(true);
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`,
                { headers: { 'Accept-Language': 'en' } }
            );
            const data = await res.json();
            const sug: LocationSuggestion[] = data.map((item: any) => ({
                display_name: item.display_name,
                city: item.address?.city || item.address?.town || item.address?.village || item.address?.county || '',
                state: item.address?.state || '',
                country: item.address?.country || '',
            })).filter((s: LocationSuggestion) => s.city || s.state);
            setLocationSuggestions(sug);
            setShowLocationDropdown(sug.length > 0);
        } catch { setLocationSuggestions([]); }
        finally { setSearchingLocation(false); }
    };

    useEffect(() => {
        const t = setTimeout(() => { if (locationQuery && !locationCity) searchLocation(locationQuery); }, 500);
        return () => clearTimeout(t);
    }, [locationQuery, locationCity]);

    const selectLocation = (loc: LocationSuggestion) => {
        setLocationCity(loc.city); setLocationState(loc.state); setLocationCountry(loc.country);
        setLocationQuery([loc.city, loc.state, loc.country].filter(Boolean).join(', '));
        setShowLocationDropdown(false);
    };

    const renderLocationInput = () => (
        <div className="mb-4 relative">
            <label className="block text-[12px] font-bold text-[#5A5A6A] mb-1.5 ml-1">Location</label>
            <div className="relative flex items-center bg-[#F8F9FC] border border-[#A4B8E7]/30 rounded-[16px] h-[52px] focus-within:border-[#7A96D4]">
                <div className="pl-4 pr-3 flex items-center justify-center">
                    <MapPin size={18} className="text-[#7A96D4]" />
                </div>
                <input
                    className="w-full h-full text-[15px] text-[#1A1A1A] placeholder-[#9B9BAA] outline-none bg-transparent"
                    value={locationQuery}
                    onChange={(e) => {
                        setLocationQuery(e.target.value);
                        if (locationCity) { setLocationCity(''); setLocationState(''); setLocationCountry(''); }
                        setShowLocationDropdown(true);
                    }}
                    onFocus={() => { if (locationSuggestions.length > 0) setShowLocationDropdown(true); }}
                    placeholder="Search city, state..."
                />
                <div className="pr-4">
                    {searchingLocation ? (
                        <div className="w-4 h-4 border-2 border-[#7A96D4] border-t-transparent rounded-full animate-spin" />
                    ) : locationCity ? (
                        <Check size={18} className="text-green-500" />
                    ) : null}
                </div>
            </div>
            
            <AnimatePresence>
                {showLocationDropdown && locationSuggestions.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="absolute top-[80px] left-0 right-0 bg-white rounded-[16px] border border-[#E8E8E8] shadow-lg overflow-hidden z-50"
                    >
                        {locationSuggestions.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => selectLocation(item)}
                                className={`w-full flex items-center px-4 py-3 text-left hover:bg-[#F8F9FC] ${i !== locationSuggestions.length - 1 ? 'border-b border-[#E8E8E8]' : ''}`}
                            >
                                <MapPin size={16} className="text-[#7A96D4] mr-3 shrink-0" />
                                <div className="flex-1 overflow-hidden">
                                    <div className="text-[14px] font-semibold text-[#1A1A1A] truncate">{item.city || item.state}</div>
                                    <div className="text-[12px] text-[#9B9BAA] truncate">{[item.state, item.country].filter(Boolean).join(', ')}</div>
                                </div>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            
            {locationCity && (
                <div className="flex items-center bg-[#7A96D4] px-3 py-2 rounded-xl mt-3 w-max">
                    <MapPin size={14} className="text-white mr-2" />
                    <span className="text-[13px] text-white font-semibold mr-3">
                        {[locationCity, locationState, locationCountry].filter(Boolean).join(', ')}
                    </span>
                    <button onClick={() => { setLocationQuery(''); setLocationCity(''); setLocationState(''); setLocationCountry(''); }}>
                        <X size={16} className="text-white/80 hover:text-white" />
                    </button>
                </div>
            )}
        </div>
    );

    const renderCrushNameInput = () => (
        <div className="relative mb-5 mt-2">
            {/* Glow gradient border (behind) */}
            <div className="absolute inset-[-4px] bg-[#E8EEF8] rounded-[24px] pointer-events-none" />
            
            <div className="relative bg-white rounded-[20px] p-5 flex flex-col items-center border-[1.5px] border-[#7A96D4] shadow-[0_4px_10px_rgba(122,150,212,0.2)]">
                <img src="/mascot/mascot_shy_giggle.png" className="w-[70px] h-[70px] object-contain mb-2" alt="mascot" />
                <div className="flex items-center gap-1.5 mb-3">
                    <Heart size={18} className="text-[#5470B8]" />
                    <span className="text-[11px] font-[800] tracking-[1.2px] text-[#5470B8]">WHO ARE YOU LOOKING FOR?</span>
                </div>
                
                <input
                    value={crushFirstName}
                    onChange={e => setCrushFirstName(e.target.value)}
                    placeholder="Crush's First Name"
                    className="w-full text-center text-[28px] font-[800] text-[#1A1A1A] placeholder-[#9B9BAA] outline-none border-b border-[#E8EEF8] pb-2 mb-3"
                    style={{ fontFamily: 'Georgia, serif' }}
                />
                <span className="text-[12px] text-[#9B9BAA] text-center italic mt-3">* Don't worry about spelling, we use smart matching!</span>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'school': return (
                <>
                    {renderCrushNameInput()}
                    <CustomInput label="School Name" required value={schoolName} onChange={setSchoolName} placeholder="e.g. DPS Noida, St. Xavier's" icon={School} />
                    {renderLocationInput()}
                    <CustomInput label="Class (Optional)" value={schoolClass} onChange={setSchoolClass} placeholder="e.g. 10th, 12th" icon={BookOpen} />
                </>
            );
            case 'college': return (
                <>
                    {renderCrushNameInput()}
                    <CustomInput label="College Name" required value={collegeName} onChange={setCollegeName} placeholder="e.g. IIT Delhi, SRCC" icon={Briefcase} />
                    {renderLocationInput()}
                    <CustomInput label="Department (Optional)" value={collegeDepartment} onChange={setCollegeDepartment} placeholder="e.g. CS, Arts" icon={Library} />
                </>
            );
            case 'office': return (
                <>
                    {renderCrushNameInput()}
                    <CustomInput label="Company Name" required value={officeName} onChange={setOfficeName} placeholder="e.g. Google, Infosys" icon={Briefcase} />
                    {renderLocationInput()}
                </>
            );
            case 'social': return (
                <>
                    {renderCrushNameInput()}
                    
                    <div className="mb-4">
                        <label className="block text-[12px] font-bold text-[#5A5A6A] mb-2 ml-1">Select Platform</label>
                        <div className="flex gap-2">
                            <button onClick={() => setSocialPlatform('instagram')} className={`flex-1 py-2.5 rounded-xl border flex items-center justify-center gap-2 ${socialPlatform === 'instagram' ? 'bg-[#E1306C]/10 border-[#E1306C] text-[#E1306C]' : 'bg-white border-gray-200 text-gray-500'}`}>
                                Instagram
                            </button>
                            <button onClick={() => setSocialPlatform('facebook')} className={`flex-1 py-2.5 rounded-xl border flex items-center justify-center gap-2 ${socialPlatform === 'facebook' ? 'bg-[#1877F2]/10 border-[#1877F2] text-[#1877F2]' : 'bg-white border-gray-200 text-gray-500'}`}>
                                Facebook
                            </button>
                            <button onClick={() => setSocialPlatform('twitter')} className={`flex-1 py-2.5 rounded-xl border flex items-center justify-center gap-2 ${socialPlatform === 'twitter' ? 'bg-[#1DA1F2]/10 border-[#1DA1F2] text-[#1DA1F2]' : 'bg-white border-gray-200 text-gray-500'}`}>
                                X / Twitter
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-[12px] font-bold text-[#5A5A6A] mb-1.5 ml-1">Username / Handle <span className="text-[#7A96D4]">*</span></label>
                        <div className="flex items-center bg-[#F8F9FC] border border-[#A4B8E7]/30 rounded-[16px] h-[52px] px-4 focus-within:border-[#7A96D4]">
                            <span className="text-[#7A96D4] font-bold mr-2 text-[16px]">@</span>
                            <input
                                className="flex-1 h-full text-[15px] text-[#1A1A1A] placeholder-[#9B9BAA] outline-none bg-transparent"
                                value={socialUsername}
                                onChange={e => setSocialUsername(e.target.value)}
                                placeholder="their_username"
                            />
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-15" style={{ backgroundImage: 'url(/32905340_j.png)', backgroundSize: 'cover' }} />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-4 pt-10 pb-3">
                <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-white/70 rounded-full">
                    <ArrowLeft size={24} className="text-[#1A1A1A]" />
                </button>
                <h1 className="text-[18px] font-bold text-[#1A1A1A] italic" style={{ fontFamily: 'Georgia, serif' }}>Make a Confession</h1>
                <button onClick={() => navigate('/home')} className="w-10 h-10 flex items-center justify-center bg-white/70 rounded-full">
                    <Clock size={24} className="text-[#1A1A1A]" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-24 relative z-10">
                {/* Hero Image */}
                <div className="w-full h-[260px] relative -mt-5">
                    <img src="/confession_hero_new.jpg" className="w-full h-full object-cover" alt="Hero" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-[30px] left-6 right-6 flex flex-col items-center text-center">
                        <h2 className="text-white font-[800] text-[24px] leading-tight mb-2 drop-shadow-md" style={{ fontFamily: 'Georgia, serif' }}>
                            Secretly Admiring Someone?
                        </h2>
                        <div className="flex items-center justify-center flex-wrap mt-1 px-2">
                            <span className="text-white font-medium text-[14px] leading-[20px] drop-shadow-md">
                                Tell us who they are. It stays completely anonymous until they like you back!
                            </span>
                            <Heart className="w-3.5 h-3.5 text-white fill-white ml-1.5 drop-shadow-md" />
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white mx-4 rounded-[24px] -mt-2.5 p-2 shadow-[0_10px_20px_rgba(0,0,0,0.1)] border border-white/50 relative z-20">
                    {/* Tabs */}
                    <div className="flex bg-[#A4B8E714] p-1 rounded-[16px] mb-4">
                        {TAB_CONFIG.map(tab => {
                            const active = activeTab === tab.type;
                            return (
                                <button
                                    key={tab.type}
                                    onClick={() => handleTabChange(tab.type)}
                                    className={`flex-1 flex flex-row items-center justify-center py-[14px] rounded-[24px] transition-colors ${active ? 'bg-[#4A4A4A] shadow-[0_4px_8px_rgba(74,74,74,0.2)]' : 'bg-transparent'}`}
                                >
                                    <tab.icon size={18} className={`mr-1.5 ${active ? 'text-white' : 'text-[#9B9BAA]'}`} />
                                    <span className={`text-[14px] font-bold ${active ? 'text-white' : 'text-[#9B9BAA]'}`}>
                                        {tab.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Form Fields */}
                    <div className="px-2 pb-2">
                        {renderTabContent()}
                    </div>
                </div>

                {/* Search Button */}
                <div className="px-4 mt-6">
                    <button 
                        onClick={handleSearchMatches}
                        disabled={searching}
                        className="w-full h-[54px] bg-[#4A4A4A] rounded-[16px] active:scale-[0.98] transition-transform flex items-center justify-center gap-2.5"
                    >
                        {searching ? (
                            <span className="text-white font-bold text-[17px]">Searching...</span>
                        ) : (
                            <>
                                <Heart size={22} className="text-white" fill="white" />
                                <span className="text-white font-bold text-[17px]">Find My Crush</span>
                                <span className="text-white/90">✨</span>
                            </>
                        )}
                    </button>
                </div>
                
                <div className="flex items-center justify-center mt-4 gap-1.5">
                    <Lock size={14} className="text-[#9B9BAA]" />
                    <span className="text-[12px] text-[#9B9BAA] font-medium">100% Anonymous • 100% Secure</span>
                </div>
            </div>

            {/* Photo Modal */}
            <AnimatePresence>
                {showPhotoModal && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-[#FAFAFA] z-50 flex flex-col"
                    >
                        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'url(/32905340_j.png)', backgroundSize: 'cover' }} />
                        
                        {/* Modal Header */}
                        <div className="relative z-10 pt-10 px-4 pb-4 bg-gradient-to-b from-[#A4B8E7]/20 to-transparent flex items-start">
                            <button onClick={() => setShowPhotoModal(false)} className="w-10 h-10 flex items-center justify-center">
                                <X size={24} className="text-[#1A1A1A]" />
                            </button>
                            <div className="flex-1 flex flex-col items-center">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <MailOpen size={18} className="text-[#1A1A1A]" />
                                    <h2 className="text-[18px] font-bold text-[#1A1A1A]">Is this your crush?</h2>
                                </div>
                                <span className="text-[13px] text-[#5A5A6A]">Found {potentialMatches.length} matches</span>
                            </div>
                            <div className="w-10" />
                        </div>

                        <div className="relative z-10 px-4 mb-4">
                            <div className="bg-[#A4B8E7]/10 border border-[#A4B8E7]/30 p-3 rounded-xl flex items-start gap-2">
                                <div className="mt-0.5"><Lock size={16} className="text-[#7A96D4]" /></div>
                                <p className="text-[13px] text-[#5A5A6A] leading-snug">
                                    Photos are blurred to protect privacy until a mutual match occurs.
                                </p>
                            </div>
                        </div>

                        <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-32">
                            <div className="grid grid-cols-2 gap-4">
                                {potentialMatches.map(match => {
                                    const selected = selectedMatch?.id === match.id;
                                    return (
                                        <button
                                            key={match.id}
                                            onClick={() => setSelectedMatch(match)}
                                            className={`text-left relative rounded-3xl overflow-hidden transition-all duration-300 ${selected ? 'ring-4 ring-[#A4B8E7]/50 scale-[0.98]' : ''}`}
                                        >
                                            <div className="relative aspect-square">
                                                <img src={match.profilePhoto} className="w-full h-full object-cover blur-[2px]" alt="match" />
                                                <div className="absolute inset-0 bg-white/20" />
                                                
                                                {/* Confidence Badge */}
                                                <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
                                                    <span className="text-white text-[12px] font-bold">{match.matchConfidence}%</span>
                                                </div>

                                                {/* Selected Overlay */}
                                                {selected && (
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#A4B8E7]/90 to-[#7A96D4]/90 flex items-center justify-center">
                                                        <Heart size={38} className="text-white" fill="white" />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="p-3 bg-white border border-t-0 border-black/5 rounded-b-3xl">
                                                <h4 className="font-bold text-[15px] text-[#1A1A1A] mb-0.5">{match.name}</h4>
                                                <p className="text-[12px] text-[#5A5A6A] truncate">🏫 {match.institution}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="relative z-10 absolute bottom-0 left-0 right-0 p-5 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] border-t border-black/5">
                            <button
                                onClick={() => handleCreateConfession(selectedMatch)}
                                disabled={!selectedMatch || loading}
                                className={`w-full relative h-14 rounded-full overflow-hidden active:scale-[0.98] transition-all flex items-center justify-center mb-3 ${selectedMatch ? 'shadow-lg' : 'opacity-50'}`}
                            >
                                {selectedMatch ? (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#A4B8E7] to-[#7A96D4]" />
                                        {loading ? (
                                            <span className="relative text-white font-bold text-[16px]">Sending...</span>
                                        ) : (
                                            <>
                                                <Heart size={20} className="relative text-white mr-2" fill="white" />
                                                <span className="relative text-white font-bold text-[16px]">Confess to {selectedMatch.name}</span>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full bg-[#D4D4D4] flex items-center justify-center">
                                        <Heart size={20} className="text-white mr-2" />
                                        <span className="text-white font-bold text-[16px]">Select Your Crush</span>
                                    </div>
                                )}
                            </button>
                            <button onClick={() => handleCreateConfession(null)} className="w-full py-3" disabled={loading}>
                                <span className="text-[15px] font-semibold text-[#5A5A6A]">None of these is my crush</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, User, BookOpen, Briefcase, MapPin, Instagram, Facebook, Twitter, ChevronDown, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { userApi } from '../lib/userApi';
import { motion, AnimatePresence } from 'framer-motion';

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>('basic');

  // Form states
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolCity, setSchoolCity] = useState('');
  const [schoolClass, setSchoolClass] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [collegeDept, setCollegeDept] = useState('');
  const [collegeLocation, setCollegeLocation] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [officeDesignation, setOfficeDesignation] = useState('');
  const [officeDept, setOfficeDept] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [facebookHandle, setFacebookHandle] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const response = await userApi.getUserProfile();
      if (response.success && response.data?.user) {
        populateForm(response.data.user);
      } else {
        // Fallback to context user if needed
        populateForm(user);
      }
    } catch (error) {
      console.error('Load profile error:', error);
      populateForm(user);
    } finally {
      setLoading(false);
    }
  };

  const populateForm = (data: any) => {
    if (!data) return;
    setName(data.name || '');
    setBio(data.bio || '');
    setAge(data.age?.toString() || '');
    setGender(data.gender || '');
    setSchoolName(data.school?.name || '');
    setSchoolCity(data.school?.city || '');
    setSchoolClass(data.school?.class || '');
    setCollegeName(data.college?.name || '');
    setCollegeDept(data.college?.department || '');
    setCollegeLocation(data.college?.location || '');
    setOfficeName(data.office?.name || '');
    setOfficeDesignation(data.office?.designation || '');
    setOfficeDept(data.office?.department || '');
    setInstagramHandle(data.profile?.instagramHandle || data.instagramHandle || '');
    setFacebookHandle(data.profile?.facebookHandle || data.facebookHandle || '');
    setTwitterHandle(data.profile?.twitterHandle || data.twitterHandle || '');
  };

  const saveSection = async (section: string) => {
    setSaving(true);
    try {
      let updateData: any = {};

      if (section === 'basic') {
        updateData = { name, bio, age: age ? parseInt(age) : undefined, gender };
      } else if (section === 'school') {
        updateData = { school: { name: schoolName, city: schoolCity, class: schoolClass } };
      } else if (section === 'college') {
        updateData = { college: { name: collegeName, department: collegeDept, location: collegeLocation } };
      } else if (section === 'office') {
        updateData = { office: { name: officeName, designation: officeDesignation, department: officeDept } };
      } else if (section === 'social') {
        updateData = { instagramHandle, facebookHandle, twitterHandle };
      }

      const response = await userApi.updateProfile(updateData);
      if (response.success) {
        // Re-load to get updated data and sync AuthContext
        const userRes = await userApi.getUserProfile();
        if (userRes.success && userRes.data?.user) {
          login(userRes.data.user, localStorage.getItem('authToken') || '');
        }
        setEditingSection(null);
      } else {
        alert(response.message || 'Update failed');
      }
    } catch (error: any) {
      alert(error.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (section: string) => {
    if (editingSection === section) {
      setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  const SECTIONS = [
    {
      id: 'basic',
      icon: User,
      title: 'Basic Info',
      subtitle: 'Name, Bio, Age & Gender'
    },
    {
      id: 'college',
      icon: BookOpen,
      title: 'College',
      subtitle: 'Where do you study?'
    },
    {
      id: 'office',
      icon: Briefcase,
      title: 'Workplace',
      subtitle: 'Where do you work?'
    },
    {
      id: 'school',
      icon: BookOpen, // Can be Book
      title: 'School',
      subtitle: 'Where did you go to school?'
    },
    {
      id: 'social',
      icon: Instagram,
      title: 'Social Links',
      subtitle: 'Connect your socials'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-white shadow-sm z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-900">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">Edit Profile</h1>
        <div className="w-10" />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1A1A1A] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="px-6 pt-6 flex-1">
          
          {/* Photos Overview */}
          <div className="bg-white rounded-[24px] p-5 mb-6 border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
               onClick={() => navigate('/photo-upload')}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden relative">
                {user?.photo ? (
                  <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Camera className="text-white w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-gray-900">Manage Photos</h3>
                <p className="text-[13px] text-gray-500">Update your profile pictures</p>
              </div>
            </div>
            <ArrowLeft className="rotate-180 text-gray-400" />
          </div>

          <h2 className="text-[15px] font-bold text-gray-500 uppercase tracking-wider mb-4 mt-8">Profile Details</h2>

          <div className="flex flex-col gap-4">
            {SECTIONS.map((section) => {
              const isExpanded = editingSection === section.id;
              const Icon = section.icon;

              return (
                <div key={section.id} className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                  <button 
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#FAFAFA] flex items-center justify-center text-gray-600">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-[17px] font-bold text-gray-900">{section.title}</h3>
                        <p className="text-[13px] text-gray-500">{section.subtitle}</p>
                      </div>
                    </div>
                    <ChevronDown className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-gray-50 mt-2">
                          
                          {/* Basic Info Form */}
                          {section.id === 'basic' && (
                            <div className="flex flex-col gap-4 pt-4">
                              <div>
                                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Name</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)}
                                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[16px] font-medium text-gray-900 focus:ring-2 focus:ring-[#A4B8E7] outline-none transition-all"
                                  placeholder="Your first name" />
                              </div>
                              <div>
                                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Bio</label>
                                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[16px] font-medium text-gray-900 focus:ring-2 focus:ring-[#A4B8E7] outline-none transition-all resize-none"
                                  placeholder="Write something about yourself" />
                              </div>
                              <div className="flex gap-4">
                                <div className="flex-1">
                                  <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Age</label>
                                  <input type="number" value={age} onChange={e => setAge(e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[16px] font-medium text-gray-900 focus:ring-2 focus:ring-[#A4B8E7] outline-none transition-all"
                                    placeholder="e.g. 21" />
                                </div>
                                <div className="flex-1">
                                  <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Gender</label>
                                  <select value={gender} onChange={e => setGender(e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[16px] font-medium text-gray-900 focus:ring-2 focus:ring-[#A4B8E7] outline-none transition-all appearance-none">
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* College Form */}
                          {section.id === 'college' && (
                            <div className="flex flex-col gap-4 pt-4">
                              <div>
                                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">College Name</label>
                                <input type="text" value={collegeName} onChange={e => setCollegeName(e.target.value)}
                                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[16px] font-medium text-gray-900 focus:ring-2 focus:ring-[#A4B8E7] outline-none transition-all"
                                  placeholder="e.g. Delhi University" />
                              </div>
                              <div>
                                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Department / Course</label>
                                <input type="text" value={collegeDept} onChange={e => setCollegeDept(e.target.value)}
                                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[16px] font-medium text-gray-900 focus:ring-2 focus:ring-[#A4B8E7] outline-none transition-all"
                                  placeholder="e.g. Computer Science" />
                              </div>
                              <div>
                                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">City</label>
                                <input type="text" value={collegeLocation} onChange={e => setCollegeLocation(e.target.value)}
                                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[16px] font-medium text-gray-900 focus:ring-2 focus:ring-[#A4B8E7] outline-none transition-all"
                                  placeholder="e.g. New Delhi" />
                              </div>
                            </div>
                          )}

                          {/* Office Form */}
                          {section.id === 'office' && (
                            <div className="flex flex-col gap-4 pt-4">
                              <div>
                                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Company Name</label>
                                <input type="text" value={officeName} onChange={e => setOfficeName(e.target.value)}
                                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[16px] font-medium text-gray-900 focus:ring-2 focus:ring-[#A4B8E7] outline-none transition-all"
                                  placeholder="e.g. Google" />
                              </div>
                              <div>
                                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Designation</label>
                                <input type="text" value={officeDesignation} onChange={e => setOfficeDesignation(e.target.value)}
                                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[16px] font-medium text-gray-900 focus:ring-2 focus:ring-[#A4B8E7] outline-none transition-all"
                                  placeholder="e.g. Software Engineer" />
                              </div>
                            </div>
                          )}

                          {/* School Form */}
                          {section.id === 'school' && (
                            <div className="flex flex-col gap-4 pt-4">
                              <div>
                                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">School Name</label>
                                <input type="text" value={schoolName} onChange={e => setSchoolName(e.target.value)}
                                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[16px] font-medium text-gray-900 focus:ring-2 focus:ring-[#A4B8E7] outline-none transition-all"
                                  placeholder="e.g. DPS RK Puram" />
                              </div>
                              <div className="flex gap-4">
                                <div className="flex-1">
                                  <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">City</label>
                                  <input type="text" value={schoolCity} onChange={e => setSchoolCity(e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[16px] font-medium text-gray-900 focus:ring-2 focus:ring-[#A4B8E7] outline-none transition-all"
                                    placeholder="e.g. Delhi" />
                                </div>
                                <div className="flex-1">
                                  <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Class/Year</label>
                                  <input type="text" value={schoolClass} onChange={e => setSchoolClass(e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[16px] font-medium text-gray-900 focus:ring-2 focus:ring-[#A4B8E7] outline-none transition-all"
                                    placeholder="e.g. 2021" />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Social Links Form */}
                          {section.id === 'social' && (
                            <div className="flex flex-col gap-4 pt-4">
                              <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden px-4">
                                <Instagram size={18} className="text-gray-400 mr-2" />
                                <input type="text" value={instagramHandle} onChange={e => setInstagramHandle(e.target.value)}
                                  className="w-full bg-transparent border-none py-3 text-[16px] font-medium text-gray-900 outline-none"
                                  placeholder="Instagram Handle" />
                              </div>
                              <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden px-4">
                                <Facebook size={18} className="text-gray-400 mr-2" />
                                <input type="text" value={facebookHandle} onChange={e => setFacebookHandle(e.target.value)}
                                  className="w-full bg-transparent border-none py-3 text-[16px] font-medium text-gray-900 outline-none"
                                  placeholder="Facebook Handle" />
                              </div>
                              <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden px-4">
                                <Twitter size={18} className="text-gray-400 mr-2" />
                                <input type="text" value={twitterHandle} onChange={e => setTwitterHandle(e.target.value)}
                                  className="w-full bg-transparent border-none py-3 text-[16px] font-medium text-gray-900 outline-none"
                                  placeholder="Twitter Handle" />
                              </div>
                            </div>
                          )}

                          {/* Save Button */}
                          <div className="pt-6 pb-2">
                            <button 
                              onClick={() => saveSection(section.id)}
                              disabled={saving}
                              className="w-full bg-[#1A1A1A] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-50"
                            >
                              {saving ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                              ) : (
                                <>
                                  <Check size={18} />
                                  <span>Save Changes</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

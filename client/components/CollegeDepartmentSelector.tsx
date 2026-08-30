import React, { useState } from "react";
import { 
  Code, 
  FlaskConical, 
  Briefcase, 
  BookOpen, 
  Stethoscope, 
  Scale, 
  GraduationCap, 
  LayoutGrid, 
  Library,
  ChevronDown, 
  ChevronUp, 
  X, 
  CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DepartmentCategory {
  name: string;
  icon: React.ElementType;
  description: string;
}

const COLLEGE_DEPARTMENTS: DepartmentCategory[] = [
  {
    name: "Engineering & Technology",
    icon: Code,
    description: "If you study engineering or computers",
  },
  {
    name: "Science",
    icon: FlaskConical,
    description: "If you study pure or applied sciences",
  },
  {
    name: "Commerce & Management",
    icon: Briefcase,
    description: "If you study business or finance",
  },
  {
    name: "Arts & Humanities",
    icon: BookOpen,
    description: "If you study arts, languages, or social sciences",
  },
  {
    name: "Medical & Health",
    icon: Stethoscope,
    description: "If you study medicine or health sciences",
  },
  {
    name: "Law & Public Policy",
    icon: Scale,
    description: "If you study law or governance",
  },
  {
    name: "Education & Teaching",
    icon: GraduationCap,
    description: "If you study education or teaching",
  },
  {
    name: "Other / Interdisciplinary",
    icon: LayoutGrid,
    description: "If your field doesn't fit above",
  },
];

interface CollegeDepartmentSelectorProps {
  value: string;
  onSelect: (department: string) => void;
  label?: string;
}

export const CollegeDepartmentSelector: React.FC<CollegeDepartmentSelectorProps> = ({
  value,
  onSelect,
  label = "Department *",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (departmentName: string) => {
    onSelect(departmentName);
    setModalVisible(false);
  };

  return (
    <>
      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">{label}</label>
        <button
          type="button"
          onClick={() => setModalVisible(true)}
          className="relative flex items-center justify-between w-full h-14 px-4 rounded-xl border border-[#333333] bg-white hover:bg-gray-50 transition-all shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Library size={20} className="text-gray-500" />
            <span className={`text-[15px] ${value ? "text-gray-900 font-medium" : "text-gray-400"}`}>
              {value || "Select your department"}
            </span>
          </div>
          {modalVisible ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        </button>
      </div>

      <AnimatePresence>
        {modalVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setModalVisible(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Select Department</h3>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <p className="text-[14px] text-gray-500 mb-6 text-center">
                  Select the department category that best describes your field of study
                </p>
                <div className="grid gap-3">
                  {COLLEGE_DEPARTMENTS.map((department) => {
                    const Icon = department.icon;
                    const isSelected = value === department.name;
                    return (
                      <button
                        key={department.name}
                        type="button"
                        onClick={() => handleSelect(department.name)}
                        className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? "border-[#1F1F1F] bg-[#1F1F1F]/5"
                            : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${
                            isSelected ? "bg-[#1F1F1F] text-white" : "bg-[rgba(0,0,0,0.03)] text-[#1A1A1A]"
                          }`}
                        >
                          <Icon size={24} />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className={`text-[17px] font-semibold mb-1 ${isSelected ? "text-[#1F1F1F]" : "text-gray-900"}`}>
                            {department.name}
                          </h4>
                          <p className="text-[13px] text-gray-500 leading-snug">
                            {department.description}
                          </p>
                        </div>
                        {isSelected && <CheckCircle2 size={24} className="text-[#1F1F1F] mt-1 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

import React, { useState } from "react";
import { Code, Briefcase, Settings, Users, Banknote, Trophy, Building2, ChevronDown, ChevronUp, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DepartmentCategory {
  name: string;
  icon: React.ElementType;
  departments: string[];
}

const DEPARTMENT_CATEGORIES: DepartmentCategory[] = [
  {
    name: "Technology",
    icon: Code,
    departments: ["Engineering", "IT", "Data", "AI", "Security", "QA"],
  },
  {
    name: "Business",
    icon: Briefcase,
    departments: ["Sales", "Marketing", "Strategy", "Partnerships", "PR"],
  },
  {
    name: "Operations",
    icon: Settings,
    departments: ["Ops", "Supply Chain", "Procurement", "Admin", "Facilities"],
  },
  {
    name: "People",
    icon: Users,
    departments: ["HR", "Hiring", "Payroll coordination", "Culture", "L&D"],
  },
  {
    name: "Finance",
    icon: Banknote,
    departments: ["Finance", "Legal", "Compliance", "Risk", "Audit", "Tax"],
  },
  {
    name: "Leadership",
    icon: Trophy,
    departments: ["Founders", "CXOs", "Directors", "Decision-making"],
  },
];

interface DepartmentSelectorProps {
  value: string;
  onSelect: (department: string) => void;
  label?: string;
}

export const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({
  value,
  onSelect,
  label = "Department *",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (categoryName: string) => {
    onSelect(categoryName);
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
            <Building2 size={20} className="text-gray-500" />
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
                  Select the department category that best describes your role
                </p>
                <div className="grid gap-3">
                  {DEPARTMENT_CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    const isSelected = value === category.name;
                    return (
                      <button
                        key={category.name}
                        type="button"
                        onClick={() => handleSelect(category.name)}
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
                            {category.name}
                          </h4>
                          <p className="text-[13px] text-gray-500 leading-snug">
                            {category.departments.join(", ")}
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

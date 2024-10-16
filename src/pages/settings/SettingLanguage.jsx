import { motion } from "framer-motion";
import { ChevronDownIcon, ChevronRightIcon, SuccessIcon } from "@/assets/icons";
import { useTranslation } from "@/hooks";
import useSettingsStore from "@/context/settings";

const SettingLanguage = ({ isOpen, setIsOpen, currencyOpen }) => {
  const { language, setLanguage } = useSettingsStore();
  const languages = ["English", "Russian", "O'zbek"];
  const t = useTranslation();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className={`${currencyOpen ? "hidden" : "block"}`}>
      <div className="relative">
        <motion.div
          className={`${
            isOpen ? "hidden" : "flex"
          } h-[75px] bg-mainColor rounded-[7px] text-white px-[21px] items-center justify-between cursor-pointer`}
          onClick={toggleDropdown}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-medium text-base ">{t.selectLanguage}</p>
          <ChevronDownIcon
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </motion.div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{
              opacity: 0,
              y: 1,
              height: 0,
              transition: { duration: 0.1 },
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute mt-2 w-full rounded-[7px] z-10 mb-4"
          >
            {languages.map((lang) => (
              <div
                key={lang}
                onClick={() => handleSelect(lang)}
                className="h-[75px] px-[21px] flex items-center
                   rounded-[7px] text-white cursor-pointer hover:bg-opacity-80 mb-3 bg-mainColor justify-between"
              >
                <p className="font-medium text-base">{lang}</p>
                <div>
                  {language === lang ? <SuccessIcon /> : <ChevronRightIcon />}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SettingLanguage;

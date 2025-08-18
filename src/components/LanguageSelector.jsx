import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <select
      className="border p-2 rounded mb-4"
      onChange={(e) => changeLang(e.target.value)}
    >
      <option value="en">{t("select_language")} - English</option>
      <option value="hi">{t("select_language")} - हिंदी</option>
    </select>
  );
}

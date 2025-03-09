
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SupportedLanguage } from '../../../types/template';

interface LanguageSelectorProps {
  value: SupportedLanguage;
  onChange: (value: SupportedLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange }) => {
  const { t } = useTranslation(['Categories']);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{t('categories:labels.languageSelector')}:</span>
      <Select value={value} onValueChange={(val) => onChange(val as SupportedLanguage)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Dil seçin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tr">Türkçe</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;

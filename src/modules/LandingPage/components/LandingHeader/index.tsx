
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const LandingHeader = () => {
  const { t } = useTranslation('LandingPage');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-40 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-bold text-xl">Loopinance</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.home')}</Link>
          <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.features')}</Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.about')}</Link>
          <Link to="/style-guide" className="text-sm font-medium hover:text-primary transition-colors">Style Guide</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          <ThemeToggle />
          <Button size="sm" variant="ghost" asChild>
            <Link to="/login">{t('nav.login')}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">{t('nav.signup')}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button
            className="p-2 rounded-md hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/20 p-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/features" 
              className="px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.features')}
            </Link>
            <Link 
              to="/about" 
              className="px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/style-guide" 
              className="px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Style Guide
            </Link>
            <div className="pt-2 flex items-center justify-between">
              <LanguageSelector />
              <div className="flex space-x-2">
                <Button size="sm" variant="ghost" className="w-full" asChild>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>{t('nav.login')}</Link>
                </Button>
                <Button size="sm" className="w-full" asChild>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>{t('nav.signup')}</Link>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

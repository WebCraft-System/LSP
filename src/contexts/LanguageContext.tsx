'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ua' | 'pl' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact'
    },
    hero: {
      title: 'Professional Cleaning Services',
      subtitle: 'We provide top-quality cleaning services for your home and office',
      cta: 'Get Quote'
    },
    about: {
      title: 'About Us',
      description: 'We are a professional cleaning company with years of experience in providing high-quality cleaning services.'
    },
    services: {
      title: 'Our Services',
      residential: 'Residential Cleaning',
      commercial: 'Commercial Cleaning',
      deepCleaning: 'Deep Cleaning',
      windowCleaning: 'Window Cleaning'
    },
    contact: {
      title: 'Contact Us',
      phone: 'Phone',
      email: 'Email',
      address: 'Address'
    }
  },
  ua: {
    nav: {
      home: 'Головна',
      about: 'Про нас',
      services: 'Послуги',
      contact: 'Контакти'
    },
    hero: {
      title: 'Професійні послуги прибирання',
      subtitle: 'Ми надаємо високоякісні послуги прибирання для вашого дому та офісу',
      cta: 'Отримати пропозицію'
    },
    about: {
      title: 'Про нас',
      description: 'Ми професійна клінінгова компанія з багаторічним досвідом надання високоякісних послуг прибирання.'
    },
    services: {
      title: 'Наші послуги',
      residential: 'Прибирання житла',
      commercial: 'Комерційне прибирання',
      deepCleaning: 'Генеральне прибирання',
      windowCleaning: 'Миття вікон'
    },
    contact: {
      title: 'Зв\'яжіться з нами',
      phone: 'Телефон',
      email: 'Електронна пошта',
      address: 'Адреса'
    }
  },
  pl: {
    nav: {
      home: 'Strona główna',
      about: 'O nas',
      services: 'Usługi',
      contact: 'Kontakt'
    },
    hero: {
      title: 'Profesjonalne usługi sprzątania',
      subtitle: 'Świadczymy wysokiej jakości usługi sprzątania dla Twojego domu i biura',
      cta: 'Uzyskaj wycenę'
    },
    about: {
      title: 'O nas',
      description: 'Jesteśmy profesjonalną firmą sprzątającą z wieloletnim doświadczeniem w świadczeniu wysokiej jakości usług sprzątania.'
    },
    services: {
      title: 'Nasze usługi',
      residential: 'Sprzątanie mieszkań',
      commercial: 'Sprzątanie komercyjne',
      deepCleaning: 'Sprzątanie generalne',
      windowCleaning: 'Mycie okien'
    },
    contact: {
      title: 'Skontaktuj się z nami',
      phone: 'Telefon',
      email: 'E-mail',
      address: 'Adres'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      about: 'О нас',
      services: 'Услуги',
      contact: 'Контакты'
    },
    hero: {
      title: 'Профессиональные услуги уборки',
      subtitle: 'Мы предоставляем высококачественные услуги уборки для вашего дома и офиса',
      cta: 'Получить предложение'
    },
    about: {
      title: 'О нас',
      description: 'Мы профессиональная клининговая компания с многолетним опытом предоставления высококачественных услуг уборки.'
    },
    services: {
      title: 'Наши услуги',
      residential: 'Уборка жилья',
      commercial: 'Коммерческая уборка',
      deepCleaning: 'Генеральная уборка',
      windowCleaning: 'Мытье окон'
    },
    contact: {
      title: 'Свяжитесь с нами',
      phone: 'Телефон',
      email: 'Электронная почта',
      address: 'Адрес'
    }
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language
    if (savedLanguage && ['en', 'ua', 'pl', 'ru'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference when changed
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('preferred-language', newLanguage)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
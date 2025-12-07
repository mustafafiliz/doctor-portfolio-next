'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, X, Globe, Mail, Phone, MapPin, Clock } from 'lucide-react';

// TODO: API'den site ayarlarını çek
const mockSettings = {
  site: {
    name: 'Prof. Dr. Kadriye Ufuk Elgin',
    tagline: 'Göz Hastalıkları Uzmanı',
    logo: '/images/logo.webp',
    favicon: '/favicon.ico',
  },
  colors: {
    primary: '#144793',
    accent: '#1e5ba8',
  },
  contact: {
    email: 'info@drufukelgin.com',
    phone: '+90 212 555 00 00',
    whatsapp: '+90 532 555 00 00',
    address: 'İstanbul, Türkiye',
  },
  workingHours: [
    { day: 'Pazartesi - Cuma', hours: '09:00 - 18:00' },
    { day: 'Cumartesi', hours: '10:00 - 14:00' },
    { day: 'Pazar', hours: 'Kapalı' },
  ],
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/',
    youtube: 'https://youtube.com/',
  },
  seo: {
    metaTitle: 'Prof. Dr. Kadriye Ufuk Elgin - Göz Hastalıkları Uzmanı',
    metaDescription: 'İstanbul\'da göz hastalıkları uzmanı Prof. Dr. Kadriye Ufuk Elgin. Katarakt, glokom, lazer tedavisi ve daha fazlası.',
    keywords: 'göz doktoru, göz hastalıkları, katarakt, glokom, istanbul',
  },
  maps: {
    embedUrl: 'https://www.google.com/maps/embed?...',
    latitude: '41.0082',
    longitude: '28.9784',
  },
};

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'site' | 'contact' | 'social' | 'seo'>('site');
  const [settings, setSettings] = useState(mockSettings);
  const [newWorkingHour, setNewWorkingHour] = useState({ day: '', hours: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: API'ye güncelleme isteği gönder
    // const response = await fetch('/api/admin/settings', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(settings),
    // });

    setTimeout(() => {
      alert('Ayarlar kaydedildi! (Demo)');
      setIsLoading(false);
    }, 1000);
  };

  const addWorkingHour = () => {
    if (newWorkingHour.day && newWorkingHour.hours) {
      setSettings({
        ...settings,
        workingHours: [...settings.workingHours, newWorkingHour],
      });
      setNewWorkingHour({ day: '', hours: '' });
    }
  };

  const removeWorkingHour = (index: number) => {
    setSettings({
      ...settings,
      workingHours: settings.workingHours.filter((_, i) => i !== index),
    });
  };

  const tabs = [
    { id: 'site', name: 'Site Ayarları', icon: Globe },
    { id: 'contact', name: 'İletişim', icon: Phone },
    { id: 'social', name: 'Sosyal Medya', icon: Globe },
    { id: 'seo', name: 'SEO', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Site Ayarları</h1>
          <p className="text-gray-500 text-sm mt-1">Genel site ayarlarını yönetin</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50 transition-colors"
        >
          <Save size={18} />
          {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#144793] text-[#144793]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={18} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Site Settings Tab */}
          {activeTab === 'site' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Site Adı</label>
                  <input
                    type="text"
                    value={settings.site.name}
                    onChange={(e) => setSettings({ ...settings, site: { ...settings.site, name: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Slogan</label>
                  <input
                    type="text"
                    value={settings.site.tagline}
                    onChange={(e) => setSettings({ ...settings, site: { ...settings.site, tagline: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Logo URL</label>
                  <input
                    type="url"
                    value={settings.site.logo}
                    onChange={(e) => setSettings({ ...settings, site: { ...settings.site, logo: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Favicon URL</label>
                  <input
                    type="url"
                    value={settings.site.favicon}
                    onChange={(e) => setSettings({ ...settings, site: { ...settings.site, favicon: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-800 mb-4">Renkler</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ana Renk</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.colors.primary}
                        onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors, primary: e.target.value } })}
                        className="w-12 h-10 rounded-sm cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.colors.primary}
                        onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors, primary: e.target.value } })}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Vurgu Rengi</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.colors.accent}
                        onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors, accent: e.target.value } })}
                        className="w-12 h-10 rounded-sm cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.colors.accent}
                        onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors, accent: e.target.value } })}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Mail size={16} className="inline mr-1" /> E-posta
                  </label>
                  <input
                    type="email"
                    value={settings.contact.email}
                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Phone size={16} className="inline mr-1" /> Telefon
                  </label>
                  <input
                    type="tel"
                    value={settings.contact.phone}
                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">WhatsApp</label>
                  <input
                    type="tel"
                    value={settings.contact.whatsapp}
                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, whatsapp: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <MapPin size={16} className="inline mr-1" /> Adres
                  </label>
                  <input
                    type="text"
                    value={settings.contact.address}
                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, address: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <Clock size={18} /> Çalışma Saatleri
                </h3>
                
                {settings.workingHours.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {settings.workingHours.map((wh, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-sm">
                        <div className="flex-1 flex items-center gap-4">
                          <span className="font-medium text-gray-800 w-40">{wh.day}</span>
                          <span className="text-gray-600">{wh.hours}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeWorkingHour(index)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Gün (örn: Pazartesi - Cuma)"
                    value={newWorkingHour.day}
                    onChange={(e) => setNewWorkingHour({ ...newWorkingHour, day: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Saat (örn: 09:00 - 18:00)"
                    value={newWorkingHour.hours}
                    onChange={(e) => setNewWorkingHour({ ...newWorkingHour, hours: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={addWorkingHour}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-800 mb-4">Google Maps</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Embed URL</label>
                  <input
                    type="url"
                    value={settings.maps.embedUrl}
                    onChange={(e) => setSettings({ ...settings, maps: { ...settings.maps, embedUrl: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                    placeholder="https://www.google.com/maps/embed?..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Facebook</label>
                  <input
                    type="url"
                    value={settings.social.facebook}
                    onChange={(e) => setSettings({ ...settings, social: { ...settings.social, facebook: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Instagram</label>
                  <input
                    type="url"
                    value={settings.social.instagram}
                    onChange={(e) => setSettings({ ...settings, social: { ...settings.social, instagram: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Twitter / X</label>
                  <input
                    type="url"
                    value={settings.social.twitter}
                    onChange={(e) => setSettings({ ...settings, social: { ...settings.social, twitter: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn</label>
                  <input
                    type="url"
                    value={settings.social.linkedin}
                    onChange={(e) => setSettings({ ...settings, social: { ...settings.social, linkedin: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">YouTube</label>
                  <input
                    type="url"
                    value={settings.social.youtube}
                    onChange={(e) => setSettings({ ...settings, social: { ...settings.social, youtube: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Başlık</label>
                <input
                  type="text"
                  value={settings.seo.metaTitle}
                  onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, metaTitle: e.target.value } })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">{settings.seo.metaTitle.length}/60 karakter</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Açıklama</label>
                <textarea
                  value={settings.seo.metaDescription}
                  onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, metaDescription: e.target.value } })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">{settings.seo.metaDescription.length}/160 karakter</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Anahtar Kelimeler</label>
                <input
                  type="text"
                  value={settings.seo.keywords}
                  onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, keywords: e.target.value } })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  placeholder="kelime1, kelime2, kelime3"
                />
                <p className="text-xs text-gray-500 mt-1">Virgülle ayırarak yazın</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}


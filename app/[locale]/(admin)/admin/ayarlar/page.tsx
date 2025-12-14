'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, Plus, Trash2, Globe, Mail, Phone, MapPin, Clock, Loader2, AlertCircle, Upload, X } from 'lucide-react';
import { websiteApi } from '@/lib/api';
import type { WebsiteSettings, WorkingHour } from '@/lib/types';

export default function AdminSettingsPage() {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'site' | 'contact' | 'social' | 'seo'>('site');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [newWorkingHour, setNewWorkingHour] = useState({ day: '', hours: '' });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const data = await websiteApi.get();
      setSettings(data);
      if (data.site?.logo) setLogoPreview(data.site.logo);
      if (data.site?.favicon) setFaviconPreview(data.site.favicon);
    } catch (err) {
      console.error('Ayarlar yükleme hatası:', err);
      setError('Ayarlar yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSiteSubmit = async () => {
    if (!settings) return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('name', settings.site?.name || '');
      formData.append('tagline', settings.site?.tagline || '');
      if (logoFile) formData.append('logo', logoFile);
      if (faviconFile) formData.append('favicon', faviconFile);

      await websiteApi.updateSite(formData);
      setSuccess('Site bilgileri güncellendi');
      setLogoFile(null);
      setFaviconFile(null);
    } catch (err) {
      console.error('Site güncelleme hatası:', err);
      setError('Site bilgileri güncellenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleColorsSubmit = async () => {
    if (!settings) return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await websiteApi.updateColors(settings.colors);
      setSuccess('Renkler güncellendi');
    } catch (err) {
      console.error('Renk güncelleme hatası:', err);
      setError('Renkler güncellenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleContactSubmit = async () => {
    if (!settings) return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await websiteApi.updateContact(settings.contact);
      setSuccess('İletişim bilgileri güncellendi');
    } catch (err) {
      console.error('İletişim güncelleme hatası:', err);
      setError('İletişim bilgileri güncellenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleWorkingHoursSubmit = async () => {
    if (!settings) return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await websiteApi.updateWorkingHours(settings.workingHours);
      setSuccess('Çalışma saatleri güncellendi');
    } catch (err) {
      console.error('Çalışma saatleri güncelleme hatası:', err);
      setError('Çalışma saatleri güncellenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSocialSubmit = async () => {
    if (!settings) return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await websiteApi.updateSocial(settings.social);
      setSuccess('Sosyal medya linkleri güncellendi');
    } catch (err) {
      console.error('Sosyal medya güncelleme hatası:', err);
      setError('Sosyal medya linkleri güncellenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleMapsSubmit = async () => {
    if (!settings) return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await websiteApi.updateMaps(settings.maps);
      setSuccess('Harita ayarları güncellendi');
    } catch (err) {
      console.error('Harita güncelleme hatası:', err);
      setError('Harita ayarları güncellenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSeoSubmit = async () => {
    if (!settings) return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      if (settings.seo?.metaTitle) formData.append('metaTitle', settings.seo.metaTitle);
      if (settings.seo?.metaDescription) formData.append('metaDescription', settings.seo.metaDescription);

      await websiteApi.updateSeo(formData);
      setSuccess('SEO ayarları güncellendi');
    } catch (err) {
      console.error('SEO güncelleme hatası:', err);
      setError('SEO ayarları güncellenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFaviconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setFaviconPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addWorkingHour = () => {
    if (!settings || !newWorkingHour.day || !newWorkingHour.hours) return;
    setSettings({
      ...settings,
      workingHours: [...(settings.workingHours || []), newWorkingHour],
    });
    setNewWorkingHour({ day: '', hours: '' });
  };

  const removeWorkingHour = (index: number) => {
    if (!settings) return;
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#144793]" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Ayarlar yüklenemedi</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Site Ayarları</h1>
        <p className="text-gray-500 text-sm mt-1">Genel site ayarlarını yönetin</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-sm text-sm border border-red-100">
          <AlertCircle size={18} />
          {error}
          <button onClick={() => setError(null)} className="ml-auto"><X size={16} /></button>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-3 rounded-sm text-sm border border-green-100">
          {success}
          <button onClick={() => setSuccess(null)} className="ml-auto"><X size={16} /></button>
        </div>
      )}

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

        <div className="p-6">
          {/* Site Settings Tab */}
          {activeTab === 'site' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Site Adı</label>
                  <input
                    type="text"
                    value={settings.site?.name || ''}
                    onChange={(e) => setSettings({ ...settings, site: { ...settings.site, name: e.target.value, tagline: settings.site?.tagline || '' } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Slogan</label>
                  <input
                    type="text"
                    value={settings.site?.tagline || ''}
                    onChange={(e) => setSettings({ ...settings, site: { ...settings.site, name: settings.site?.name || '', tagline: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Logo</label>
                  <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoSelect} className="hidden" />
                  {logoPreview ? (
                    <div className="relative inline-block">
                      <img src={logoPreview} alt="Logo" className="h-16 object-contain border border-gray-200 rounded-sm p-2" />
                      <button
                        type="button"
                        onClick={() => { setLogoFile(null); setLogoPreview(null); if(logoInputRef.current) logoInputRef.current.value = ''; }}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50"
                    >
                      <Upload size={18} />
                      Logo Yükle
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Favicon</label>
                  <input ref={faviconInputRef} type="file" accept="image/*" onChange={handleFaviconSelect} className="hidden" />
                  {faviconPreview ? (
                    <div className="relative inline-block">
                      <img src={faviconPreview} alt="Favicon" className="h-16 w-16 object-contain border border-gray-200 rounded-sm p-2" />
                      <button
                        type="button"
                        onClick={() => { setFaviconFile(null); setFaviconPreview(null); if(faviconInputRef.current) faviconInputRef.current.value = ''; }}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => faviconInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50"
                    >
                      <Upload size={18} />
                      Favicon Yükle
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={handleSiteSubmit}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Site Bilgilerini Kaydet
              </button>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-800 mb-4">Renkler</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ana Renk</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.colors?.primary || '#144793'}
                        onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors, primary: e.target.value, accent: settings.colors?.accent || '' } })}
                        className="w-12 h-10 rounded-sm cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.colors?.primary || '#144793'}
                        onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors, primary: e.target.value, accent: settings.colors?.accent || '' } })}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Vurgu Rengi</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.colors?.accent || '#1e5ba8'}
                        onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors, primary: settings.colors?.primary || '', accent: e.target.value } })}
                        className="w-12 h-10 rounded-sm cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.colors?.accent || '#1e5ba8'}
                        onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors, primary: settings.colors?.primary || '', accent: e.target.value } })}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleColorsSubmit}
                  disabled={isSaving}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50"
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Renkleri Kaydet
                </button>
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
                    value={settings.contact?.email || ''}
                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value, phone: settings.contact?.phone || '', address: settings.contact?.address || '' } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Phone size={16} className="inline mr-1" /> Telefon
                  </label>
                  <input
                    type="tel"
                    value={settings.contact?.phone || ''}
                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value, email: settings.contact?.email || '', address: settings.contact?.address || '' } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">WhatsApp</label>
                  <input
                    type="tel"
                    value={settings.contact?.whatsapp || ''}
                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, whatsapp: e.target.value, email: settings.contact?.email || '', phone: settings.contact?.phone || '', address: settings.contact?.address || '' } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <MapPin size={16} className="inline mr-1" /> Adres
                  </label>
                  <input
                    type="text"
                    value={settings.contact?.address || ''}
                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, address: e.target.value, email: settings.contact?.email || '', phone: settings.contact?.phone || '' } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleContactSubmit}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                İletişim Bilgilerini Kaydet
              </button>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <Clock size={18} /> Çalışma Saatleri
                </h3>
                
                {settings.workingHours && settings.workingHours.length > 0 && (
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

                <button
                  onClick={handleWorkingHoursSubmit}
                  disabled={isSaving}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50"
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Çalışma Saatlerini Kaydet
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-800 mb-4">Google Maps</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Embed URL</label>
                  <input
                    type="url"
                    value={settings.maps?.embedUrl || ''}
                    onChange={(e) => setSettings({ ...settings, maps: { ...settings.maps, embedUrl: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                    placeholder="https://www.google.com/maps/embed?..."
                  />
                </div>
                <button
                  onClick={handleMapsSubmit}
                  disabled={isSaving}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50"
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Harita Ayarlarını Kaydet
                </button>
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
                    value={settings.social?.facebook || ''}
                    onChange={(e) => setSettings({ ...settings, social: { ...settings.social, facebook: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Instagram</label>
                  <input
                    type="url"
                    value={settings.social?.instagram || ''}
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
                    value={settings.social?.twitter || ''}
                    onChange={(e) => setSettings({ ...settings, social: { ...settings.social, twitter: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn</label>
                  <input
                    type="url"
                    value={settings.social?.linkedin || ''}
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
                    value={settings.social?.youtube || ''}
                    onChange={(e) => setSettings({ ...settings, social: { ...settings.social, youtube: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>

              <button
                onClick={handleSocialSubmit}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Sosyal Medya Linklerini Kaydet
              </button>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Başlık</label>
                <input
                  type="text"
                  value={settings.seo?.metaTitle || ''}
                  onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, metaTitle: e.target.value } })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">{(settings.seo?.metaTitle || '').length}/60 karakter</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Açıklama</label>
                <textarea
                  value={settings.seo?.metaDescription || ''}
                  onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, metaDescription: e.target.value } })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">{(settings.seo?.metaDescription || '').length}/160 karakter</p>
              </div>


              <button
                onClick={handleSeoSubmit}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                SEO Ayarlarını Kaydet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

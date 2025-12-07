'use client';

import { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Editor } from '@/components/admin/Editor';

// TODO: API'den hakkımda verilerini çek
const mockAboutData = {
  title: 'Prof. Dr. Kadriye Ufuk Elgin',
  subtitle: 'Göz Hastalıkları Uzmanı',
  image: '/images/me.jpg',
  bio: '<p>Prof. Dr. Kadriye Ufuk Elgin, göz hastalıkları alanında 25 yılı aşkın deneyime sahip, alanında uzman bir hekimdir.</p><p>İstanbul Üniversitesi Tıp Fakültesi\'nden mezun olduktan sonra, aynı üniversitede göz hastalıkları uzmanlığını tamamlamıştır.</p>',
  education: [
    { id: '1', year: '1995', title: 'Tıp Fakültesi', institution: 'İstanbul Üniversitesi' },
    { id: '2', year: '2000', title: 'Göz Hastalıkları Uzmanlığı', institution: 'İstanbul Üniversitesi' },
    { id: '3', year: '2010', title: 'Profesörlük', institution: 'Marmara Üniversitesi' },
  ],
  experience: [
    { id: '1', years: '2000-2010', title: 'Göz Hastalıkları Uzmanı', institution: 'Florence Nightingale Hastanesi' },
    { id: '2', years: '2010-2020', title: 'Profesör', institution: 'Marmara Üniversitesi Tıp Fakültesi' },
    { id: '3', years: '2020-Günümüz', title: 'Özel Muayenehane', institution: 'İstanbul' },
  ],
  certifications: [
    'Türk Oftalmoloji Derneği Üyeliği',
    'Avrupa Katarakt ve Refraktif Cerrahi Derneği Üyeliği',
    'Amerikan Göz Akademisi Üyeliği',
  ],
};

export default function AdminAboutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(mockAboutData);
  const [newEducation, setNewEducation] = useState({ year: '', title: '', institution: '' });
  const [newExperience, setNewExperience] = useState({ years: '', title: '', institution: '' });
  const [newCertification, setNewCertification] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: API'ye güncelleme isteği gönder
    // const response = await fetch('/api/admin/about', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });

    setTimeout(() => {
      alert('Hakkımda sayfası güncellendi! (Demo)');
      setIsLoading(false);
    }, 1000);
  };

  const addEducation = () => {
    if (newEducation.year && newEducation.title && newEducation.institution) {
      setFormData({
        ...formData,
        education: [...formData.education, { id: Date.now().toString(), ...newEducation }],
      });
      setNewEducation({ year: '', title: '', institution: '' });
    }
  };

  const removeEducation = (id: string) => {
    setFormData({
      ...formData,
      education: formData.education.filter((e) => e.id !== id),
    });
  };

  const addExperience = () => {
    if (newExperience.years && newExperience.title && newExperience.institution) {
      setFormData({
        ...formData,
        experience: [...formData.experience, { id: Date.now().toString(), ...newExperience }],
      });
      setNewExperience({ years: '', title: '', institution: '' });
    }
  };

  const removeExperience = (id: string) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((e) => e.id !== id),
    });
  };

  const addCertification = () => {
    if (newCertification) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, newCertification],
      });
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hakkımda Sayfası</h1>
          <p className="text-gray-500 text-sm mt-1">Doktor profil bilgilerini düzenleyin</p>
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

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-3">Temel Bilgiler</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">İsim</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Unvan</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-sm border border-gray-200 p-6">
            <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-3 mb-4">Biyografi</h3>
            <Editor
              content={formData.bio}
              onChange={(content) => setFormData({ ...formData, bio: content })}
              placeholder="Doktor biyografisini yazın..."
            />
          </div>

          {/* Education */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-3">Eğitim</h3>
            
            {formData.education.length > 0 && (
              <div className="space-y-2">
                {formData.education.map((edu) => (
                  <div key={edu.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-sm">
                    <div className="w-16 text-sm font-medium text-[#144793]">{edu.year}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800">{edu.title}</p>
                      <p className="text-sm text-gray-500">{edu.institution}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Yıl"
                value={newEducation.year}
                onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
              />
              <input
                type="text"
                placeholder="Başlık"
                value={newEducation.title}
                onChange={(e) => setNewEducation({ ...newEducation, title: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kurum"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-3">Deneyim</h3>
            
            {formData.experience.length > 0 && (
              <div className="space-y-2">
                {formData.experience.map((exp) => (
                  <div key={exp.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-sm">
                    <div className="w-24 text-sm font-medium text-[#144793]">{exp.years}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800">{exp.title}</p>
                      <p className="text-sm text-gray-500">{exp.institution}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Yıllar (2020-2024)"
                value={newExperience.years}
                onChange={(e) => setNewExperience({ ...newExperience, years: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
              />
              <input
                type="text"
                placeholder="Pozisyon"
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kurum"
                  value={newExperience.institution}
                  onChange={(e) => setNewExperience({ ...newExperience, institution: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={addExperience}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-3">Sertifikalar & Üyelikler</h3>
            
            {formData.certifications.length > 0 && (
              <div className="space-y-2">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-sm">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800">{cert}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCertification(index)}
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
                placeholder="Sertifika veya üyelik adı"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={addCertification}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800">Profil Fotoğrafı</h3>
            {formData.image ? (
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Profile"
                  className="w-full aspect-square object-cover rounded-sm"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-sm hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-sm p-6 text-center">
                <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Görsel URL&apos;si girin</p>
                <input
                  type="url"
                  placeholder="https://..."
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                />
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-3">
            <h3 className="font-medium text-gray-800">Özet</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Eğitim</span>
                <span className="font-medium text-gray-800">{formData.education.length} kayıt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Deneyim</span>
                <span className="font-medium text-gray-800">{formData.experience.length} kayıt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sertifika</span>
                <span className="font-medium text-gray-800">{formData.certifications.length} kayıt</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


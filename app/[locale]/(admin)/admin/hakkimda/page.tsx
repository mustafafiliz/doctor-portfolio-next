'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, X, Plus, Trash2, Upload, Loader2, AlertCircle } from 'lucide-react';
import { Editor } from '@/components/admin/Editor';
import { websiteApi } from '@/lib/api';
import type { AboutSection, Education, Experience } from '@/lib/types';

export default function AdminAboutPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<{
    title: string;
    subtitle: string;
    image: string;
    bio: string;
    education: Education[];
    experience: Experience[];
    certifications: string[];
  }>({
    title: '',
    subtitle: '',
    image: '',
    bio: '',
    education: [],
    experience: [],
    certifications: [],
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newEducation, setNewEducation] = useState({ year: '', title: '', institution: '' });
  const [newExperience, setNewExperience] = useState({ years: '', title: '', institution: '' });
  const [newCertification, setNewCertification] = useState('');

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    setIsLoading(true);
    try {
      const data = await websiteApi.getAbout();
      setFormData({
        title: data.title || '',
        subtitle: data.subtitle || '',
        image: data.image || '',
        bio: data.bio || '',
        education: data.education || [],
        experience: data.experience || [],
        certifications: data.certifications || [],
      });
      if (data.image) {
        setImagePreview(data.image);
      }
    } catch (err) {
      console.error('Hakkımda yükleme hatası:', err);
      // If no about section exists yet, that's okay
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('subtitle', formData.subtitle);
      form.append('bio', formData.bio);
      
      // Education array - her bir elemanı ayrı ayrı ekle (order field'ı ile)
      formData.education.forEach((edu, index) => {
        form.append(`education[${index}][year]`, edu.year);
        form.append(`education[${index}][title]`, edu.title);
        form.append(`education[${index}][institution]`, edu.institution);
        form.append(`education[${index}][order]`, (edu.order ?? index).toString());
      });
      
      // Experience array - her bir elemanı ayrı ayrı ekle (order field'ı ile)
      formData.experience.forEach((exp, index) => {
        form.append(`experience[${index}][years]`, exp.years);
        form.append(`experience[${index}][title]`, exp.title);
        form.append(`experience[${index}][institution]`, exp.institution);
        form.append(`experience[${index}][order]`, (exp.order ?? index).toString());
      });
      
      // Certifications array - her bir elemanı ayrı ayrı ekle
      formData.certifications.forEach((cert, index) => {
        form.append(`certifications[${index}]`, cert);
      });
      
      if (selectedFile) {
        form.append('image', selectedFile);
      }

      await websiteApi.updateAbout(form);
      setSuccess('Hakkımda sayfası güncellendi');
      setSelectedFile(null);
    } catch (err) {
      console.error('Hakkımda güncelleme hatası:', err);
      setError('Hakkımda sayfası güncellenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setFormData({ ...formData, image: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const addEducation = () => {
    if (newEducation.year && newEducation.title && newEducation.institution) {
      setFormData({
        ...formData,
        education: [...formData.education, { ...newEducation }],
      });
      setNewEducation({ year: '', title: '', institution: '' });
    }
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index),
    });
  };

  const addExperience = () => {
    if (newExperience.years && newExperience.title && newExperience.institution) {
      setFormData({
        ...formData,
        experience: [...formData.experience, { ...newExperience }],
      });
      setNewExperience({ years: '', title: '', institution: '' });
    }
  };

  const removeExperience = (index: number) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index),
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#144793]" />
      </div>
    );
  }

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
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50 transition-colors"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
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
                {formData.education.map((edu, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-sm">
                    <div className="w-16 text-sm font-medium text-[#144793]">{edu.year}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800">{edu.title}</p>
                      <p className="text-sm text-gray-500">{edu.institution}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
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
                {formData.experience.map((exp, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-sm">
                    <div className="w-24 text-sm font-medium text-[#144793]">{exp.years}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800">{exp.title}</p>
                      <p className="text-sm text-gray-500">{exp.institution}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full aspect-square object-cover rounded-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-sm hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-sm p-6 text-center hover:border-[#144793] transition-colors"
              >
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Fotoğraf yüklemek için tıklayın</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP (max 10MB)</p>
              </button>
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

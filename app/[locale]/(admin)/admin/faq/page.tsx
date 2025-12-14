'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  X,
} from 'lucide-react';
import { faqApi } from '@/lib/api';
import type { FAQ } from '@/lib/types';

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await faqApi.list();
      // API array veya { data: array } dönebilir
      const data = Array.isArray(response) ? response : (response as unknown as { data: FAQ[] }).data || [];
      setFaqs(data);
    } catch (err) {
      console.error('FAQ yükleme hatası:', err);
      setError('SSS verileri yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFaqs = faqs
    .filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.order - b.order);

  const handleDelete = async (id: string) => {
    if (!confirm('Bu soruyu silmek istediğinizden emin misiniz?')) {
      return;
    }

    setDeletingId(id);
    try {
      await faqApi.delete(id);
      setFaqs(faqs.filter((faq) => faq._id !== id));
    } catch (err) {
      console.error('FAQ silme hatası:', err);
      setError('Soru silinirken bir hata oluştu');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSave = async () => {
    if (!formData.question || !formData.answer) return;

    setIsSaving(true);
    setError(null);

    try {
      if (editingFaq) {
        const updated = await faqApi.update(editingFaq._id, {
          question: formData.question,
          answer: formData.answer,
        });
        setFaqs(faqs.map((faq) => (faq._id === editingFaq._id ? updated : faq)));
      } else {
        const newFaq = await faqApi.create({
          question: formData.question,
          answer: formData.answer,
          order: faqs.length,
        });
        setFaqs([...faqs, newFaq]);
      }

      closeModal();
    } catch (err) {
      console.error('FAQ kaydetme hatası:', err);
      setError('Soru kaydedilirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const openEditModal = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingFaq(null);
    setFormData({ question: '', answer: '' });
  };

  const moveItem = async (id: string, direction: 'up' | 'down') => {
    const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);
    const index = sortedFaqs.findIndex((faq) => faq._id === id);
    
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sortedFaqs.length - 1)
    ) {
      return;
    }

    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap orders locally
    const newFaqs = [...sortedFaqs];
    const tempOrder = newFaqs[index].order;
    newFaqs[index] = { ...newFaqs[index], order: newFaqs[swapIndex].order };
    newFaqs[swapIndex] = { ...newFaqs[swapIndex], order: tempOrder };

    setFaqs(newFaqs);

    // Update on server
    try {
      await faqApi.reorder({
        items: newFaqs.map((faq) => ({ _id: faq._id, order: faq.order })),
      });
    } catch (err) {
      console.error('FAQ sıralama hatası:', err);
      // Revert on error
      fetchFaqs();
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sık Sorulan Sorular</h1>
          <p className="text-gray-500 text-sm mt-1">
            Toplam {faqs.length} soru
          </p>
        </div>
        <button
          onClick={() => {
            setEditingFaq(null);
            setFormData({ question: '', answer: '' });
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] transition-colors"
        >
          <Plus size={20} />
          <span>Yeni Soru</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-sm text-sm border border-red-100">
          <AlertCircle size={18} />
          {error}
          <button onClick={() => setError(null)} className="ml-auto">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-sm border border-gray-200 p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Soru ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* FAQ List */}
      {filteredFaqs.length > 0 ? (
        <div className="bg-white rounded-sm border border-gray-200 divide-y divide-gray-100">
          {filteredFaqs.map((faq, index) => (
            <div key={faq._id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveItem(faq._id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    onClick={() => moveItem(faq._id, 'down')}
                    disabled={index === filteredFaqs.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
                
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => setExpandedId(expandedId === faq._id ? null : faq._id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800">{faq.question}</h3>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform ${
                          expandedId === faq._id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                  {expandedId === faq._id && (
                    <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(faq)}
                    className="p-2 text-gray-400 hover:text-[#144793] hover:bg-gray-100 rounded-sm"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(faq._id)}
                    disabled={deletingId === faq._id}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm disabled:opacity-50"
                  >
                    {deletingId === faq._id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-sm border border-gray-200">
          <p className="text-gray-500">
            {searchQuery ? 'Sonuç bulunamadı' : 'Henüz soru eklenmemiş'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 text-[#144793] hover:underline text-sm"
            >
              İlk soruyu ekleyin
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingFaq ? 'Soruyu Düzenle' : 'Yeni Soru Ekle'}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Soru</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  placeholder="Soru metnini girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cevap</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none resize-none"
                  placeholder="Cevap metnini girin"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.question || !formData.answer || isSaving}
                className="px-4 py-2 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50 inline-flex items-center gap-2"
              >
                {isSaving && <Loader2 size={16} className="animate-spin" />}
                {editingFaq ? 'Güncelle' : 'Ekle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

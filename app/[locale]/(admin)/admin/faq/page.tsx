'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// TODO: API'den FAQ verilerini çek
const mockFaqs = [
  { id: '1', question: 'Glokom tedavisi ne kadar sürer?', answer: 'Glokom tedavisi, hastalığın türüne ve evresine bağlı olarak değişir. Çoğu durumda, glokom ömür boyu yönetilmesi gereken kronik bir hastalıktır.', order: 1 },
  { id: '2', question: 'Katarakt ameliyatı ağrılı mıdır?', answer: 'Katarakt ameliyatı lokal anestezi altında yapılır ve genellikle ağrısızdır. Ameliyat sırasında hafif bir basınç hissedebilirsiniz.', order: 2 },
  { id: '3', question: 'Göz kontrolü ne sıklıkla yapılmalıdır?', answer: '40 yaş altı bireyler için 2-3 yılda bir, 40-65 yaş arası için 1-2 yılda bir, 65 yaş üstü için yılda bir göz kontrolü önerilir.', order: 3 },
  { id: '4', question: 'Lazer tedavisi kimlere uygulanabilir?', answer: 'Lazer tedavisi, miyop, hipermetrop ve astigmat gibi kırma kusurları olan hastalara uygulanabilir. Ancak her hasta lazer tedavisine uygun değildir.', order: 4 },
];

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState(mockFaqs);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<typeof mockFaqs[0] | null>(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });

  const filteredFaqs = faqs
    .filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.order - b.order);

  const handleDelete = async (id: string) => {
    if (confirm('Bu soruyu silmek istediğinizden emin misiniz?')) {
      // TODO: API'ye silme isteği gönder
      setFaqs(faqs.filter((faq) => faq.id !== id));
    }
  };

  const handleSave = async () => {
    if (!formData.question || !formData.answer) return;

    if (editingFaq) {
      // TODO: API'ye güncelleme isteği gönder
      setFaqs(faqs.map((faq) =>
        faq.id === editingFaq.id
          ? { ...faq, question: formData.question, answer: formData.answer }
          : faq
      ));
    } else {
      // TODO: API'ye ekleme isteği gönder
      const newFaq = {
        id: Date.now().toString(),
        question: formData.question,
        answer: formData.answer,
        order: faqs.length + 1,
      };
      setFaqs([...faqs, newFaq]);
    }

    setShowAddModal(false);
    setEditingFaq(null);
    setFormData({ question: '', answer: '' });
  };

  const openEditModal = (faq: typeof mockFaqs[0]) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setShowAddModal(true);
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const index = faqs.findIndex((faq) => faq.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === faqs.length - 1)
    ) {
      return;
    }

    const newFaqs = [...faqs];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap orders
    const tempOrder = newFaqs[index].order;
    newFaqs[index].order = newFaqs[swapIndex].order;
    newFaqs[swapIndex].order = tempOrder;

    setFaqs(newFaqs);

    // TODO: API'ye sıralama güncellemesi gönder
  };

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
      <div className="bg-white rounded-sm border border-gray-200 divide-y divide-gray-100">
        {filteredFaqs.map((faq, index) => (
          <div key={faq.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveItem(faq.id, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={() => moveItem(faq.id, 'down')}
                  disabled={index === filteredFaqs.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
              
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">{faq.question}</h3>
                    <ChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform ${
                        expandedId === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {expandedId === faq.id && (
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
                  onClick={() => handleDelete(faq.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-sm border border-gray-200">
          <p className="text-gray-500">Sonuç bulunamadı</p>
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
                onClick={() => {
                  setShowAddModal(false);
                  setEditingFaq(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-sm"
              >
                <span className="sr-only">Kapat</span>
                ✕
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
                onClick={() => {
                  setShowAddModal(false);
                  setEditingFaq(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.question || !formData.answer}
                className="px-4 py-2 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50"
              >
                {editingFaq ? 'Güncelle' : 'Ekle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


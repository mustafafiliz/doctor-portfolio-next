'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Trash2,
  Mail,
  MailOpen,
  Reply,
  Eye,
  X,
  Loader2,
  AlertCircle,
  Phone,
  Calendar,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { contactApi } from '@/lib/api';
import type { ContactMessage } from '@/lib/types';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMessages();
  }, [page]);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await contactApi.list({ page, limit: 20 });
      setMessages(data.data || []);
      setUnreadCount(data.unreadCount || 0);
      setTotalPages(Math.ceil((data.total || 0) / 20));
    } catch (err) {
      setError('Mesajlar yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'unread' && !msg.isRead) ||
      (filterStatus === 'read' && msg.isRead);
    
    return matchesSearch && matchesFilter;
  });

  const handleView = async (message: ContactMessage) => {
    setSelectedMessage(message);
    
    // Mark as read if not already
    if (!message.isRead) {
      try {
        await contactApi.markAsRead(message._id);
        setMessages(messages.map((m) => 
          m._id === message._id ? { ...m, isRead: true } : m
        ));
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        // Hata durumunda sessizce devam et
      }
    }
  };

  const handleMarkAsReplied = async (id: string) => {
    try {
      await contactApi.markAsReplied(id);
      setMessages(messages.map((m) => 
        m._id === id ? { ...m, isReplied: true } : m
      ));
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, isReplied: true });
      }
    } catch (err) {
      // Hata durumunda sessizce devam et
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      return;
    }

    setDeletingId(id);
    try {
      await contactApi.delete(id);
      setMessages(messages.filter((m) => m._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      setError('Mesaj silinirken bir hata oluştu');
    } finally {
      setDeletingId(null);
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
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Mesajlar</h1>
        <p className="text-gray-500 text-sm mt-1">
          {unreadCount > 0 ? `${unreadCount} okunmamış mesaj` : 'Tüm mesajlar okundu'}
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-sm text-sm border border-red-100">
          <AlertCircle size={18} />
          {error}
          <button onClick={() => setError(null)} className="ml-auto"><X size={16} /></button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-sm flex items-center justify-center">
              <Mail size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{messages.length}</p>
              <p className="text-sm text-gray-500">Toplam Mesaj</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-sm flex items-center justify-center">
              <Mail size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{unreadCount}</p>
              <p className="text-sm text-gray-500">Okunmamış</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center">
              <Reply size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {messages.filter((m) => m.isReplied).length}
              </p>
              <p className="text-sm text-gray-500">Yanıtlanan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Mesajlarda ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
            />
          </div>
          <Select
            value={filterStatus}
            onValueChange={(value) => setFilterStatus(value as typeof filterStatus)}
          >
            <SelectTrigger className="w-full sm:w-[200px] h-11 border-gray-300 focus:ring-2 focus:ring-[#144793]">
              <SelectValue placeholder="Tümü" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="unread">Okunmamış</SelectItem>
              <SelectItem value="read">Okunmuş</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
        {filteredMessages.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredMessages.map((message) => (
              <div
                key={message._id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !message.isRead ? 'bg-blue-50/50' : ''
                }`}
                onClick={() => handleView(message)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    !message.isRead ? 'bg-[#144793] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {!message.isRead ? <Mail size={18} /> : <MailOpen size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`font-medium truncate ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.name}
                      </h3>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{message.email}</p>
                    <p className="text-sm text-gray-600 truncate mt-1">{message.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {message.isReplied && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-sm">
                          <Reply size={12} /> Yanıtlandı
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleDelete(message._id)}
                      disabled={deletingId === message._id}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm disabled:opacity-50"
                    >
                      {deletingId === message._id ? (
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
          <div className="text-center py-12">
            <Mail size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Mesaj bulunamadı</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border border-gray-300 rounded-sm disabled:opacity-50 hover:bg-gray-50"
          >
            Önceki
          </button>
          <span className="text-sm text-gray-600">
            Sayfa {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-sm disabled:opacity-50 hover:bg-gray-50"
          >
            Sonraki
          </button>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-800">Mesaj Detayı</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#144793] text-white rounded-full flex items-center justify-center text-lg font-medium">
                  {selectedMessage.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{selectedMessage.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Mail size={14} />
                      {selectedMessage.email}
                    </span>
                    {selectedMessage.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={14} />
                        {selectedMessage.phone}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                    <Calendar size={14} />
                    {new Date(selectedMessage.createdAt).toLocaleString('tr-TR')}
                  </div>
                </div>
              </div>

              {selectedMessage.subject && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Konu</label>
                  <p className="text-gray-800 mt-1">{selectedMessage.subject}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Mesaj</label>
                <p className="text-gray-800 mt-1 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: İletişim Formu`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] transition-colors"
                >
                  <Reply size={18} />
                  E-posta Gönder
                </a>
                {!selectedMessage.isReplied && (
                  <button
                    onClick={() => handleMarkAsReplied(selectedMessage._id)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors"
                  >
                    Yanıtlandı Olarak İşaretle
                  </button>
                )}
                {selectedMessage.phone && (
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors"
                  >
                    <Phone size={18} />
                    Ara
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}







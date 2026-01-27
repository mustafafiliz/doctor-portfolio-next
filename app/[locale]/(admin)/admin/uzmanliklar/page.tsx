"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  FolderOpen,
  Loader2,
  AlertCircle,
  X,
  GripVertical,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { specialtyApi } from "@/lib/api";
import type { Specialty, SpecialtyCategory } from "@/lib/types";

interface SortableSpecialtyRowProps {
  specialty: Specialty;
  currentLocale: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
}

function SortableSpecialtyRow({
  specialty,
  currentLocale,
  onEdit,
  onDelete,
  deletingId,
}: SortableSpecialtyRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: specialty._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="hover:bg-gray-50"
    >
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="p-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing touch-none"
            aria-label="Sürükle"
          >
            <GripVertical size={18} />
          </button>
          <div className="w-12 h-12 bg-gray-100 rounded-sm overflow-hidden shrink-0">
            {specialty.image ? (
              <Image
                src={specialty.image}
                alt={specialty.title}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <FolderOpen size={20} />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <Link
              href={`/${currentLocale}/admin/uzmanliklar/${specialty.slug}`}
              className="font-medium text-gray-800 hover:text-[#144793] block truncate"
            >
              {specialty.title}
            </Link>
            <p className="text-sm text-gray-500 truncate max-w-xs">
              {specialty.description}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/${currentLocale}/${specialty.slug}`}
            target="_blank"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-sm"
            title="Görüntüle"
          >
            <Eye size={18} />
          </Link>
          <Link
            href={`/${currentLocale}/admin/uzmanliklar/${specialty.slug}`}
            className="p-2 text-gray-400 hover:text-[#144793] hover:bg-gray-100 rounded-sm"
            title="Düzenle"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={() => onDelete(specialty._id)}
            disabled={deletingId === specialty._id}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm disabled:opacity-50"
            title="Sil"
          >
            {deletingId === specialty._id ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function AdminSpecialtiesPage() {
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "tr";

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [categories, setCategories] = useState<SpecialtyCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchData();
  }, [page, categoryFilter]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [specialtiesData, categoriesData] = await Promise.all([
        specialtyApi.list({
          page,
          limit: 20,
          categoryId: categoryFilter !== "all" ? categoryFilter : undefined,
        }),
        specialtyApi.listCategories(),
      ]);

      setSpecialties(specialtiesData.data || []);
      setTotalPages(specialtiesData.totalPages || 1);
      setCategories(categoriesData || []);
    } catch (err) {
      setError("Veriler yüklenirken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSpecialties = specialties
    .filter((specialty) => {
      const matchesSearch = specialty.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleDragEnd = async (event: DragEndEvent) => {
    if (searchQuery) return; // Arama yaparken sıralama devre dışı

    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const sortedSpecialties = [...specialties].sort(
      (a, b) => (a.order || 0) - (b.order || 0)
    );
    const oldIndex = sortedSpecialties.findIndex(
      (s) => s._id === active.id
    );
    const newIndex = sortedSpecialties.findIndex(
      (s) => s._id === over.id
    );

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newSpecialties = arrayMove(sortedSpecialties, oldIndex, newIndex);

    // Optimistic update
    setSpecialties(newSpecialties);

    // Prepare API payload with normalized orders
    const offset = (page - 1) * 20;
    const updatedSpecialties = newSpecialties.map((item, idx) => ({
      ...item,
      order: offset + idx,
    }));

    try {
      // Her bir uzmanlığı tek tek update ile güncelle
      await Promise.all(
        updatedSpecialties.map((item) =>
          specialtyApi.updateJson(item._id, {
            order: item.order,
          })
        )
      );

      // Update local state orders to match
      setSpecialties(updatedSpecialties);
    } catch (err) {
      setError("Sıralama güncellenirken bir hata oluştu");
      fetchData(); // Revert
    }
  };

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return "-";
    const category = categories.find((c) => c._id === categoryId);
    return category?.title || category?.name || "-";
  };

  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Bu uzmanlığı silmek istediğinizden emin misiniz?")) {
      return;
    }

    setDeletingId(id);
    try {
      await specialtyApi.delete(id);
      setSpecialties(specialties.filter((s) => s._id !== id));
    } catch (err) {
      setError("Uzmanlık silinirken bir hata oluştu");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (
      !confirm(
        "Bu kategoriyi silmek istediğinizden emin misiniz? Kategoriye ait uzmanlıklar silinmeyecektir.",
      )
    ) {
      return;
    }

    setDeletingCategoryId(id);
    try {
      await specialtyApi.deleteCategory(id);
      setCategories(categories.filter((c) => c._id !== id));
      if (categoryFilter === id) {
        setCategoryFilter("all");
      }
    } catch (err: any) {
      // API'den gelen mesajı parse et ve Türkçe'ye çevir
      const errorMessage = err?.message || "";
      const match = errorMessage.match(
        /Cannot delete category with (\d+) specialties/i,
      );
      if (match && match[1]) {
        const count = match[1];
        setError(
          `Bu kategoride ${count} uzmanlık bulunmaktadır. Lütfen önce uzmanlıkları silin.`,
        );
      } else {
        setError("Kategori silinirken bir hata oluştu");
      }
    } finally {
      setDeletingCategoryId(null);
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
          <h1 className="text-2xl font-bold text-gray-800">
            Uzmanlık ve Uzmanlık Yazıları
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Toplam {specialties.length} uzmanlık yazısı bulunmaktadır.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/${currentLocale}/admin/uzmanliklar/kategori/yeni`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-600 text-white rounded-sm hover:bg-gray-700 transition-colors"
          >
            <Plus size={20} />
            <span>Yeni Uzmanlık</span>
          </Link>
          <Link
            href={`/${currentLocale}/admin/uzmanliklar/yeni`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] transition-colors"
          >
            <Plus size={20} />
            <span>Yeni Uzmanlık Yazısı</span>
          </Link>
        </div>
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

      {/* Categories Overview */}
      {categories.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className={`relative group p-4 rounded-sm border transition-all ${categoryFilter === category._id
                  ? "border-[#144793] bg-[#144793]/5"
                  : "border-gray-200 bg-white hover:border-[#144793]"
                }`}
            >
              <button
                onClick={() => {
                  setCategoryFilter(
                    categoryFilter === category._id ? "all" : category._id,
                  );
                  setPage(1);
                }}
                className="w-full text-left"
              >
                <div className="text-2xl font-bold text-[#144793]">
                  {category.specialtyCount || 0}
                </div>
                <div className="text-xs text-gray-600 mt-1 truncate">
                  {category.name || category.title}
                </div>
              </button>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/${currentLocale}/admin/uzmanliklar/kategori/${category._id}`}
                  className="p-1 text-gray-400 hover:text-[#144793] hover:bg-gray-100 rounded-sm"
                  title="Düzenle"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit size={14} />
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(category._id);
                  }}
                  disabled={deletingCategoryId === category._id}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm disabled:opacity-50"
                  title="Sil"
                >
                  {deletingCategoryId === category._id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Uzmanlık ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
            />
          </div>
          <Select
            value={categoryFilter}
            onValueChange={(value) => {
              setCategoryFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[200px] h-11 border-gray-300 focus:ring-2 focus:ring-[#144793]">
              <SelectValue placeholder="Tüm Kategoriler" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.title || category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Specialties List */}
      <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredSpecialties.map((s) => s._id)}
              strategy={verticalListSortingStrategy}
            >
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                      Uzmanlık Yazısı
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSpecialties.map((specialty) => (
                    <SortableSpecialtyRow
                      key={specialty._id}
                      specialty={specialty}
                      currentLocale={currentLocale}
                      onEdit={(id) => {
                        // Edit handled by Link
                      }}
                      onDelete={handleDelete}
                      deletingId={deletingId}
                    />
                  ))}
                </tbody>
              </table>
            </SortableContext>
          </DndContext>
        </div>

        {filteredSpecialties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Sonuç bulunamadı</p>
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
    </div>
  );
}

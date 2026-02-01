"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/Container";
import {
  GraduationCap,
  ExternalLink,
  FileText,
  BookOpen,
  Users,
  Award,
  Presentation,
  Calendar,
} from "lucide-react";
import { allPublications, type Publication } from "@/data/publications";

type CategoryType =
  | "international-articles"
  | "national-articles"
  | "international-conferences"
  | "national-conferences"
  | "panels"
  | "books"
  | "editorships"
  | "memberships"
  | "other-meetings";

interface Category {
  id: CategoryType;
  title: string;
  subtitle?: string;
  count: number;
  icon: any;
}

export default function MakalelerPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    "international-articles",
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Kategoriler
  const categories: Category[] = [
    {
      id: "international-articles",
      title: "Uluslararası Hakemli Dergilerde Yayımlanan Makaleler",
      count: 84,
      icon: FileText,
    },
    {
      id: "national-articles",
      title: "Ulusal Hakemli Dergilerde Yayımlanan Makaleler",
      count: 75,
      icon: FileText,
    },
    {
      id: "international-conferences",
      title: "Uluslararası Bilimsel Toplantılarda Sunulan ve Toplantı Kitabında Basılı Yer Alan Bildiriler",
      count: 47,
      icon: Presentation,
    },
    {
      id: "national-conferences",
      title: "Ulusal Bilimsel Toplantılarda Sunulan ve Toplantı Kitabında Basılı Yer Alan Bildiriler",
      count: 82,
      icon: Presentation,
    },
    {
      id: "panels",
      title: "Bilimsel Toplantılarda Sunulan Panel ve Kurs Konuşmaları",
      count: 52,
      icon: Award,
    },
    {
      id: "books",
      title: "Yazım Ekibinde Yer Aldığı Kitaplar",
      count: 11,
      icon: BookOpen,
    },
    {
      id: "editorships",
      title: "Editör Yardımcılığı Yaptığım Dergiler",
      count: 1,
      icon: BookOpen,
    },
    {
      id: "memberships",
      title: "Bilimsel Kuruluşlara Üyelikler",
      count: 8,
      icon: Users,
    },
    {
      id: "other-meetings",
      title: "Katıldığım Diğer Uluslararası Toplantılar",
      count: 13,
      icon: Calendar,
    },
  ];

  // Yıllara göre gruplandırma (sadece makaleler için)
  const publicationsByYear = useMemo(() => {
    const grouped: Record<number, Publication[]> = {};
    allPublications.forEach((pub) => {
      if (!grouped[pub.year]) {
        grouped[pub.year] = [];
      }
      grouped[pub.year].push(pub);
    });
    return grouped;
  }, []);

  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const statsByYear = useMemo(() => {
    const stats: Record<number, number> = {};
    allPublications.forEach((pub) => {
      stats[pub.year] = (stats[pub.year] || 0) + 1;
    });
    return stats;
  }, []);

  // Ulusal makaleler (D1-D75)
  const nationalArticles: Publication[] = [
    { id: 'D1', year: 1998, title: 'Yırtıklı retina dekolmanı hastalarının klinik özellikleri ve tedavi sonuçları', authors: 'Eldem B, İlhan B, Elgin U, Saraçbaşı O', journal: 'Retina-Vitreus', volume: '6', pages: '22-31', type: 'national', category: 'D' },
    { id: 'D2', year: 2000, title: 'Uzun süreli beta blokör kullanan glokomlu hastalarda %1\'lik aproklonidinin etkisi', authors: 'Berker N, Batman A, Elgin U, Zilelioğlu O', journal: 'Medical Network Oftalmoloji', volume: '7', pages: '352-354', type: 'national', category: 'D' },
    { id: 'D3', year: 2001, title: 'Üveitte sekonder glokom insidansı', authors: 'Batman A, Elgin U, Berker N, Gürsel R, Zilelioğlu O', journal: 'Türk Oftalmoloji Gazetesi', volume: '31', pages: '670-672', type: 'national', category: 'D' },
    { id: 'D4', year: 2002, title: 'Çocukluk çağında sekonder arka kamara lensi implantasyonunun uzun dönem sonuçları', authors: 'Elgin U, Mutluay A, Çankaya B', journal: 'Türk Oftalmoloji Gazetesi', volume: '32', pages: '687-691', type: 'national', category: 'D' },
    { id: 'D5', year: 2002, title: 'Oküler hipertansiyonlu olgularda betaksolol kullanımının, glokomatöz görme alanı defektlerini önlemedeki etkisi', authors: 'Elgin U, İlhan B, Batman A, Gürsel R, Çankaya B, Zilelioğlu O', journal: 'Medical Network Oftalmoloji', volume: '9', pages: '24-25', type: 'national', category: 'D' },
    { id: 'D6', year: 2003, title: 'Primer açık açılı glokomda, akşam veya sabah tek doz uygulanan latanoprostun göz içi basıncına etkisisin, timolol maleat ile karşılaştırılması', authors: 'Elgin U, İlhan B, Batman A, Gürsel R, Çankaya B, Zilelioğlu O', journal: 'Türk Oftalmoloji Gazetesi', volume: '33', pages: '260-264', type: 'national', category: 'D' },
    { id: 'D7', year: 2004, title: 'Travmatik glokom olgularımız', authors: 'Elgin U, Batman A, Çankaya B', journal: 'Medical Network Oftalmoloji', volume: '11', pages: '214-216', type: 'national', category: 'D' },
    { id: 'D8', year: 2004, title: 'Distiroid orbitopatide klinik aktivite ve göz içi basıncı değerlerinin ilişkisi', authors: 'Alper M, Acaroğlu G, Özdamar Y, Elgin U, Zilelioğlu O, Tırhış H', journal: 'Medical Network Oftalmoloji', volume: '11', pages: '217-221', type: 'national', category: 'D' },
    { id: 'D9', year: 2004, title: 'Normotensif glokomlu olgularda santral korneal kalınlık ölçümleri', authors: 'Elgin U, Acaroğlu G, İleri D, Can Ç, Polat S', journal: 'Medical Network Oftalmoloji', volume: '11', pages: '273-274', type: 'national', category: 'D' },
    { id: 'D10', year: 2005, title: 'Erken dönem primer açık açılı glokom olgularında stereopsis', authors: 'Elgin U, İlhan B, Tırhış H, Batman A, Mutluay A', journal: 'Türkiye Klinikleri Oftalmoloji', volume: '14', pages: '36-39', type: 'national', category: 'D' },
    { id: 'D11', year: 2005, title: 'Terminal glokom olgularında, Ex-Press implantın göz içi basıncını düşürmedeki etkisi', authors: 'Elgin U, Batman A, İlhan B, Çankaya B', journal: 'Medical Network Oftalmoloji', volume: '12', pages: '292-294', type: 'national', category: 'D' },
    { id: 'D12', year: 2005, title: 'Pigmenter glokom olgularımız', authors: 'Elgin U, Batman A, Şimşek T', journal: 'Medical Network Oftalmoloji', volume: '12', pages: '208-210', type: 'national', category: 'D' },
    { id: 'D13', year: 2005, title: 'Açık açılı ve dar açılı glokom olgularında, aksiyel uzunluk ve kırma kusuru değerlerinin karşılaştırılması', authors: 'Elgin U, Batman A, Zilelioğlu O', journal: 'Türkiye Klinikleri Oftalmoloji', volume: '14', pages: '167-172', type: 'national', category: 'D' },
    { id: 'D14', year: 2005, title: 'Timolol maleat-dorzolamid sabit kombinasyonu kullanan primer açık açılı glokomlu olgularda 0.2% brimonidin ve 0.005% latanoprost\'un aditif etkinliğinin karşılaştırılması', authors: 'Şimşek T, Tırhış H, Elgin U, Batman A, Alper M, Zilelioğlu O', journal: 'Türk Oftalmoloji Gazetesi', volume: '35', pages: '412-419', type: 'national', category: 'D' },
    { id: 'D15', year: 2006, title: 'Topikal veya oral kullanılan non steroid antiinflamatuar ilaçların latanoprostun göziçi basıncını düşürmesi üzerine olan etkileri', authors: 'Şimşek T, Elgin U, Batman A, Zilelioğlu O', journal: 'Türk Oftalmoloji Gazetesi', volume: '3', pages: '264-268', type: 'national', category: 'D' },
    { id: 'D16', year: 2006, title: 'Primer açık açılı glokom tedavisinde bimatoprost ve latanoprostun aditif etkileri', authors: 'Şimsek T, Batman A, Elgin U, Zilelioğlu O', journal: 'Glokom-Katarakt', volume: '1', pages: '189-192', type: 'national', category: 'D' },
    { id: 'D17', year: 2006, title: 'Kronik üveitlerde, arka subtenon steroid enjeksiyonunun göz içi basıncına etkisi', authors: 'Elgin U, Berker N, Özdal P, Şimsek T, Batman A, Soykan E', journal: 'Glokom-Katarakt', volume: '1', pages: '275-278', type: 'national', category: 'D' },
    { id: 'D18', year: 2006, title: 'Trabekülektomi sonrası gelişen bleb yetmezlikleride konjonktiva allı düşük doz 5-Florourasil enjeksiyonu sonuçları ve sonuca etki eden faktörlerin değerlendirilmesi', authors: 'Şimsek T, Özdamar Y, Batman A, Elgin U, Karakaya J, Zilelioğlu O', journal: 'Glokom-Katarakt', volume: '1', pages: '261-266', type: 'national', category: 'D' },
    { id: 'D19', year: 2006, title: 'Primer açık açılı glokom olgularında sistemik damar hastalıkları görülme sıklığının, normal bireylerle karşılaştırılması', authors: 'Elgin U, Batman A, Zilelioğlu O', journal: 'Türkiye Klinikleri Oftalmoloji', volume: '15', pages: '40-44', type: 'national', category: 'D' },
    { id: 'D20', year: 2006, title: 'Trabekülektominin, açık açılı glokom olgularında katarakt gelişimine etkisi', authors: 'Elgin U, Batman A, Zilelioğlu O', journal: 'Türkiye Klinikleri Oftalmoloji', volume: '15', pages: '35-39', type: 'national', category: 'D' },
    { id: 'D21', year: 2006, title: 'İntravitreal triamsinolon asetonidin, göz içi basıncına olan etkisi', authors: 'Şimşek T, Soykan E, Elgin U, Tırhış T, Özkan SS, Batman A, Zilelioğlu O', journal: 'Türk Oftalmoloji Gazetesi', volume: '36', pages: '411-415', type: 'national', category: 'D' },
    { id: 'D22', year: 2007, title: 'Herpetik göz hastalığına ikincil glokomlu olguların klinik bulguları ve tedavi sonuçları', authors: 'Şimşek T, Elgin U, Batman A, Eranıl S, Polat S, Zilelioğlu O', journal: 'Medical Network Oftalmoloji', volume: '14', pages: '28-31', type: 'national', category: 'D' },
    { id: 'D23', year: 2007, title: 'Normal olgularda, sigara içiminin göz içi basıncına etkisi', authors: 'Çankaya AB, Elgin U, Şimsek T, Batman A', journal: 'Glokom-Katarakt', volume: '2', pages: '27-30', type: 'national', category: 'D' },
    { id: 'D24', year: 2007, title: 'Fakoemülsifikasyon cerrahisi sonrası, psödoeksfoliasyon sendromlu olguların merkezi kornea kalınlıklarının, normal bireylerle karşılaştırılması', authors: 'Çankaya B, Elgin U, Zilelioğlu O', journal: 'Glokom-Katarakt', volume: '2', pages: '157-162', type: 'national', category: 'D' },
    { id: 'D25', year: 2007, title: 'Primer açık açılı glokom olgularında, latanoprostun oküler hipotansif etkisini değiştirebilecek klinik özelliklerin incelenmesi', authors: 'Çankaya B, Elgin U, Şimşek T, Batman A, İlhan B', journal: 'Glokom-Katarakt', volume: '2', pages: '93-98', type: 'national', category: 'D' },
    { id: 'D26', year: 2008, title: 'Psödoeksfoliatif glokom, psödoeksfoliatif sendrom ve normal olgularda, aköz humor endotelin-1 düzeylerinin kıyaslanması', authors: 'Elgin U, Biçer T, Akın O, Kabataş E, İlhan B, Şimşek T, Çankaya B, Batman A', journal: 'Glokom-Katarakt', volume: '3', pages: '43-46', type: 'national', category: 'D' },
    { id: 'D27', year: 2008, title: 'Primer açık açılı glokom olgularında, latanoprost-timolol maleat sabit kombinasyonunun etkinliğinin retrospektif olarak değerlendirilmesi', authors: 'Çankaya B, Elgin U, Şimşek T, Batman A', journal: 'Glokom-Katarakt', volume: '3', pages: '77-82', type: 'national', category: 'D' },
    { id: 'D28', year: 2008, title: 'Ciddi göz yaralanmalarındaki demografik özelliklerin ve risk faktörlerinin araştırılması', authors: 'Çankaya B, Taşdemir G, Taşdemir S, Elgin U, Zilelioğlu O', journal: 'Medical Network Oftalmoloji', volume: '15', pages: '125-130', type: 'national', category: 'D' },
    { id: 'D29', year: 2008, title: 'Diyabetik Retinopatide Heidelberg Retinal Tomografi ile Optik Disk Analizi', authors: 'Berker N, Özdamar Y, Çankaya AB, Batman C, Elgin U, Özkan SS, Soykan E, Karakaya J', journal: 'J of Retina-Vitreus', volume: '16', pages: '107-111', type: 'national', category: 'D' },
    { id: 'D30', year: 2009, title: 'Vogt-Koyanagi-Harada sendromlu olgularımızda klinik özellikler ve prognoz', authors: 'Çıtırık M, Songur MS, Berker N, Elgin U, Özkan SS, Zilelioğlu O', journal: 'Türk Oftalmoloji Gazetesi', volume: '39', pages: '70-75', type: 'national', category: 'D' },
    { id: 'D31', year: 2009, title: 'Glokom ve oküler hipertansiyonda merkezi kornea kalınlığı ve merkezi kornea kalınlığını etkileyen faktörler', authors: 'Şen E, Yazıcı A, Altınok A, Aksakal FN, Tuna T, Elgin U, Köklü G', journal: 'Glokom-Katarakt', volume: '4', pages: '79-83', type: 'national', category: 'D' },
    { id: 'D32', year: 2009, title: 'Glokom tedavisinde prostaglandin anologlarının merkezi kornea kalınlığına etkileri', authors: 'Yüksekkaya P, Şen E, Aksakal N, Tuna T, Özal H, Elgin U, Öztürk F', journal: 'Glokom-Katarakt', volume: '4', pages: '162-167', type: 'national', category: 'D' },
    { id: 'D33', year: 2009, title: 'Tiroid orbitopatiye ikincil glokomun görülme sıklığı ve risk faktörleri', authors: 'Şimşek T, Acaroğlu G, Çıtırık M, Elgin U, Çankaya B, Kabataş N', journal: 'Türk Oftalmoloji Gazetesi', volume: '39', pages: '386-391', type: 'national', category: 'D' },
    { id: 'D34', year: 2010, title: 'Behçet ve Behçet olmayan üveitlerin etiyolojik ve demografik özellikleri', authors: 'Özdamar Y, Berker N, Elgin U, Ekmen R, Özkan SS, Karakaya J', journal: 'Turkiye Klinikleri J Ophthalmol', volume: '19', pages: '94-98', type: 'national', category: 'D' },
    { id: 'D35', year: 2010, title: 'Aile öyküsü olan ve olmayan glokomlu olguların, optik disk topografilerinin karşılaştırılması', authors: 'Şen E, Kara C, Elgin U, Öncül H, Özal H, Öztürk F', journal: 'Türk Oftalmoloji Gazetesi', volume: '40', pages: '205-208', type: 'national', category: 'D' },
    { id: 'D36', year: 2011, title: 'Oküler cerrahiler için antibiyotik profilaksisi', authors: 'Elgin U', journal: 'Türk Oftalmoloji Gazetesi', volume: '41', pages: '330-338', type: 'national', category: 'D' },
    { id: 'D37', year: 2011, title: 'Romatoid artrit olgularında optik sinir başı topografi bulgularının, normal bireylerle kıyaslanması', authors: 'Elgin U, Şen E, Dülgeroğlu D, Kara C, Aksoy E, Öztürk F', journal: 'Glokom-Katarakt', volume: '6', pages: '119-123', type: 'national', category: 'D' },
    { id: 'D38', year: 2012, title: 'Primer açık açılı glokom ve psödoeksfoliatif glokomda, mitomisin C\'li trabekülektominin maküler kalınlık üzerine olan etkisinin kıyaslanması', authors: 'Elgin U, Şen E, Tırhış H, Serdar K, Öztürk F', journal: 'Türk Oftalmoloji Gazetesi', volume: '42', pages: '11-20', type: 'national', category: 'D' },
    { id: 'D39', year: 2011, title: 'Subfoveal sıvı perflorokarbon birikimi', authors: 'Teke MY, Özdal P, U. Elgin, Öztürk F', journal: 'Retina Vitreus', volume: '19', pages: '38-40', type: 'national', category: 'D' },
    { id: 'D40', year: 2011, title: 'Glokomda nöron koruyucu tedavi', authors: 'Elgin U', journal: 'Glokom-Katarakt', volume: '6', pages: '90-96', type: 'national', category: 'D' },
    { id: 'D41', year: 2011, title: 'An 1.5 Centimeters-long Unknown Subconjunctival Grass Inflorescence Misdiagnosed As Relapsing Conjunctivitis For 1 Year', authors: 'Sen E, Elgin U, Koç F, Öztürk F', journal: 'Turk J Pediatr', volume: '53', pages: '699-701', type: 'national', category: 'D' },
    { id: 'D42', year: 2012, title: 'Primer açık açılı glokom ve psödoeksfoliatif glokomda, mitomisin C\'li trabekülektominin korneal histerezis üzerine olan etkisinin kıyaslanması', authors: 'Elgin U, Şen E, Hocaoğlu M, Ersoy M, Öztürk F', journal: 'Türk Oftalmoloji Gazetesi', volume: '6', pages: '429-433', type: 'national', category: 'D' },
    { id: 'D43', year: 2012, title: 'Üveite sekonder göz içi basınç yükselmeleri', authors: 'Şen E, Özdal P, Elgin U, Öztürk F', journal: 'Glokom-Katarakt', volume: '7', pages: '113-117', type: 'national', category: 'D' },
    { id: 'D44', year: 2012, title: 'Akut santral seröz koryoretinopati olgularında, vasküler endotelyal büyüme faktörü inhibitör tedavisinin etkinliği', authors: 'Teke MY, Şen E, U. Elgin, Özdal P, Öztürk F', journal: 'Retina Vitreus', volume: '20', pages: '111-116', type: 'national', category: 'D' },
    { id: 'D45', year: 2012, title: 'Epiretinal membran cerrahisi uygulanan hastalarda görsel prognozu etkileyen faktörler', authors: 'Teke MY, Şen E, U. Elgin, Özdal P, Öztürk F', journal: 'Retina Vitreus', volume: '20', pages: '99-104', type: 'national', category: 'D' },
    { id: 'D46', year: 2012, title: 'Acute central retinal artery occlusion associated with intraocular silicone oil tamponade', authors: 'Teke MY, Elgin U, Ozdal P, Ozturk F', journal: 'Turkish Journal Ophthalmol', volume: '42', pages: '238-240', type: 'national', category: 'D' },
    { id: 'D47', year: 2012, title: 'Comparison of corneal biomechanical parameters of cases with Behçet\'s disease and normal subjects', authors: 'Elgin U, Sen E, Özdal P, Hocaoğlu M, Ersoy M, Öztürk F', journal: 'Glokom-Katarakt', volume: '3', pages: '189-193', type: 'national', category: 'D' },
    { id: 'D48', year: 2012, title: 'Oküler Enfeksiyonlarda Antibiyotik Kullanım Prensipleri: Subkonjonktival-intravitreal uygulamalar', authors: 'Elgin U', journal: 'Turkiye Klinikleri J Ophthalmol', volume: '5', pages: '120-4', type: 'national', category: 'D' },
    { id: 'D49', year: 2012, title: 'Transient cataract formation related with parsplana vitrectomy with gas tamponade', authors: 'Teke MY, Elgin U, Yüksekkaya P, Ozdal P, Şen E, Ozturk F', journal: 'Glokom-Katarakt', volume: '4', pages: '249-252', type: 'national', category: 'D' },
    { id: 'D50', year: 2012, title: 'Tek taraflı fiksasyon bozukluğu İle seyreden peripapiller stafilom olgusu', authors: 'Teke MY, Elgin U, Dilli A, Ozdal P, Ozturk F', journal: 'Türk Oftalmoloji Gazetesi', volume: '42', pages: '397-399', type: 'national', category: 'D' },
    { id: 'D51', year: 2013, title: 'Aynı iş yerinde aynı iş aletiyle meydana gelen kaza ile iki farklı olguda yabancı cisim ile göz yaralanması', authors: 'Teke MY, Çelikay O, Yüksekkaya P, Şen E, Elgin U, Öztürk F', journal: 'Retina-Vitreus', volume: '21', pages: '127-130', type: 'national', category: 'D' },
    { id: 'D52', year: 2013, title: 'Retina ve retinal pigment epitelin kombine hamartomunun klinik ve optik koherens tomografideki karakteristik özellikleri', authors: 'Teke MY, Elgin U, Yüksekkaya P, Ozdal P, Şen E, Öztürk F', journal: 'Türk oftalmoloji Dergisi', volume: '43', pages: '353-57', type: 'national', category: 'D' },
    { id: 'D53', year: 2014, title: 'Optical Coherence Tomography Findings in Retained Subfoveal Perfluorocarbon Bubbles', authors: 'Teke MY, Elgin U, Yüksekkaya P, Berker N, Ozdal P, Şen E, Öztürk F', journal: 'Retina-Vitreus', volume: '22', pages: '55-60', type: 'national', category: 'D' },
    { id: 'D54', year: 2013, title: 'Fuchs üveit sendromunda santral kornea kalınlığı', authors: 'Ozdal P, Yazıcı A, Elgin U, Öztürk F', journal: 'Türk oftalmoloji Dergisi', volume: '43', pages: '225-228', type: 'national', category: 'D' },
    { id: 'D55', year: 2014, title: 'Diabet ve glokom epidemiyolojisi', authors: 'Elgin U', journal: 'Retina-Vitreus', volume: '22 (Özel Sayı)', pages: '143-147', type: 'national', category: 'D' },
    { id: 'D56', year: 2014, title: 'Age-related changes in biomechanical parameters of the cornea and intraocular pressure in healthy Turkish population', authors: 'Şen E, Elgin U, Yüksekkaya P, Tırhış H, Aksakal NB, Teke MY, Öztürk F', journal: 'Turk J Med Sci', volume: '44(4)', pages: '687-90', type: 'national', category: 'D' },
    { id: 'D57', year: 2016, title: 'Asimetrik başlangıçlı primer açık açılı glokom ve oküler hipertansiyon olgularında her iki gözün ön segment parametrelerinin kıyaslanması', authors: 'Elgin U, Şen E, Şimşek M, Öztürk F', journal: 'Glokom-Katarakt', volume: '11', pages: '30-33', type: 'national', category: 'D' },
    { id: 'D58', year: 2016, title: 'Glokomda akılcı ilaç kullanımı: Yan etkiler ve toksisite', authors: 'Elgin U', journal: 'Glokom Katarakt Dergisi', volume: 'Özel sayı', pages: '155-161', type: 'national', category: 'D' },
    { id: 'D59', year: 2016, title: 'Primer açık açılı glokomlu olgularda santral kornea kalınlığı ile optik sinir başının topografik parametreleri arasındaki ilişkinin değerlendirilmesi', authors: 'Şimşek T, Teberik K, Elgin U', journal: 'Glokom-Katarakt', volume: '11', pages: '13-18', type: 'national', category: 'D' },
    { id: 'D60', year: 2016, title: 'Canaliculitis awareness', authors: 'Yılmaz MB, Şen E, Evren E, Elgin U, Yılmazbaş P', journal: 'Turk J Ophthalmol', volume: '46', pages: '25-29', type: 'national', category: 'D' },
    { id: 'D61', year: 2016, title: 'Early Postoperative Effects of Cataract Surgery on Anterior Segment Parameters in Primary Open-Angle Glaucoma and Pseudoexfoliation Glaucoma', authors: 'Elgin U, Şen E, Şimşek T, Tekin K, Yılmazbaş P', journal: 'Turk J Ophthalmol', volume: '46(3)', pages: '95-98', type: 'national', category: 'D' },
    { id: 'D62', year: 2016, title: 'Üveitik Glokom ve Güncel Tedavi Yaklaşımları', authors: 'Elgin U', journal: 'Glokom-Katarakt', volume: '11', pages: '209-215', type: 'national', category: 'D' },
    { id: 'D63', year: 2017, title: 'The Effects of Trabeculectomy on Anterior Segment Parameters Measured by Optical Biometry in Primary Open-angle Glaucoma and Pseudoexfoliation Glaucoma', authors: 'Elgin U, Şen E, Tokmak A, Yılmazbaş P', journal: 'Glokom-Katarakt', volume: '12', pages: '123-128', type: 'national', category: 'D' },
    { id: 'D64', year: 2017, title: 'A Case Of Foreign Body Missed By Direct Imaging And Computed Tomography', authors: 'Yılmazbaş P, Tırhış MH, Elgin KU, Keleş A, Şentürk YE', journal: 'Retina Vitreus', volume: '25', pages: '296-299', type: 'national', category: 'D' },
    { id: 'D65', year: 2019, title: 'Glokom tanı ve takibinde yapay zekâ', authors: 'Elgin U', journal: 'Glokom-Katarakt', volume: '14', pages: '59-65', type: 'national', category: 'D' },
    { id: 'D66', year: 2019, title: 'Comparison of Mitomycin C-Augmented trabeculectomy and mitomycin C-augmented Ex-Press miniature device in the management of neovascular glaucoma', authors: 'Elgin U, Şen E, Çolak S, Yılmazbaş P', journal: 'Glokom-Katarakt', volume: '14', pages: '145-149', type: 'national', category: 'D' },
    { id: 'D67', year: 2019, title: 'Retinitis pigmentoza ve primer açı kapanması glokomu: Olgu Sunumu', authors: 'Özdemir BH, Özen O, Yılmazbaş P, Elgin U', journal: 'Glokom-Katarakt', volume: '14', pages: '154-156', type: 'national', category: 'D' },
    { id: 'D68', year: 2019, title: 'Trabekülektomi cerrahisinde kullanılan antimetabolit ilaçların kornea endotel hasarına etkisinin değerlendirilmesi', authors: 'Özateş S, Şen E, Kızıltoprak H, Kılıç AO, Elgin U', journal: 'Glokom-Katarakt', volume: '14', pages: '212-216', type: 'national', category: 'D' },
    { id: 'D69', year: 2020, title: 'Short-term effects of phacoemulsification surgery on corneal endothelium in cataract cases with pseudoexfoliation syndrome', authors: 'Dursun E, Elgin U, Şen E, Cankurtaran M', journal: 'Glo-Kat', volume: '15', pages: '106-112', type: 'national', category: 'D' },
    { id: 'D70', year: 2020, title: 'The Effect of Exfoliation on Surgically Induced Astigmatism in Patients After Trabeculectomy', authors: 'Uzel MM, Elgin U, Şimşek M', journal: 'Glo-Kat', volume: '15', pages: '231-235', type: 'national', category: 'D' },
    { id: 'D71', year: 2021, title: 'Investigation of the Acute Effects of Captopril Usage on Intraocular Pressure Before Cataract Surgery', authors: 'KoçerAM, Şimşek M, Güngör A, Elgin U', journal: 'Glo-Kat', volume: '16', pages: '94-97', type: 'national', category: 'D' },
    { id: 'D72', year: 2021, title: 'Objective Evaluation of Corneal Clarity in Pigment Dispersion Syndrome and Pigmentary Glaucoma', authors: 'Elgin U, Şen E, Şimşek M, Yeşilyaprak N, Yıldırım BD', journal: 'Glo-Kat', volume: '16', pages: '138-143', type: 'national', category: 'D' },
    { id: 'D73', year: 2021, title: 'The Effect of Laser Peripheral Iridotomy on Corneal Transparency in Patients with Acute Primary Angle Closure Glaucoma', authors: 'Elgin U, Şen E, Şimşek M, Budakoğlu O, Yeşilyaprak N, Yıldırım BD', journal: 'Glo-Kat', volume: '16', pages: '138-143', type: 'national', category: 'D' },
    { id: 'D74', year: 2022, title: 'Early Refractive Effect of Cataract Surgery in Medically Controlled Glaucoma', authors: 'Sen E, Kocabas D, Elgin U, Ceylanoglu KS', journal: 'Journal of Glaucoma-Cataract', volume: '17(2)', pages: '95-100', type: 'national', category: 'D' },
    { id: 'D75', year: 2022, title: 'Comparison of Anterior Segment Parameters between Cases with Refractive Error and Emmetropia', authors: 'Gunaydin S, Sen E, Tekin K, Elgin U', journal: 'Journal of Glaucoma-Cataract', volume: '17(2)', pages: '84-89', type: 'national', category: 'D' },
  ];

  // Uluslararası konferans bildirileri (B1-B47)
  const internationalConferencePapers: Publication[] = [
    { id: 'B1', year: 2001, title: 'The effect of latanoprost applied once daily on central corneal pachymetry', authors: 'Elgin U, Polat S, Batman A, Can C, Ilhan B, Gursel R, Çankaya B', location: 'XIII Congress of the European Society of Ophthalmology, İstanbul, Turkey', type: 'conference', category: 'B' },
    { id: 'B2', year: 2003, title: 'Incidence of secondary glaucoma in Behçet\'s Disease', authors: 'Elgin U, Batman A, Berker N, Soykan E, Zilelioğlu O', location: '4th International Glaucoma Symposium, Barcelona, Spain', type: 'conference', category: 'B' },
    { id: 'B3', year: 2003, title: 'Comparison of topical latanoprost 0.005% and brimonidine 0.2% eye drops in the adjunctive treatment of patients with open angle glaucoma', authors: 'Şimşek T, Batman A, Elgin U, Alper M, Zilelioğlu O', location: '4th International Glaucoma Symposium, Barcelona, Spain', type: 'conference', category: 'B' },
    { id: 'B4', year: 2005, title: 'Clinical features and treatment results in patients with Sturge-Weber syndrome', authors: 'Batman A, Şimşek T, Elgin U, Zilelioğlu O', location: '5th International Glaucoma Symposium, Cape Town, South Africa', type: 'conference', category: 'B' },
    { id: 'B5', year: 2005, title: 'The effect of posterior subtenon injection of corticosteroids on intraocular pressure in cases with chronic uveitis', authors: 'Elgin U, Batman A, Şimşek T, Ozdal P, Berker N', location: 'World Glaucoma Congress, Vienna, Austria', type: 'conference', category: 'B' },
    { id: 'B6', year: 2005, title: 'Effect of intravitreal triamcinolone acetonide on intraocular pressure', authors: 'Şimşek T, Soykan E, Elgin U, Özkan SS, Batman A, Zilelioğlu O', location: 'World Glaucoma Congress, Vienna, Austria', type: 'conference', category: 'B' },
    { id: 'B7', year: 2005, title: 'Subconjunctival nodular lesions, glaucoma and intracranial mass in a patient with polyarteritis nodosa and familial Mediterranean fever', authors: 'Elgin U, Demiryurek D, Berker N, Ilhan B, Şimşek T, Batman A, Bayramoglu A, Tuccar E', location: '8th Congress of the European Association of Clinical Anatomy, Palermo, Italy', type: 'conference', category: 'B' },
    { id: 'B8', year: 2005, title: 'Autosomal dominant Peters\' anomaly with microcornea lacking cataract or glaucoma in a five-generational family', authors: 'Alanay Y, Berker N, Elgin U, Salancı BV, Akarsu NA, Alikasifoğlu M', location: '55th American Society of Human Genetics, Salt Lake City, USA', type: 'conference', category: 'B' },
    { id: 'B9', year: 2007, title: 'Diode laser cyclophotocoagulation in the management of refractory glaucoma associated with chronic uveitis', authors: 'Elgin U, Berker N, Batman A Şimşek T, Çankaya B, Soykan E', location: '6th International Glaucoma Symposium, Athens, Greece', type: 'conference', category: 'B' },
    { id: 'B10', year: 2007, title: 'Intraocular pressure elevation secondary to non penetrating blunt ocular trauma', authors: 'Batman A Şimşek T, Elgin U', location: '6th International Glaucoma Symposium, Athens, Greece', type: 'conference', category: 'B' },
    { id: 'B11', year: 2007, title: 'Impression cytology of the conjunctival epithelium after subconjunctival injections of 5-fluorouracil for failed filtering blebs', authors: 'Şimşek T, Fırat P, Çıtırık M, Batman A, Elgin U', location: '6th International Glaucoma Symposium, Athens, Greece', type: 'conference', category: 'B' },
    { id: 'B12', year: 2009, title: 'Medical and surgical management of secondary glaucoma associated with Sturge-Weber syndrome in juvenile cases', authors: 'Elgin U, Şimşek T, Batman A, Ozturk F', location: 'World Glaucoma Congress, Boston, USA', type: 'conference', category: 'B' },
    { id: 'B13', year: 2009, title: 'Comparison of optic disc topography before and after anti-glaucoma treatment in juvenile glaucoma', authors: 'Ozturk F, Elgin U, Sen E, Tuna T', location: 'World Glaucoma Congress, Boston, USA', type: 'conference', category: 'B' },
    { id: 'B14', year: 2009, title: 'Additive effect of brimonidine to patients with primary open-angle glaucoma taking fixed combination of timolol maleate-dorzolamide versus fixed combination of timolol maleate-latanoprost', authors: 'Şimşek T, Çankaya B, Elgin U, Orhan I, Köklü G, Altıntaş A', location: 'World Glaucoma Congress, Boston, USA', type: 'conference', category: 'B' },
    { id: 'B15', year: 2010, title: 'Histopathologic Investigation of Anterior Lens Capsule Investigation of Anterior Lens Capsule', authors: 'Ozdamar Y, Ozogul C, Elgin U, Acaroglu G, Helvacioglu F, Zilelioglu O', location: 'ARVO, The Association for Research in Vision and Ophthalmology, Florida, USA', type: 'conference', category: 'B' },
    { id: 'B16', year: 2010, title: 'Comparison of conjunctival impression cytology in primary open-angle glaucoma, ocular hypertension and normal subjects', authors: 'Elgin U, Ozturk F, Citirik M, Haksever H, Serdar K, Sen E, Üstün H, Özal H', location: '9th European Glaucoma Symposium, Madrid, Spain', type: 'conference', category: 'B' },
    { id: 'B17', year: 2010, title: 'Comparison of optic disc topography between non-glaucomatous cases with rheumatoid arthritis and normal subjects', authors: 'Ozturk F, Elgin U, Sen E, Aksoy E, Dulgeroğlu D, Aksoy O', location: '9th European Glaucoma Symposium, Madrid, Spain', type: 'conference', category: 'B' },
    { id: 'B18', year: 2010, title: 'Comparison of optic disc topography between Graves\' diseases and normal subjects', authors: 'Sen E, Berker D, Elgin U, Tütüncü Y, Özal H, Güler F, Ozturk F', location: '9th European Glaucoma Symposium, Madrid, Spain', type: 'conference', category: 'B' },
    { id: 'B19', year: 2011, title: 'Comparison of corneal biomechanical parameters of cases with Behçet\'s disease and normal subjects', authors: 'Elgin U, Sen E, Ozdal P, Hocaoglu M, Ersoy M, Ozturk F', location: 'World Glaucoma Congress, Paris, France', type: 'conference', category: 'B' },
    { id: 'B20', year: 2011, title: 'Assessing the relationship between corneal biomechanichal properties and corneal curvature, axial lenght, central corneal thickness and refractive errors in the healthy subjects', authors: 'Öztürk F, Hocaoğlu M, Şen E, Tırhış H, Özal H, Elgin U', location: 'World Glaucoma Congress, Paris, France', type: 'conference', category: 'B' },
    { id: 'B21', year: 2012, title: 'Early effects of pars plana vitrectomy combined with intravitreal gas tamponade on intraocular pressure and corneal biomechanics', authors: 'Elgin U, Teke MY, Şen E, Ozdal P, Ozturk F', location: '10th European Glaucoma Symposium, Kopenhagen, Danmark', type: 'conference', category: 'B' },
    { id: 'B22', year: 2013, title: 'The efficiency of the treatment of secondary glaucoma associated witg Sturge-Weber syndrome in children', authors: 'Elgin U, Şen E, Şimşek T, Öztürk F', location: 'Today and future glaucoma symposium, St Petersburg, Russia', type: 'conference', category: 'B' },
    { id: 'B23', year: 2013, title: 'Does every patient on medicines have glaucoma really?', authors: 'Tuna T, Elgin U, Şen E, Özal H, Öztürk F', location: 'Today and future glaucoma symposium, St Petersburg, Russia', type: 'conference', category: 'B' },
    { id: 'B24', year: 2013, title: 'Intravitreal silicone oil induced changes in corneal biomechanics', authors: 'Elgin U, Teke MY, Sen E, Özdal P, Öztürk F', location: 'World Glaucoma Congress, Vancouver, Canada', type: 'conference', category: 'B' },
    { id: 'B25', year: 2013, title: 'The Demographic and Clinical Properties of Retinal Vascular Occlusion Cases with Glaucoma', authors: 'Öztürk F, Elgin U, Yuksekkaya P, Şen E', location: 'World Glaucoma Congress, Vancouver, Canada', type: 'conference', category: 'B' },
    { id: 'B26', year: 2013, title: 'Comparison of Ahmed valve and suprachoroidal silicon tube implantation after anterior chamer injection of bevacizumab in patients with neovascular glaucoma', authors: 'Simsek T, Elgin U, Öztürk F', location: 'World Glaucoma Congress, Vancouver, Canada', type: 'conference', category: 'B' },
    { id: 'B27', year: 2013, title: 'The efficacy of brimonidine 0,2% on intraocular pressure following ND:YAG laser posterior capsulotomy', authors: 'Tuna T, Citirik M, Elgin U, Şen E, Öztürk F', location: 'World Glaucoma Congress, Vancouver, Canada', type: 'conference', category: 'B' },
    { id: 'B28', year: 2014, title: 'Comparison of the anterior segment parameters of the two eyes in cases with asymmetric primary open-angle glaucoma or ocular hypertension', authors: 'Elgin U, Şen E, Şimşek M. Öztürk F', location: 'European Glaucoma Symposium, Nice, France', type: 'conference', category: 'B' },
    { id: 'B29', year: 2014, title: 'The long-term effects of prostaglandin anologs on intraocular pressure reduction', authors: 'Sen E, Kara C, Elgin U, Yılmazbaş P', location: 'European Glaucoma Symposium, Nice, France', type: 'conference', category: 'B' },
    { id: 'B30', year: 2014, title: 'The effect of cataract surgery on anterior segment parameters measured by optical biometry in primary open-angle glaucoma and pseudoexfoliation glaucoma', authors: 'Elgin U, Şen E, Şimşek T, Tekin K, Yılmazbaş P', location: 'Congress of the European Society of Cataract and Refractive Surgery, London, England', type: 'conference', category: 'B' },
    { id: 'B31', year: 2015, title: 'The effects of prostaglandine analogs on ocular biometry parameters', authors: 'Sen E, Elgin U, Yılmazbaş P', location: 'World Glaucoma Congress, Hong Kong, China', type: 'conference', category: 'B' },
    { id: 'B32', year: 2015, title: 'The effects of trabeculectomy on anterior segment parameters measured by optical biometry in primary open-angle glaucoma and pseudoexfoliation glaucoma', authors: 'Elgin U, Sen E, Yılmazbaş P', location: 'World Glaucoma Congress, Hong Kong, China', type: 'conference', category: 'B' },
    { id: 'B33', year: 2015, title: 'The effect of cataract surgery on intraocular pressure and central corneal thickness in primary angle-closure glaucoma', authors: 'Elgin U, Sen E, Yılmazbaş P', location: 'Congress of the European Society of Cataract and Refractive Surgery, Barcelona, Spain', type: 'conference', category: 'B' },
    { id: 'B34', year: 2015, title: 'An atypical case of CMV retinitis causing central retinal artery and vein occlusion and neovascular glaucoma in an immunocompetent patient', authors: 'Ozdal P, Elgin U, Teke M, Kocak Altintas A, Ozdamar Erol Y', location: '15th Euretina Congress, Nice, France', type: 'conference', category: 'B' },
    { id: 'B35', year: 2016, title: 'Blindness due to glaucoma at the tertiary ophthalmic centers in Ankara', authors: 'Mumcuoglu T, Yarangumeli A, Karakurt A, Bayer A, Kemer ÖE, Elgin E', location: 'European Glaucoma Symposium, Prague, Czech Republic', type: 'conference', category: 'B' },
    { id: 'B36', year: 2016, title: 'Glaucoma profile at the tertiary ophthalmic centers in Ankara', authors: 'Bayer A, Elgin U, Tekeli O, Takmaz T, Eksioglu Ü, Yarangümeli A, Mumcuoglu T, Aktas Z, Güngör SG, Karakurt A, Kemer ÖE, Akman A', location: 'European Glaucoma Symposium, Prague, Czech Republic', type: 'conference', category: 'B' },
    { id: 'B37', year: 2016, title: 'Characteristics of uveitic glaucoma in Turkish patients', authors: 'Tekeli O, Bayer A, Elgin U, Kemer ÖE, Takmaz T, Karakurt A, Aktaş Z', location: 'European Glaucoma Symposium, Prague, Czech Republic', type: 'conference', category: 'B' },
    { id: 'B38', year: 2016, title: 'Comparison of anterior segment measurements with Lenstar and Pentacam in patients using prostoglandine analogues', authors: 'Şen E, Inanc M, Elgin U', location: 'European Glaucoma Symposium, Prague, Czech Republic', type: 'conference', category: 'B' },
    { id: 'B39', year: 2016, title: 'The demographic and clinical specialties of neovascular glaucoma cases in tertiary ophthalmic centers in Ankara', authors: 'Elgin U, Aktaş Z, Ekşioğlu Ü, Akman A, Gürel S, Takmaz T', location: 'European Glaucoma Symposium, Prague, Czech Republic', type: 'conference', category: 'B' },
    { id: 'B40', year: 2017, title: 'Comparison of refractive status and anterior segment parameters of juvenile open-angle glaucoma and normal subjects', authors: 'Elgin U, Şen E, Uzel M, Yılmazbaş P', location: 'World Glaucoma Congress, Helsinki, Finland', type: 'conference', category: 'B' },
    { id: 'B41', year: 2017, title: 'Effect of prostaglandin anologs on Corneal clarity', authors: 'Şen E, Merve İnanç Elgin U', location: 'World Glaucoma Congress, Helsinki, Finland', type: 'conference', category: 'B' },
    { id: 'B42', year: 2017, title: 'Initial trabeculectomy with 5-fluorouracil with or without subconjunctival bevacizumab in the management of pseudoexfoliation glaucoma', authors: 'Elgin U, Şen E, Çolak S, Yılmazbaş P', location: 'Congress of the European Society of Cataract and Refractive Surgery, Lisbon, Portugal', type: 'conference', category: 'B' },
    { id: 'B43', year: 2018, title: 'Comparison of mitomycin C-augmented trabeculectomy and Ex-Press miniature glaucoma device in the management of neovascular glaucoma', authors: 'Elgin U, Şen E, Çolak S, Yılmazbaş P', location: 'European Glaucoma Symposium, Florence, Italy', type: 'conference', category: 'B' },
    { id: 'B44', year: 2018, title: 'Early refractive effect of cataract surgery in medically controlled glaucoma', authors: 'Sen E, Ozkoyuncu D, Elgin U', location: 'European Glaucoma Symposium, Florence, Italy', type: 'conference', category: 'B' },
    { id: 'B45', year: 2019, title: 'Laser Peripheral Iridotomy Induced Changes in Corneal Densitometry in Acute Primary Angle Closure Glaucoma Cases', authors: 'Elgin U, Sen E, Budakoglu O, Yildirim D, Yesilyaprak N', location: 'Congress of the European Society of Cataract and Refractive Surgery, Paris, France', type: 'conference', category: 'B' },
    { id: 'B46', year: 2020, title: 'The comparison of corneal densitometry in primary open-angle glaucoma, pseudoexfoliation glaucoma and ocular hypertension', authors: 'Elgin U, Şimşek M, Sen E, Acar A', location: '14th European Glaucoma Congress', type: 'conference', category: 'B' },
    { id: 'B47', year: 2020, title: 'The efficacy and safety of trehalose dua in in primary trabeculectomy with mitomycin C: A report of early findings', authors: 'Sen E, Elgin U, Ozen O, Bayrak G', location: '14th European Glaucoma Congress', type: 'conference', category: 'B' },
  ];

  // Ulusal konferans bildirileri (E1-E82)
  const nationalConferencePapers: Publication[] = [
    {
      id: "E1",
      year: 1997,
      title:
        "Yırtıklı retina dekolmanı hastalarının klinik özellikleri ve tedavi sonuçları",
      authors: "Beden Ü, Eldem B, İlhan B, Elgin U, Saraçbaşı O",
      location: "Türk Oftalmoloji Derneği 31. Ulusal Kongresi, Istanbul",
      type: "conference",
      category: "E",
    },
    {
      id: "E2",
      year: 1999,
      title:
        "Uzun süreli beta blokör kullanan glokomlu hastalarda %1'lik aproklonidinin etkisi",
      authors: "Berker N, Batman A, Elgin U, Zilelioğlu O",
      location: "Türk Oftalmoloji Derneği 33. Ulusal Kongresi, İzmir",
      type: "conference",
      category: "E",
    },
    {
      id: "E3",
      year: 2000,
      title:
        "Primer açık açılı glokomda latanoprost ve timolol maleat monoterapisi sonuçları",
      authors: "Elgin U, Batman A, İlhan B, Zilelioğlu O",
      location: "Türk Oftalmoloji Derneği 34. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E4",
      year: 2000,
      title: "Üveit olgularında sekonder glokom insidansı",
      authors: "Batman A, Elgin U, Berker N, Soykan E",
      location: "Türk Oftalmoloji Derneği 34. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E5",
      year: 2003,
      title:
        "Terminal dönem glokom olgularında, optonol implantın göz içi basıncını düşürmedeki etkisi",
      authors: "Elgin U, Batman A, Şimşek T, İlhan B, Berker N",
      location: "Türk Oftalmoloji Derneği 37. Ulusal Kongresi, Istanbul",
      type: "conference",
      category: "E",
    },
    {
      id: "E6",
      year: 2003,
      title: "Otozomal dominant Peters anomalisi",
      authors: "Elgin U, Berker N, Alanay Y",
      location: "Türk Oftalmoloji Derneği 37. Ulusal Kongresi, Istanbul",
      type: "conference",
      category: "E",
    },
    {
      id: "E7",
      year: 2003,
      title: "Akondroplazili bir olguda primer açık açılı glokom",
      authors: "Batman A, Elgin U, Vidinlisan S, Özkan SS",
      location: "Türk Oftalmoloji Derneği 37. Ulusal Kongresi, Istanbul",
      type: "conference",
      category: "E",
    },
    {
      id: "E8",
      year: 2003,
      title: "Goldenhar sendromu'nda konjenital fasial sinir paralizisi",
      authors: "Berker N, Acaroğlu G, Soykan E, Elgin U",
      location: "Türk Oftalmoloji Derneği 37. Ulusal Kongresi, Istanbul",
      type: "conference",
      category: "E",
    },
    {
      id: "E9",
      year: 2005,
      title:
        "Neovasküler glokom olgularında, periferik iridektomi öncesinde irise doğrudan koterizasyon yapılan ve mitomisin C kullanılan trabekülektomi ameliyatının sonuçları",
      authors: "Elgin U, Batman A, Şimşek T, Berker N, Zilelioğlu O",
      location: "Türk Oftalmoloji Derneği 39. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E10",
      year: 2005,
      title:
        "İnce avasküler kistik bleb ve komplikasyonlarının, risk faktörleri yönünden değerlendirilmesi ve tedavi yaklaşımları",
      authors: "Elgin U, Batman A, Şimşek T, Zilelioğlu O",
      location: "Türk Oftalmoloji Derneği 39. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E11",
      year: 2005,
      title:
        "Herpetik keratoüveit veya herpetik üveite sekonder glokomda klinik bulgular ve tedavi sonuçları",
      authors: "Şimşek T, Elgin U, Batman A, Eranıl S, Polat S, Zilelioğlu O",
      location: "Türk Oftalmoloji Derneği 39. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E12",
      year: 2005,
      title:
        "Behçet hastalığında retinal ven oklüzyonu insidansının belirlenmesi",
      authors:
        "Mütevelli S, Berker N, Elgin U, Soykan E, Özkan SS, Zilelioğlu O",
      location: "Türk Oftalmoloji Derneği 39. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E13",
      year: 2006,
      title: "Plazma ürik asit düzeyinin, trabekülektomi başarısına etkisi",
      authors: "Elgin U, Şimşek T, Batman A, Çankaya AB",
      location: "Türk Oftalmoloji Derneği 40. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E14",
      year: 2006,
      title:
        "Bir meme kanseri olgusunda, paclitaxel tedavisi sırasında gelişen göziçi basını artışı",
      authors: "Elgin U, Şimşek T, Batman A, Çankaya AB",
      location: "Türk Oftalmoloji Derneği 40. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E15",
      year: 2006,
      title: "Normal olgularda, sigara içiminin göz içi basıncına etkisi",
      authors: "Çankaya AB, Elgin U, Şimşek T, Batman A",
      location: "Türk Oftalmoloji Derneği 40. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E16",
      year: 2006,
      title:
        "Primer açık açılı glokom olgularında, latanoprost'un oküler hipotansif etkisini değiştirebilecek klinik özelliklerin incelenmesi",
      authors: "Çankaya AB, Elgin U, Batman A, Şimşek T, İlhan B",
      location: "Türk Oftalmoloji Derneği 40. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E17",
      year: 2006,
      title:
        "Progresif iris atrofisine sekonder iki glokom olgusu ve tedavi sonuçları",
      authors: "Batman A, Elgin U, Şimşek T, Çankaya AB",
      location: "Türk Oftalmoloji Derneği 40. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E18",
      year: 2006,
      title:
        "Travmatik hifema olgularında, klinik gözlem ve tedavi sonuçlarının değerlendirilmesi",
      authors: "Aktaş N, Batman A, Elgin U, Kabataş EU, Zilelioğlu O",
      location: "Türk Oftalmoloji Derneği 40. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E19",
      year: 2006,
      title:
        "Graves oftalmopatiye ikincil glokom görülme sıklığı ve risk faktörleri",
      authors: "Şimşek T, Aktaş N, Acaroğlu G, Elgin U, Batman A, Zilelioğlu O",
      location: "Türk Oftalmoloji Derneği 40. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E20",
      year: 2006,
      title:
        "Behçet hastalığında katarakt insidansı ve sekonder glokom ile birlikteliği",
      authors: "Berker N, Elgin U, Soykan E, Özkan SS",
      location: "Türk Oftalmoloji Derneği 40. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E21",
      year: 2007,
      title:
        "Psödoeksfoliatif glokom, psödoeksfoliatif sendrom ve normal olgularda, aköz humor endotelin-1 düzeylerinin kıyaslanması",
      authors:
        "Elgin U, Biçer T, Akın O, Kabataş E, İlhan B, Şimşek T, Batman A, Çankaya B",
      location: "Türk Oftalmoloji Derneği 41. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E22",
      year: 2007,
      title:
        "Bleb yetmezliği için uygulanan konjonktiva altı 5-Fluorourasil enjeksiyonu sonrası, konjonktiva epitelinin impresyon sitolojisi ile incelenmesi",
      authors:
        "Şimşek T, Fırat P, Çıtırık M, Elgin U, Batman A, Çankaya B, Zilelioğlu O",
      location: "Türk Oftalmoloji Derneği 41. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E23",
      year: 2007,
      title:
        "Topikal dorzolamid alan olgularda oral asetazalamid ilavesinin göz içi basıncı üzerindeki etkisinin araştırılması",
      authors: "Çankaya B, Elgin U, Batman A",
      location: "Türk Oftalmoloji Derneği 41. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E24",
      year: 2007,
      title:
        "Diyabetik retinopatide, Heidelberg retinal tomografi ile optik sinir analizi",
      authors:
        "Berker N, Özdamar Y, Çankaya B, Batman C, Elgin U, Özkan SS, Soykan E, Karakaya J",
      location: "Türk Oftalmoloji Derneği 41. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E25",
      year: 2007,
      title:
        "Behçet ve non-Behçet üveitlerin etyolojik ve demografik özellikleri",
      authors: "Özdamar Y, Berker N, Elgin U, Soykan E, Özkan SS, Karakaya J",
      location: "Türk Oftalmoloji Derneği 41. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E26",
      year: 2007,
      title:
        "Hospitalize edilen olgularda ciddi göz yaralanmalarındaki demografik özelliklerin ve risk faktörlerinin araştırılması",
      authors: "Çankaya B, Taşdemir S, Taşdemir G, Elgin U, Zilelioğlu O",
      location: "Türk Oftalmoloji Derneği 41. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E27",
      year: 2008,
      title:
        "Primer açık açılı glokomlu olgularda santral kornea kalınlığı ile optik sinir başının topografik parametreleri arasındaki ilişkinin değerlendirilmesi",
      authors: "Şimşek T, Teberik K, Elgin U, Çankaya AB, Teberik P, Batman A",
      location: "Türk Oftalmoloji Derneği 42. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E28",
      year: 2008,
      title:
        "Vogt-Koyanagi-Harada sendromlu olgularımızda klinik özellikler ve prognoz",
      authors: "Elgin U, Çıtırık M, Songur MS, Berker N, Soykan E, Özkan SS",
      location: "Türk Oftalmoloji Derneği 42. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E29",
      year: 2008,
      title:
        "Latanoprosta ilave edilen brinzolamid ve briminidin'in oküler hipotansif etkelerinin retrospektif olarak değerlendirilmesi",
      authors: "Çankaya AB, Elgin U, Şimşek T, Batman A",
      location: "Türk Oftalmoloji Derneği 42. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E30",
      year: 2008,
      title: "Diyabetes Mellitus ve santral kornea kalınlığı",
      authors:
        "Özdamar Y, Çankaya AB, Gürlevik U, Özalp S, Elgin U, Aslan Ö, Özkan SS, Karakaya J",
      location: "Türk Oftalmoloji Derneği 42. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E31",
      year: 2009,
      title:
        "Primer Açık Açılı Glokom, Psödoeksfoliatif glokom ve psödoeksfoliatif sendromlu olguların impresyon sitolojilerinin kıyaslanması",
      authors:
        "Elgin U, Çıtırık M, Üstün H, Haksever H, Şen E, Serdar K, Özal H, Öztürk F",
      location: "Türk Oftalmoloji Derneği 43. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E32",
      year: 2009,
      title:
        "Bir nanoftalmus olgusunda, trabekülektomi sonrası gelişen eksudatif retina dekolmanının, topikal kortikosteroidlerle hızlı rezorbsiyonu",
      authors: "Ersoy M, Elgin U, Teke YM, Şen E, Özal H, Öztürk F",
      location: "Türk Oftalmoloji Derneği 43. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E33",
      year: 2009,
      title:
        "Aile öyküsü olan ve olmayan glokomlu olguların, optik disk topografilerinin karşılaştırılması",
      authors: "Şen E, Kara C, Elgin U, Öncül H, Özal H, Öztürk F",
      location: "Türk Oftalmoloji Derneği 43. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E34",
      year: 2009,
      title:
        "Akromegali hastalarının göz içi basıncı, merkezi kornea kalınlığı ve optik disk toporafilerinin sağlıklı bireylerle karşılaştırılması",
      authors: "Şen E, Tütüncü Y, Elgin U, Berker D, Özal H, Güler S, Öztürk F",
      location: "Türk Oftalmoloji Derneği 44. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E35",
      year: 2010,
      title:
        "Primer açık açılı glokom ve psödoeksfoliatif glokomlu olgularda, mitomisin C'li trabekülektominin, maküler kalınlık üzerine etkisi",
      authors: "Elgin U, Şen E, Tırhış H, Serdar K, Özal H, Öztürk F",
      location: "Türk Oftalmoloji Derneği 44. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E36",
      year: 2010,
      title:
        "Kronik aspirin kullanımının yol açtığı, mikrotravma kökenli tekrarlayan hifemaya sekonder gelişen ileri glokom olgusu",
      authors: "Elgin U, Şen E, Teke MY, Tırhış H, Özal H, Öztürk F",
      location: "Türk Oftalmoloji Derneği 44. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E37",
      year: 2010,
      title:
        "Sağlıklı bireylerde kornea biyomekaniği ve göz içi basıncının yaşla değişimi",
      authors: "Şen E, Hocaoğlu M, Tırhış H, Akalın İ, Elgin U, Öztürk F",
      location: "Türk Oftalmoloji Derneği 44. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E38",
      year: 2010,
      title:
        "Primer açık açılı glokom tedavisinde prostaglandin anologlarının uzun dönem etkinlikleri",
      authors: "Kara C, Şen E, Ersoy M, Ergan E, Elgin U, Özal H, Öztürk F",
      location: "Türk Oftalmoloji Derneği 44. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E39",
      year: 2011,
      title:
        "Primer Açık Açılı Glokom Ve Psödoeksfoliatif Glokomda, Mitomisin C'li Trabekülektominin Korneal Histeresis Üzerine Olan Etkisinin Kıyaslanması",
      authors: "Elgin U, Şen E, Hocaoğlu M, Ersoy M, Özal H, Öztürk F",
      location: "Türk Oftalmoloji Derneği 45. Ulusal Kongresi, Kıbrıs",
      type: "conference",
      category: "E",
    },
    {
      id: "E40",
      year: 2011,
      title:
        "Psödoeksfoliasyon Sendromu İle Birlikteliği Olan Ve Olmayan Oküler Hipertansiyon Olgularında, Merkezi Korneal Kalınlığın Kıyaslanması",
      authors: "Elgin U, Şen E, Özal H, Öztürk F",
      location: "Türk Oftalmoloji Derneği 45. Ulusal Kongresi, Kıbrıs",
      type: "conference",
      category: "E",
    },
    {
      id: "E41",
      year: 2011,
      title: "Akromegali Hastalarının Kornea Biyomekanik Özellikleri",
      authors: "Şen E, Tütüncü Y, Elgin U, Berker D, Öztürk F, Güler S",
      location: "TOD 45. Ulusal Kongresi, Girne- KKTC",
      type: "conference",
      category: "E",
    },
    {
      id: "E42",
      year: 2011,
      title:
        "İzole Büyüme Hormonu Eksikliği Olan Çocuklarda Kornea Biyomekanik Özelliklerinin Araştırılması",
      authors:
        "Nalçacıoğlu P, Şen E, Hocaoğlu M, Elgin U, Öztürk F, Ağladıoğlu SY, Kendirci HNP, Çetinkaya S, Aycan Z",
      location: "TOD 45. Ulusal Kongresi, Girne- KKTC",
      type: "conference",
      category: "E",
    },
    {
      id: "E43",
      year: 2011,
      title:
        "Psödoeksfoliyatif Sendrom ve Psödoeksfoliyatif Glokom Olgularında Kornea Biyomekaniği",
      authors: "Özal H, Akalın İ, Öztürk F, Şen E, Elgin U, Koç F",
      location: "TOD 45. Ulusal Kongresi, Girne- KKTC",
      type: "conference",
      category: "E",
    },
    {
      id: "E44",
      year: 2012,
      title:
        "Psödoeksfoliasyon Sendromu İle Birlikteliği Olan Ve Olmayan Oküler Hipertansiyon Olgularında, Merkezi Korneal Kalınlığın Kıyaslanması",
      authors: "U. Elgin, E. Şen, F. Öztürk",
      location: "TOD 46. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E45",
      year: 2012,
      title:
        "35 yaşında bir olguda tek taraflı ileri evre psödoeksfoliasyon glokomu",
      authors: "U. Elgin, E Aksoy, E. Şen, F. Öztürk",
      location: "TOD 46. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E46",
      year: 2012,
      title: "Primer açık açılı glokom hastalarında makuler koroid kalınlığı",
      authors: "F Öztürk, H Tırhış, E Şen, U Elgin, MA Anayol",
      location: "TOD 46. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E47",
      year: 2012,
      title: "Fuchs Üveitli Hastalarda Göz İçi Basıncı ve Kornea Biyomekaniği",
      authors: "E Şen, P Özdal, U Elgin, P Yüksekkaya, F Öztürk",
      location: "TOD 46. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E48",
      year: 2012,
      title: "Glokomlu Olgularda Kanaloplasti Sonuçlarımız",
      authors: "F Öztürk, E Şen, U Elgin, P Yüksekkaya",
      location: "TOD 46. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E49",
      year: 2013,
      title:
        "Asimetrik Başlangıçlı Primer Açık Açılı Glokom ve Oküler Hipertansiyon Olgularında, Her İki Gözün Ön Segment Parametrelerinin Kıyaslanması",
      authors: "U Elgin, E Şen, M Şimşek, F Öztürk",
      location: "TOD 47. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E50",
      year: 2014,
      title:
        "Sağ göz travması nedeniyle başvuran olgunun sol gözündeki klinik tablo",
      authors: "İnanç M, Şen E, Elgin U, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E51",
      year: 2014,
      title: "Çocuklarda diabetes mellitusun ön segment parametrelerine etkisi",
      authors: "Uzel M, Elgin U, Şen E, Keskin M, Sağsak E, Aycan Z",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E52",
      year: 2014,
      title:
        "Hipermetropik anizometropik ambliyopilerde ön segment parametrelerinin değerlendirilmesi",
      authors: "Tekin K, Cankurtaran V, Elgin U, Şen E, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E53",
      year: 2014,
      title:
        "Miyopik anizometropik ambliyopilerde makula ve peripapiller retina sinir lifi tabakası kalınlığı",
      authors: "Cankurtaran V, Elgin U, Şen E, Tekin K, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E54",
      year: 2014,
      title:
        "Hipermetropik anizometropik ambliyopilerde makula ve peripapiller retina sinir lifi tabakası kalınlığı",
      authors: "Cankurtaran V, Elgin U, Şen E, Tekin K, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E55",
      year: 2014,
      title:
        "Fakoemulsifikasyon cerrahisinde cerrahi tecrübenin cerrahi ile indüklenmiş astigmatizmaya etkisinin incelenmesi",
      authors: "Eraslan N, Şen E, Elgin U, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E56",
      year: 2014,
      title:
        "Acil servise göz travması nedeniyle başvuran olguların epidemiyolojik değerlendirilmesi",
      authors: "Çelik S, Elgin U, Şen E, Tokmak A, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E57",
      year: 2014,
      title: "Erişkin emetrop olgularda yaşla ön segment bulgularının değişimi",
      authors: "Günaydın S, Şen E, Uzel M, Tekin K, Elgin U, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E58",
      year: 2014,
      title:
        "Prostaglandin anoloğu ilaçların oküler biyometri parametreleri üzerine etkileri; erken sonuçlar",
      authors: "Şen E, Elgin U, Özkan H, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E59",
      year: 2014,
      title: "Acil servise başvuran olguların epidemiyolojik değerlendirilmesi",
      authors: "Tokmak T, Şen E, Elgin U, Tırhış H, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E60",
      year: 2014,
      title:
        "Fakoemülsifikasyon ile katarakt cerrahisi sonrasında ön kamaraya triamsinolon asetonid enjeksiyonunun ön segment parametreleri ve göz içi basıncına etkisi",
      authors: "Şimşek T, Kaygısız M, Elgin U, Tekin K, Yılmabaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E61",
      year: 2014,
      title:
        "Kortikosteroid kullanımına bağlı gelişen glokom olgularımızın, etyolojik ve klinik özellikleri",
      authors: "Elgin U, Şen E, Şimşek T, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E62",
      year: 2014,
      title: "Tanısal bir sorun, kanalikülit",
      authors: "Yılmaz BM, Şen E, Evren E, Elgin U, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E63",
      year: 2014,
      title: "Gemella haemolysans ve porphyromonas asaccarolytica kanaliküliti",
      authors: "Şen E, Evren E, Elgin U",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E64",
      year: 2014,
      title:
        "Psödoeksfolyasyon sendromlu ve psödoeksfolyatif glokomlu hastalarda ön segment parametrelerinin karşılaştırılması",
      authors: "Kaygısız M, Elgin U, Şen E, Günaydın S, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E65",
      year: 2014,
      title:
        "Trabekülektominin optik biyometri ile ölçülen ön segment parametreleri üzerine olan etkileri",
      authors: "Elgin U, Şen E, Tokmak A, İnanç M, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E66",
      year: 2014,
      title:
        "İntravitreal enjeksiyonların göz içi basıncı ve merkezi kornea kalınlığına erken dönem etkileri",
      authors: "Omay E, Elgin U, Şen E, Çelik S, İnanaç M, Yılmazbaş P",
      location: "TOD 48. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E67",
      year: 2015,
      title: "Ankara glokom çalışması; planlama, metod ve ilk sonuçlar",
      authors:
        "Elgin U, Tekeli O, Takmaz T, Ekşioğlu Ü, Yarangümeli A, Mumcuoğlu T, Aktaş Z, Güngör SG, Karakurt A, Kemer ÖE, Akman A, Bayer A",
      location: "TOD 49. Ulusal Kongresi, İstanbul",
      type: "conference",
      category: "E",
    },
    {
      id: "E68",
      year: 2015,
      title: "Acil servise başvuran olguların mevsimlere göre dağılımı",
      authors: "Şen E, Tokmak A, Çelik S, Elgin U, Özyurt B, Yılmazbaş P",
      location: "TOD 49. Ulusal Kongresi, İstanbul",
      type: "conference",
      category: "E",
    },
    {
      id: "E69",
      year: 2015,
      title: "Künt göz travması sonrası göz içi basıncı artış nedenleri",
      authors: "Şimşek T, Elgin U, Batman A",
      location: "TOD 49. Ulusal Kongresi, İstanbul",
      type: "conference",
      category: "E",
    },
    {
      id: "E70",
      year: 2015,
      title:
        "Retina tüm kalbiyle internal limitan membranın soyulmasını izliyor",
      authors: "Elgin U, Tırhış H",
      location: "TOD 49. Ulusal Kongresi, İstanbul",
      type: "conference",
      category: "E",
    },
    {
      id: "E71",
      year: 2015,
      title:
        "Farklı glokom tiplerinin, trabekülektomi nedeniyle oluşan cerrahi indüklenmiş astigmatizmaya olan etkileri",
      authors: "Uzel M, Elgin KU, Eraslan NS, Şimşek M, Şen E",
      location: "TOD 49. Ulusal Kongresi, İstanbul",
      type: "conference",
      category: "E",
    },
    {
      id: "E72",
      year: 2015,
      title:
        "Katarakt cerrahisi sonrasında ön kamaraya uygulanan sefuroksim ve moksifloksasinin, merkezi korneal kalınlık üzerine olan etkilerinin karşılaştırılması",
      authors: "Tekin K, Elgin KU, Şen E, Tokmak A, İnanç M, Yılmazbaş P",
      location: "TOD 49. Ulusal Kongresi, İstanbul",
      type: "conference",
      category: "E",
    },
    {
      id: "E73",
      year: 2016,
      title: "Diabet mellituslu hastalarda glokom profili, klinik özellikler",
      authors: "Gülpamuk B. Elgin U, Şen E",
      location: "TOD 50. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E74",
      year: 2016,
      title:
        "İdyopatik konjenital kataraktlı olgularda lens ön kapsülünün elektromikroskopik incelenmesi",
      authors:
        "Tekin K, Erol YÖ, Sargon M, İnanç M, Can ÇÜ, Polat S, Elgin U, Yılmazbaş P",
      location: "TOD 50. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E75",
      year: 2016,
      title:
        "Türkiye'de pediatrik glokom hastalarında epidemiyolojik ve klinik özellikler",
      authors:
        "Aktaş Z, Ekşioğlu Ü, Demir P, Elgin U, Tekeli O, Yarangümeli A, Mumcuoğlu T, Takmaz T, Karakurt A, Güngör SG, Kemer ÖE, Akman A, Bayer A",
      location: "TOD 50. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E76",
      year: 2017,
      title: "Prostagalndin analoglarının korneal saydamlık üzerine etkileri",
      authors: "Şen E, İnanç M, Elgin U, Yılmazbaş P",
      location: "TOD 51. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E77",
      year: 2017,
      title:
        "Psödoeksfoliatif sendrom, psödoeksfoliatif glokom ve primer açık açılı glokom hastalarında, humor aköç total ve aktif ghrelin seviyelerinin karşılaştırılması",
      authors: "Eraslan SN, Elgin U, Şen E, Kılıç A, Yılmazbaş P",
      location: "TOD 51. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E78",
      year: 2017,
      title:
        "Trabekülektomi sonrası erken dönemde ön kamara parametrelerindeki değişimlerin Scheimpflug görüntüleme yöntemleri ile incelenmesi",
      authors: "Şimşek M, Elgin U, Şen E, Uzel M, Yılmazbaş P",
      location: "TOD 51. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E79",
      year: 2017,
      title:
        "Topikal koenzim Q10 kullanımının, psödoeksfoliatif glokomu bulunan hastalardaki antioksidan etkisi",
      authors: "Özateş S, Elgin U, Yılma NS, Demirel ÖÖ, Şen E, Yılmazbaş P",
      location: "TOD 51. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E80",
      year: 2019,
      title:
        "Preoperatif Kaptopril Kullanımın Göz İçi Basıncı Üzerine Etkisinin İncelenmesi",
      authors: "Güngör A, Koçer AM, Şimşek M, Elgin KU",
      location: "TOD 53. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E81",
      year: 2019,
      title:
        "Topikal prostaglandinlerin korneal dansitometri üzerine etkilerinin incelenmesi: Erken dönem sonuçlar",
      authors: "Şimşek M, Elgin KU",
      location: "TOD 53. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
    {
      id: "E82",
      year: 2019,
      title:
        "Makula Kapiller Damar Yoğunluğu Değişikliklerinin Pseudoeksfolyatif ve Primer Açık Açılı Glokomlu Olgularda Optik Koherans Tomografi Anjiyografi ile İncelenmesi",
      authors: "Hondur G, Bayraktar S, Doğuizi S, Kızıtoprak H, Şen E. Elgin U",
      location: "TOD 53. Ulusal Kongresi, Antalya",
      type: "conference",
      category: "E",
    },
  ];

  // Panel ve kurs konuşmaları
  const panelAndCoursePresentations: Array<{
    id: string;
    title: string;
    event: string;
    year: number;
    location?: string;
    type?: "panel" | "course";
  }> = [
      {
        id: "P1",
        year: 2009,
        title: "Cerrahi tedavide yenilikler",
        event:
          "Türk Oftalmoloji Derneği, 11. Uygulamalı Glokom Cerrahi Sempozyumu",
        location: "İstanbul",
        type: "panel",
      },
      {
        id: "P2",
        year: 2009,
        title: "Filtran cerrahide yenilikler",
        event:
          "Türk Oftalmoloji Derneği, 11. Uygulamalı Glokom Cerrahi Sempozyumu",
        location: "İstanbul",
        type: "panel",
      },
      {
        id: "P3",
        year: 2008,
        title: "Hifemalar Ve İris Yaralanmaları",
        event: "Türk Oftalmoloji Derneği, 42. Ulusal kongre",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P4",
        year: 2010,
        title: "Konjonktivadan örnek alınması ve klinik değerlendirme",
        event:
          "Türk Oftalmoloji Derneği, 44. Ulusal kongre - Oküler Enfeksiyonlar Birimi Uygulamalı Kursu",
        location: "Antalya",
        type: "course",
      },
      {
        id: "P5",
        year: 2011,
        title: "Nöron Koruyucu İlaçlar",
        event:
          "Türk Oftalmoloji Derneği, Bahar sempozyumu - Glokomda tıbbi tedavi paneli",
        location: "İstanbul",
        type: "panel",
      },
      {
        id: "P6",
        year: 2011,
        title: "Neovasküler glokom, Etiyoloji ve Patogenez",
        event:
          "Türk Oftalmoloji Derneği, 45. Ulusal kongre - Glokom birimi paneli",
        location: "Girne",
        type: "panel",
      },
      {
        id: "P7",
        year: 2011,
        title: "Katarakt cerrahisi",
        event:
          "Türk Oftalmoloji Derneği, 45. Ulusal kongre - Oküler Cerrahide Antisepsi ve Antibiyotik Proflaksisi kursu",
        location: "Girne",
        type: "course",
      },
      {
        id: "P8",
        year: 2011,
        title: "Komplikasyonlar ve tedavisi",
        event:
          "Türk Oftalmoloji Derneği, 45. Ulusal kongre - Ön segment penetran yaralanmaları kursu",
        location: "Girne",
        type: "course",
      },
      {
        id: "P9",
        year: 2011,
        title: "Penetran cerrahide başarıyı etkileyen faktörler",
        event:
          "Türk Oftalmoloji Derneği, Glokom cerrahi sempozyumu - Penetran cerrahi paneli",
        location: "Ankara",
        type: "panel",
      },
      {
        id: "P10",
        year: 2013,
        title: "Oküler Enfeksiyonlar: Örnek Alma",
        event:
          "Türk Oftalmoloji Derneği, Nisan kursu - Oküler enfeksiyonlarda tanı ve muayene yöntemleri",
        location: "Ankara",
        type: "course",
      },
      {
        id: "P11",
        year: 2013,
        title: "Trabekülektomi sonrası hipotoni ve ona bağlı gelişen makulapati",
        event:
          "Türk Oftalmoloji Derneği, Glokom cerrahi sempozyumu - Cerrahi olgular oturumu",
        location: "İzmir",
        type: "panel",
      },
      {
        id: "P12",
        year: 2013,
        title:
          "New antiglaucoma medicines to improve patients compliance and tolerability",
        event: "Today and Future in Glaucoma symposium",
        location: "St Petersburg, Rusya",
        type: "panel",
      },
      {
        id: "P13",
        year: 2013,
        title: "Glokom ilaçlarının oküler yüzey ile ilişkisi",
        event: "Türk Oftalmoloji Derneği, 47. Ulusal kongre",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P14",
        year: 2014,
        title: "Diabet ve Glokom Epidemiyolojisi",
        event:
          "Türk Oftalmoloji Derneği, Kış sempozyumu - Diabet ve glokom paneli",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P15",
        year: 2014,
        title:
          "Cerrahi sonrası geç dönem konjonktiva ve kornea sorunları ve çözümleri",
        event:
          "Türk Oftalmoloji Derneği, Glokom cerrahi sempozyumu - Glokomda cerrahi sonrası komplikasyonlar ve tedavisi paneli",
        location: "Ankara",
        type: "panel",
      },
      {
        id: "P16",
        year: 2014,
        title: "İris-Lens Travmaları",
        event:
          "Türk Oftalmoloji Derneği, 48. Ulusal kongre - Olgularla oküler travma etkileşimli panel",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P17",
        year: 2015,
        title: "Glokom İlaçlarında Yan Etkiler ve Toksisite",
        event:
          "Türk Oftalmoloji Derneği, yaz sempozyumu - Glokomda Akılcı İlaç Kullanımı paneli",
        location: "İzmir",
        type: "panel",
      },
      {
        id: "P18",
        year: 2015,
        title: "Göz dışı operasyonlarda antibiyotik profilaksisi",
        event:
          "Türk Oftalmoloji Derneği, 49. Ulusal kongre - Oküler enfeksiyonlar birimi paneli",
        location: "İstanbul",
        type: "panel",
      },
      {
        id: "P19",
        year: 2016,
        title: "Tarayıcı Lazer Polarimetre",
        event: "Türk Oftalmoloji Derneği, Nisan kursu - Glokomda tanı paneli",
        location: "Ankara",
        type: "panel",
      },
      {
        id: "P20",
        year: 2016,
        title: "Üveitik glokomda ilk cerrahi seçeneği: Filtran cerrahi",
        event:
          "50. Türk Oftalmoloji Derneği, 50. Ulusal kongre - Glokom birimi paneli",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P21",
        year: 2016,
        title: "Penetran göz yaralanmasında primer yaklaşım",
        event:
          "Türk Oftalmoloji Derneği, 50. Ulusal kongre - Oküler travmatoloji birimi paneli",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P22",
        year: 2017,
        title: "Oküler Travmalar: Terminoloji ve Sınıflama",
        event:
          "Türk Oftalmoloji Derneği, Kış sempozyumu - Panel: Oküler Travmalara Yaklaşım: Akılcı İlaç Kullanımı",
        location: "Bursa",
        type: "panel",
      },
      {
        id: "P23",
        year: 2017,
        title: "Olgularla görme alanı analizleri",
        event:
          "Türk Oftalmoloji Derneği, Glokom birimi Beceri aktarım kursu - Glokom tanısında ve tedavinin yönlendirilmesinde görme alanından nasıl faydalanacağız?",
        location: "Bursa",
        type: "course",
      },
      {
        id: "P24",
        year: 2017,
        title: "Ön segment travmaları",
        event:
          "Türk Oftalmoloji Derneği, Bahar sempozyumu - Panel: Çocuklarda göz yaralanmaları",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P25",
        year: 2017,
        title: "Seton implant, kime, nasıl yapayım?",
        event:
          "51. Türk Oftalmoloji Derneği, 51. Ulusal kongre - Glokom birimi paneli",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P26",
        year: 2017,
        title: "Üveitik glokomda yaklaşımımız",
        event:
          "Türk Oftalmoloji Derneği, 51. Ulusal kongre - Glokom birimi beceri aktarım kursu",
        location: "Antalya",
        type: "course",
      },
      {
        id: "P27",
        year: 2018,
        title: "OCT ile progresyon analizleri",
        event:
          "Türk Oftalmoloji Derneği, Mart sempozyumu - Panel: Glokomda görüntüleme teknikleri",
        location: "Adana",
        type: "panel",
      },
      {
        id: "P28",
        year: 2018,
        title:
          "Cerrahi sahanın uygun temizliği Ameliyathane personelinin hijyeni",
        event:
          "Türk Oftalmoloji Derneği, Oküler enfeksiyonlar beceri aktarım kursu - Göz cerrahisinde enfeksiyon kaynakları ve önlemleri",
        location: "Ankara",
        type: "course",
      },
      {
        id: "P29",
        year: 2018,
        title: "Glokomatöz görme alanı tanısı ve evreleme",
        event:
          "Türk Oftalmoloji Derneği, birimi beceri aktarım kursu - Glokom tanısında ve tedavinin yönlendirilmesinde tanısal testlerden nasıl faydalanacağız?",
        location: "Ankara",
        type: "course",
      },
      {
        id: "P30",
        year: 2018,
        title: "Kime hangi cerrahi",
        event:
          "Türk Oftalmoloji Derneği, Yaz sempozyumu - Panel: Glokom cerrahisi kabusunuz olmasın",
        location: "Van",
        type: "panel",
      },
      {
        id: "P31",
        year: 2018,
        title: "Hasta uyumu",
        event:
          "Türk Oftalmoloji Derneği, Yaz sempozyumu - Panel: Glokomun Medikal tedavisinde Güç, Konfor ve Hasta Uyumu",
        location: "Van",
        type: "panel",
      },
      {
        id: "P32",
        year: 2018,
        title: "Örneklerle olgu değerlendirmeleri",
        event:
          "Türk Oftalmoloji Derneği, 52. Ulusal kongre - Glokomun görme alanı değerlendirmesi",
        location: "Antalya",
        type: "course",
      },
      {
        id: "P33",
        year: 2018,
        title: "Adenovirus mikrobiyolojisi",
        event:
          "Türk Oftalmoloji Derneği, 52. Ulusal kongre - Adenoviral Enfeksiyonlara Oftalmolojik Yaklaşım",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P34",
        year: 2019,
        title: "Özellikli hastalarda tıbbi tedavide nelere dikkat edilmeli?",
        event:
          "Türk Oftalmoloji Derneği, birimi beceri aktarım kursu - Glokom tedavisi",
        location: "Ankara",
        type: "course",
      },
      {
        id: "P35",
        year: 2019,
        title: "İlaç raporları",
        event:
          "Türk Oftalmoloji Derneği, birimi beceri aktarım kursu - Güncel sağlık kurulu raporları",
        location: "Ankara",
        type: "course",
      },
      {
        id: "P36",
        year: 2019,
        title: "İlk yöntem hangisi olmalı? Görme alanı mı? OCT mi?",
        event:
          "Türk Oftalmoloji Derneği, gözde gündem toplantısı - Glokom şüphesinde nasıl davranalım?",
        location: "Girne",
        type: "panel",
      },
      {
        id: "P37",
        year: 2019,
        title: "İris lens yaralanmaları",
        event:
          "Türk Oftalmoloji Derneği, Bahar Sempozyumu - Ön segment yaralanmaları",
        location: "İstanbul",
        type: "panel",
      },
      {
        id: "P38",
        year: 2019,
        title: "Glokom demiştim ama değil galiba",
        event:
          "Türk Oftalmoloji Derneği, birimi beceri aktarım kursu - Glokom Tanı ve Tedavisinde Yol Haritamız",
        location: "Gaziantep",
        type: "course",
      },
      {
        id: "P39",
        year: 2019,
        title: "Ganglion hücreleri yenilenebilir mi?",
        event:
          "53. TOD Ulusal kongre - Glokomun geleceği-inovasyondan klinik pratiğe geçiş",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P40",
        year: 2019,
        title: "Zon 1 yaralanmaları",
        event:
          "53. TOD Ulusal kongre - Penetran glob yaralanmaları ve kapak yaralanmalarında yaklaşım aşamaları",
        location: "Antalya",
        type: "course",
      },
      {
        id: "P41",
        year: 2019,
        title: "Simbrinza: Gloom pratiğimdeki yeri",
        event: "53. TOD Ulusal kongre - Glokom tedavisinde gözde çözüm",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P42",
        year: 2019,
        title: "Orbitanın parazitik enfeksiyonları",
        event: "53. TOD Ulusal kongre - Orbita enfeksiyonları",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P43",
        year: 2021,
        title: "Travmatik katarakt cerrahisi",
        event:
          "Türk Oftalmoloji Derneği, Sanal Nisan kursu - Özellikli olgularda katarakt cerrahisi",
        location: "Online",
        type: "panel",
      },
      {
        id: "P44",
        year: 2021,
        title: "Glokomda OKT Anjiyo",
        event:
          "Türk Oftalmoloji Derneği, Sanal Bahar Sempozyumu - Glokomda görüntüleme yöntemleri",
        location: "Online",
        type: "panel",
      },
      {
        id: "P45",
        year: 2021,
        title:
          "Glokomlu hastanın reçetesinde nöroprotektif ilaçlar yer almalıdır",
        event: "55. TOD Ulusal kongre - Glokomda doğru bilinen yanlışlar",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P46",
        year: 2022,
        title: "Glokomda yapay zeka",
        event: "TOD Bahar sempozyumu - Oftalmolojide yapay zeka",
        location: "İstanbul",
        type: "panel",
      },
      {
        id: "P47",
        year: 2022,
        title: "Glokomda progresyon takibini OCT ile yaparım",
        event: "TOD 56. Ulusal kongre",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P48",
        year: 2023,
        title: "Siz olsaydınız ne yapardınız",
        event: "57: TOD Ulusal Kongre - Glokom Etkileşimli Toplantı",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P49",
        year: 2024,
        title: "Travmatik glokom",
        event: "58: TOD Ulusal Kongre - OTM etkileşimli toplantı",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P50",
        year: 2024,
        title: "Glokom ile Nörooftalmolojik patoloji ayırımında OKT'ye güvenirim",
        event: "58: TOD Ulusal Kongre - Glokom etkileşimli toplantı",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P51",
        year: 2024,
        title: "OCTA in glaucoma",
        event: "European Glaucoma Society congress",
        location: "Dublin, Ireland",
        type: "panel",
      },
      {
        id: "P52",
        year: 2025,
        title: "OKTA pratik olarak kullanışlı mı",
        event: "58: TOD Ulusal Kongre - Glokom BİLEP toplantı",
        location: "Antalya",
        type: "panel",
      },
      {
        id: "P53",
        year: 2025,
        title: "Glokomda destekleyici ve alternatif tedaviler",
        event: "Türk Oftalmoloji Derneği, birimi beceri aktarım kursu",
        location: "Diyarbakır",
        type: "course",
      },
    ];

  // Kitap bölümleri (C1-C11)
  const bookChapters: Array<{
    id: string;
    title: string;
    book: string;
    year: number;
    pages?: string;
    editors?: string;
  }> = [
      { id: 'C1', year: 2013, title: 'Oküler enfeksiyonlarda örnek alınması', book: '33. TOD Oftalmoloji kursu kitabı', pages: '32-27' },
      { id: 'C2', year: 2013, title: 'Görme alanına genel bakış', book: 'Görme alanları: Muayene ve yorumlama', pages: '3-40', editors: 'Prof.Dr Oya Tekeli' },
      { id: 'C3', year: 2014, title: 'Görme alanının önemi', book: 'Shields textbook of glaucoma Türkçe', pages: '92-120', editors: 'Prof.Dr Oya Tekeli' },
      { id: 'C4', year: 2016, title: 'Tarayıcı lazer polarimetre', book: '36. TOD Oftalmoloji kursu kitabı', pages: '59-64' },
      { id: 'C5', year: 2017, title: 'Minimal invazif glokom cerrahisi: Ab interno trabekülektomi', book: 'Glokomda cerrahi yenilikler', pages: '175-186', editors: 'Doç.Dr. Zeynep Aktaş, Doç. Dr. Sinan Sarıcaoğlu' },
      { id: 'C6', year: 2021, title: 'Steroid glokomu', book: 'Glokom temel kavramlar ve yenilikler (ISBN: 978-605-80205-3-5)', pages: '195-200', editors: 'Özcan Ocakoğlu, Atilla Bayer, Ufuk Elgin' },
      { id: 'C7', year: 2021, title: 'Editörlük', book: 'Glokom temel kavramlar ve yenilikler (ISBN: 978-605-80205-3-5)', editors: 'Özcan Ocakoğlu, Atilla Bayer, Ufuk Elgin' },
      { id: 'C8', year: 2020, title: 'Travmatik glokom ve oküler hipotoni', book: 'Oküler Travmatoloji ve Medikolegal Oftalmoloji: Güncel Tanı ve Tedavi Yaklaşımları (ISBN: 978-605-61013-5-9)', pages: '295-305', editors: 'Dr. Mehmet Çıtırık' },
      { id: 'C9', year: 2021, title: 'Mantar enfeksiyonlarında mikrobiyolojik inceleme', book: 'Oküler Enfeksiyonlar Güncel Tanı ve Tedavi (ISBN: 978-605-61013-7-3)', pages: '49-53', editors: 'Ulviye Yiğit, Erdal Yüzbaşıoğlu' },
      { id: 'C10', year: 2021, title: 'Travmatik olgularda katarakt cerrahisi', book: '40. TOD Oftalmoloji kursu kitabı', pages: '140-144' },
      { id: 'C11', year: 2021, title: 'Blebitis ve bleb ile bağlantılı endoftalmi', book: 'TOD Eğitim Yayınları' },
    ];

  // Seçili kategoriye göre filtreleme
  const filteredPublications = useMemo(() => {
    let filtered: Publication[] = [];

    if (selectedCategory === "international-articles") {
      filtered = allPublications;
    } else if (selectedCategory === "national-articles") {
      filtered = nationalArticles;
    } else if (selectedCategory === "international-conferences") {
      filtered = internationalConferencePapers;
    } else if (selectedCategory === "national-conferences") {
      filtered = nationalConferencePapers;
    }

    if (selectedYear !== null) {
      filtered = filtered.filter((p) => p.year === selectedYear);
    }

    return filtered.sort((a, b) => b.year - a.year);
  }, [
    selectedCategory,
    selectedYear,
    nationalArticles,
    internationalConferencePapers,
    nationalConferencePapers,
  ]);

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  // Bilimsel Kuruluşlara Üyelikler
  const memberships = [
    "Türk Tabipler Birliği",
    "Türk Oftalmoji Derneği",
    "Türk Oftalmoji Derneği Glokom Birimi Aktif Üyeliği",
    "Türk Oftalmoji Derneği Oküler Travmatoloji ve Medikolegal Oftalmoloji Birimi Aktif Üyeliği",
    "Türk Oftalmoji Derneği Oküler Enfeksiyonlar Birimi Aktif Üyeliği",
    "Dünya Glokom Topluluğu (World Glaucoma Society) Üyeliği",
    "Avrupa Glokom Topluluğu (European Glaucoma Society) Üyeliği",
    "Amerikan Oftalmoloji Akademisi (American Academy of Ophthalmology) Üyeliği",
  ];

  // Editör Yardımcılığı
  const editorships = ["Glokom-Katarakt Dergisi"];

  // Katıldığım Diğer Uluslararası Toplantılar
  const otherMeetings = [
    "American Ophthalmology annual meeting Anaheim, CA, 2003",
    "American Ophthalmology annual meeting Chicago, IL, 2005",
    "American Ophthalmology annual meeting Las Vegas, NV, 2006",
    "American Ophthalmology annual meeting San Francisco, CA, 2009",
    "American Ophthalmology annual meeting Chicago, IL, 2010",
    "American Ophthalmology annual meeting Orlando, FL, 2011",
    "American Ophthalmology annual meeting New Orleans, LA, 2013",
    "American Ophthalmology annual meeting Chicago, IL, 2014",
    "American Ophthalmology annual meeting Las Vegas, NV, 2015",
    "American Ophthalmology annual meeting Chicago, IL, 2018",
    "World Glaucoma Congress (WGC), Honolulu, Hawaii, 2025",
    "European Glaucoma Society congress, Dublin, Ireland, 2024",
  ];

  return (
    <Container className="py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Bilimsel Makaleler ve Yayınlar
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Prof. Dr. Kadriye Ufuk Elgin
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>159 Makale</span>
            </div>
            <div className="flex items-center gap-2">
              <Presentation className="w-4 h-4" />
              <span>129 Bildiri</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>52 Panel/Kurs</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="sticky top-24 space-y-2">
              {/* Ana Kategoriler */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Bilimsel Makaleler
                </h3>
                <div className="space-y-1">
                  {categories.slice(0, 2).map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedYear(null);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${selectedCategory === category.id
                          ? "bg-primary text-white shadow-md"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-primary/50 hover:bg-gray-50"
                          }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 mt-0.5 ${selectedCategory === category.id ? "text-white" : "text-primary"}`}
                            />
                            <span className="text-sm font-medium line-clamp-3 leading-snug">
                              {category.title.split(". ")[1] || category.title}
                            </span>
                          </div>
                          <span
                            className={`text-xs font-bold shrink-0 ${selectedCategory === category.id ? "text-white" : "text-gray-500"}`}
                          >
                            {category.count}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Bilimsel Toplantılar
                </h3>
                <div className="space-y-1">
                  {categories.slice(2, 5).map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedYear(null);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${selectedCategory === category.id
                          ? "bg-primary text-white shadow-md"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-primary/50 hover:bg-gray-50"
                          }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 mt-0.5 ${selectedCategory === category.id ? "text-white" : "text-primary"}`}
                            />
                            <span className="text-sm font-medium line-clamp-3 leading-snug">
                              {category.title.split(". ")[1] || category.title}
                            </span>
                          </div>
                          <span
                            className={`text-xs font-bold shrink-0 ${selectedCategory === category.id ? "text-white" : "text-gray-500"}`}
                          >
                            {category.count}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Diğer
                </h3>
                <div className="space-y-1">
                  {categories.slice(5).map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedYear(null);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${selectedCategory === category.id
                          ? "bg-primary text-white shadow-md"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-primary/50 hover:bg-gray-50"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 ${selectedCategory === category.id ? "text-white" : "text-primary"}`}
                            />
                            <span className="text-sm font-medium truncate">
                              {category.title.split(". ")[1] || category.title}
                            </span>
                          </div>
                          <span
                            className={`text-xs font-bold ml-2 shrink-0 ${selectedCategory === category.id ? "text-white" : "text-gray-500"}`}
                          >
                            {category.count}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Google Scholar Link */}
              {(selectedCategory === "international-articles" ||
                selectedCategory === "national-articles") && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <a
                      href="https://scholar.google.com/citations?hl=tr&user=rXphPsUAAAAJ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      GOOGLE AKADEMİK PROFİLİ
                    </a>
                  </div>
                )}
            </div>
          </aside>

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">
            {/* Category Header */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                {currentCategory && (
                  <>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <currentCategory.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {currentCategory.title}
                      </h2>
                      <p className="text-gray-600 text-sm mt-1">
                        Toplam{" "}
                        <span className="font-bold text-primary">
                          {currentCategory.count}
                        </span>{" "}
                        {currentCategory.title.toLowerCase().includes("makale")
                          ? "makale"
                          : currentCategory.title
                            .toLowerCase()
                            .includes("bildiri")
                            ? "bildiri"
                            : currentCategory.title
                              .toLowerCase()
                              .includes("üyelik")
                              ? "kuruluş"
                              : currentCategory.title
                                .toLowerCase()
                                .includes("editör")
                                ? "dergi"
                                : "kayıt"}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Year Filter (sadece makaleler için) */}
            {(selectedCategory === "international-articles" ||
              selectedCategory === "national-articles") && (
                <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Yıla Göre Filtrele:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedYear(null)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedYear === null
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      Tüm Yıllar
                    </button>
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedYear === year
                          ? "bg-primary text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        {year}{" "}
                        <span className="opacity-75">({statsByYear[year]})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {/* Content based on category */}
            {selectedCategory === "international-articles" && (
              <div className="space-y-4">
                {filteredPublications.map((pub) => (
                  <article
                    key={pub.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                            {pub.year}
                          </span>
                          {pub.journal && (
                            <span className="text-sm text-gray-500 italic font-medium">
                              {pub.journal}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug hover:text-primary transition-colors">
                          {pub.title}
                        </h3>
                        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                          {pub.authors}
                        </p>
                        {pub.volume && pub.pages && (
                          <p className="text-xs text-gray-500 font-medium">
                            {pub.volume}, {pub.pages}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {selectedCategory === "memberships" && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                <ul className="space-y-2">
                  {memberships.map((membership, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-gray-800 text-base font-medium">
                        {membership}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedCategory === "editorships" && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                <ul className="space-y-2">
                  {editorships.map((editorship, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-gray-800 text-base font-medium">
                        {editorship}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedCategory === "other-meetings" && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                <ul className="space-y-2">
                  {otherMeetings.map((meeting, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-gray-800 text-base">{meeting}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ulusal Makaleler */}
            {selectedCategory === "national-articles" && (
              <div className="space-y-4">
                {filteredPublications.length > 0 ? (
                  filteredPublications.map((pub) => (
                    <article
                      key={pub.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/30"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                              {pub.year}
                            </span>
                            {pub.journal && (
                              <span className="text-sm text-gray-500 italic font-medium">
                                {pub.journal}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug hover:text-primary transition-colors">
                            {pub.title}
                          </h3>
                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                            {pub.authors}
                          </p>
                          {pub.volume && pub.pages && (
                            <p className="text-xs text-gray-500 font-medium">
                              {pub.volume}, {pub.pages}
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">
                      Veriler yakında eklenecektir.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Toplam {currentCategory?.count || 0} makale
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Uluslararası Konferans Bildirileri */}
            {selectedCategory === "international-conferences" && (
              <div className="space-y-4">
                {filteredPublications.length > 0 ? (
                  filteredPublications.map((pub) => (
                    <article
                      key={pub.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/30"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                              {pub.year}
                            </span>
                            {pub.location && (
                              <span className="text-sm text-gray-500 font-medium">
                                {pub.location}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug hover:text-primary transition-colors">
                            {pub.title}
                          </h3>
                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                            {pub.authors}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">
                      Veriler yakında eklenecektir.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Toplam {currentCategory?.count || 0} bildiri
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Ulusal Konferans Bildirileri */}
            {selectedCategory === "national-conferences" && (
              <div className="space-y-4">
                {filteredPublications.length > 0 ? (
                  filteredPublications.map((pub) => (
                    <article
                      key={pub.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/30"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                              {pub.year}
                            </span>
                            {pub.location && (
                              <span className="text-sm text-gray-500 font-medium">
                                {pub.location}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug hover:text-primary transition-colors">
                            {pub.title}
                          </h3>
                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                            {pub.authors}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">
                      Veriler yakında eklenecektir.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Toplam {currentCategory?.count || 0} bildiri
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Panel ve Kurs Konuşmaları */}
            {selectedCategory === "panels" && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                {panelAndCoursePresentations.length > 0 ? (
                  <ul className="space-y-2">
                    {panelAndCoursePresentations.map((presentation, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <Award className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 text-base font-medium mb-1">
                            {presentation.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {presentation.event}
                          </p>
                          {presentation.location && (
                            <p className="text-xs text-gray-500 mt-1">
                              {presentation.location}, {presentation.year}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      Veriler yakında eklenecektir.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Toplam {currentCategory?.count || 0} kayıt
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Kitap Bölümleri */}
            {selectedCategory === "books" && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                {bookChapters.length > 0 ? (
                  <ul className="space-y-2">
                    {bookChapters.map((chapter, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 text-base font-medium mb-1">
                            {chapter.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {chapter.book}
                          </p>
                          {chapter.editors && (
                            <p className="text-xs text-gray-500 mt-1">
                              Editörler: {chapter.editors}
                            </p>
                          )}
                          {chapter.pages && (
                            <p className="text-xs text-gray-500">
                              Sayfa: {chapter.pages}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            {chapter.year}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      Veriler yakında eklenecektir.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Toplam {currentCategory?.count || 0} kayıt
                    </p>
                  </div>
                )}
              </div>
            )}

            {filteredPublications.length === 0 &&
              selectedCategory === "international-articles" && (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-500">
                    Seçilen yıla ait makale bulunamadı.
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </Container>
  );
}

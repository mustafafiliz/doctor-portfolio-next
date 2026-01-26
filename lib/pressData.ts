export interface PressItem {
  id: string;
  slug: string;
  type: 'news' | 'interview' | 'tv';
  title: string;
  source: string;
  date: string;
  image?: string;
  externalLink?: string;
  description?: string;
  fullContent?: string;
}

// Basından haberler verileri
export const pressData: PressItem[] = [
  {
    id: '1',
    slug: 'mag-dergisi-akilli-mercek-ameliyati',
    type: 'interview',
    title: 'Akıllı Mercek Ameliyatı',
    source: 'MAG Sağlık ve Güzellik',
    date: 'Nisan 2023',
    image: '/images/news/1.png',
    description: 'Prof. Dr. K. Ufuk Elgin, katarakt problemi ve akıllı mercek uygulamaları hakkında MAG Okurları için değerli bilgiler veriyor.',
    fullContent: 'Küçük yaşlarında göz doktoru olmayı kendine hedef edinen Prof. Dr. K. Ufuk Elgin, katarakt problemi ve akıllı mercek uygulamaları hakkında MAG Okurları için oldukça değerli bilgiler veriyor.',
  },
  {
    id: '2',
    slug: 'hurriyet-her-glokom-hastasi-potansiyel-gorme-engellidir',
    type: 'news',
    title: "'Her glokom hastası potansiyel görme engellidir'",
    source: 'Hürriyet Gazetesi',
    date: '11 Mart 2025',
    image: '/images/news/2.webp',
    externalLink: 'https://www.hurriyet.com.tr/yerel-haberler/ankara/her-glokom-hastasi-potansiyel-gorme-engellidir42724305',
    description: 'Glokom hastalığının körlük nedenleri içerisinde ilk sıralarda yer aldığını belirten Prof. Dr. Kadriye Ufuk Elgin, bugün dünyada 80-90 milyon glokomlu olduğu bilinmektedir.',
    fullContent: `Glokom hastalığının körlük nedenleri içerisinde ilk sıralarda yer aldığını belirten Göz Hastalıkları Uzmanı Prof. Dr. Kadriye Ufuk Elgin, bugün dünyada 80-90 milyon glokomlu olduğu bilinmektedir. Her glokomlu 'potansiyel görme engellidir. Glokom hastalığını tamamen iyileştirmek mümkün değil ancak ilerlemesini durdurmak elimizde" dedi.

Dünyagöz Ankara Hastanesi'nden Prof. Dr. Kadriye Ufuk Elgin, Glokom Haftası kapsamında açıklamalarda bulundu. Prof. Dr. Elgin, hastaların tedaviyi aksatmamaları gerektiğini belirterek "Tanı konulduktan sonra tedavisi mümkün olan glokom hastalarının ilaçlarla veya gerekli durumlarda ameliyatlarla körlüğe gidişi engellenebiliyor. Ancak görmesini yitirmiş bir gözün tekrar görmesi maalesef mümkün değil. Bu yüzden hastaların, önerilen tedaviyi uygulamaları ve özellikle Ramazan ayında oruç tutan glokom hastalarının göz damlasını damlatmayı ihmal etmemeleri gerekir. Göz damlası orucu bozmaz ama bu damlanın bir doz bile atlanması körlüğe sebep olabilir" ifadelerini kullandı.

'DAMLA KULLANIMI BİR DOZ BİLE ATLANMAMALI'

Prof. Dr. Elgin, glokom hastalığının tedavisindeki asıl amacın, tanı alan hastanın görme seviyesini korumak olduğunu vurgulayarak "Görme yeteneğimizin sessiz hırsızı olan Glokom hastalığını tamamen iyileştirmek mümkün değil ancak ilerlemesini durdurmak elimizde. Bunun için, glokom hastalarının yapmaları gereken en önemli şey doktorların söylediği saatte ve dozda damlalarını damlatmak ve önerilen tedavilere uymaktır. Doktorunuzun yazdığı ilaçları önerilen saatlerde ve dozda kullanarak göz içi basıncını normal seviyelere düşürerek hastalığı kontrol altında tutmak mümkündür. Bu yüzden özellikle Ramazan ayında oruç tutarken göz damlasını damlatmayı ihmal etmemek gerekir. Göz damlası orucu bozmaz ama bu damlanın bir doz bile atlanması körlüğe sebep olabilir" diye konuştu.

'GLOKOM HASTASININ YAŞAM TARZI ÇOK ÖNEMLİ'

Glokomlu hastanın yaşam tarzının, hastalığın gidişatı açısından son derece önemli olduğunu da ekleyen Prof. Dr. Elgin beslenme önerilerini şu şekilde sıraladı: "Hastanın beslenme tarzı ve diğer alışkanlıkları da hastalığın gidişatını etkiler. Sağlıklı dinamik bir vücuda sahip olmanın yanı sıra bol sebze, meyve içeren Akdeniz tarzı diyet ile beslenme glokomu olumlu yönde etki eder. Glokomlu hastaların günlük diyetinde, narenciye ve yeşil bitkilerde bulunan C vitamini; badem, ay çekirdeği, kabak çekirdeği, fındık, ceviz gibi kuruyemişlerin yanı sıra avokado gibi bazı sebzeler ve balıkta bulunan E vitamini; tahıl ürünlerinde çokça bulunan B vitamini yer almalıdır. Yaban mersini, çilek vb. diğer kırmızı ve mor meyveler, özellikle balık yağı, keten tohumu yağı ve ceviz gibi omega-3 ve omega-6 içeren gıdalar, çekirdekli siyah üzüm ve bitter çikolata Glokoma karşı faydalıdır."

'SİGARADAN UZAK BİR YAŞAM SON DERECE ÖNEMLİ'

Prof. Dr. Elgin, "Sigaradan uzak bir yaşam, tüm vücut sağlığı için olduğu gibi glokomla mücadele için de son derece önemlidir. Alkol tüketimi ile glokom arasında bir ilişki ise net olarak bilinmemektedir. Ancak günde bir kadeh kırmızı şarap içilmesi, antioksidan özelliği nedeniyle glokom için faydalı olabilir. Günde 2-3 kupayı geçmeyen siyah ve yeşil çay tüketimi glokom için faydalı iken, aşırı kahve içimi hastalığı olumsuz yönde etkiliyor" dedi. Düzenli egzersizin genel vücut sağlığı için olduğu kadar glokoma karşı da büyük oranda önemli olduğunu dile getiren Prof. Dr. Elgin, "Düzenli olarak haftada 3-4 kez, 40-45 dakika dinamik aerobik egzersiz (yürüme, koşma, bisiklet vs) idealdir. Glokom hastaları için uygun olmayan sporlara gelince: Başın aşağıda kaldığı atipik pozisyonlara bağlı olarak yoga, benzer şekilde ağırlık çalışmaları, skuat gibi izometrik egzersizler ve bungee jumping gibi sporlar uygun değildir. Ayrıca sıkı yüzücü gözlükleri ve dalış sporu da glokomlu hastalar için uygun değildir" ifadelerini kullandı.`,
  },
  {
    id: '3',
    slug: 'medikal-akademi-40-yas-ustu-glokom-riski',
    type: 'news',
    title: 'Prof. Dr. Kadriye Ufuk Elgin: 40 yaşın üzerindeki kişilerde glokom riski artıyor',
    source: 'Medikal Akademi',
    date: '13 Mart 2023',
    image: '/images/news/3.webp',
    externalLink: 'https://www.medikalakademi.com.tr/prof-elgin-40-yas-ustu-glokom-riski-artiyor/',
    description: 'Halk arasında göz tansiyonu olarak bilinen glokomun görme sinirine hasar vererek körlüğe neden olabileceğini belirten Prof. Dr. Kadriye Ufuk Elgin, hastalığın 40 yaş üstü kişilerde daha sık görülebildiğini vurguladı.',
    fullContent: `Halk arasında göz tansiyonu olarak bilinen glokomun görme sinirine hasar vererek körlüğe neden olabileceğini belirten Dünyagöz Hastanesi Göz Hastalıkları Uzmanı Prof. Dr. Kadriye Ufuk Elgin, hastalığın 40 yaş üstü kişilerde daha sık görülebildiğini vurguladı. 6-12 Mart Glokom Haftası nedeniyle Medikal Akademi Ankara Temsilcisi Hatice Pala Kaya'ya bilgi veren Dünyagöz Hastanesi'nden Göz Hastalıkları Uzmanı Prof. Dr. Kadriye Ufuk Elgin, glokomun sinsi bir hastalık olduğuna ve körlük nedenleri içerisinde ilk sıralarda yer aldığına işaret ederek, "Geç tanı konulduğunda görme sinirinde onarılması mümkün olmayan ciddi tahribatlar oluşturabilmektedir. Şikayetler ortaya çıkana kadar beklenmemelidir. 40 yaşına gelen her erişkinin detaylı göz muayenesi olması önerilmektedir" dedi.

Ailenizde glokom varsa, risk daha fazla

Göz içi basıncı normalden yüksek olan kişilerde glokom gelişme riskinin daha yüksek olduğuna dikkati çeken Prof. Dr. Elgin, hastalığın risk faktörleriyle ilgili şunları kaydetti: "40 yaşın üzerindeki kişilerde glokom riski artmaktadır. Glokomun genetik ile ilişkisi olabilir. Ailesinde glokom olan kişilerde gelişme riski daha yüksektir. Diğer bir deyişle, bir veya birden fazla gende bozukluk olabilir ve bu bireyler glokoma karşı daha hassas hale gelebilir. Şeker hastalığı ve hiper ya da hipotiroidizm olan hastalarda glokom gelişme riski daha fazladır. Ciddi göz yaralanmaları, göz içi basıncının yükselmesine neden olabilir. Diğer risk faktörleri; retina dekolmanı, göz tümörleri ve kronik üveit veya iritis gibi göz iltihaplarıdır. Genellikle uzağı iyi görememe olarak bilinen miyopide glokom sıklığı yaklaşık iki misli artmıştır. Uzun süreli kortizon kullanımı (göz damlası, ağızdan veya cilt pomadı vb. olarak) ikincil glokom gelişimine neden olabilir. Bazı göz cerrahileri de ikincil glokom gelişimini tetikleyebilir."

40 yaşına gelen herkese yıllık rutin göz kontrolü öneriyoruz

Bu risk faktörlerine sahip kişilerin, görme sinirinde meydana gelebilecek hasarın erken tespiti için düzenli göz muayenesi olmalarının çok önemli olduğunu dile getiren Prof. Dr. Kadriye Ufuk Elgin, düzenli göz muayenelerinin, glokomun erken tanısı ve başarılı koruyucu tedavinin yapılmasında anahtar olduğunun altını çizdi. Elgin, "40 yaşına gelen her erişkinin detaylı göz muayenesi olması önerilmektedir. Eğer glokom ile ilgili herhangi bir risk faktörünüz yok ise, bu muayeneler 3-5 yılda bir tekrarlanmalıdır. 60 yaş sonrası muayene her yıl tekrarlanmalıdır" diye konuştu.

Açık açılı glokom, erken dönemde belirti vermez

Glokomun başlıca açık açılı ve kapalı açılı glokom olmak üzere iki tipte görülebildiğini anlatan Prof. Dr. Elgin, bu iki tipin birbirinden tamamen farklı şikayetlere neden olduğu bilgisini verdi. Açık açılı glokomun en sık görülen glokom tipi olduğunu ve kalıcı görme siniri hasarı gelişene kadar pek bulgu vermediğini belirten Prof. Dr. Elgin, şunları söyledi: "Açık açılı glokom, genellikle 40 yaş ve sonrasında ortaya çıkar. Drenaj açısının yıllar içerisinde fonksiyonunun azalması ve göz içi sıvısının yeterince boşalamaması nedeniyle göz tansiyonu yükselir ve göz sinirinde hasara neden olur. Hastalığın ileri döneminde şikayetlere neden olur. Bu şikayetler, çoğunlukla iki taraflı olarak, görme alanının çevresel kısımlarının kaybedilmesi ve ileri dönemde tünel görmedir."

Dar açılı glokomda göz ağrısı, bulantı ve kusma görülebilir

Dar açılı glokomun ise nadiren görülen bir glokom tipi olduğunu, genellikle yapısı daha küçük olan hipermetrop gözlerde, iris dokusunun drenaj açısına çok yakın pozisyonda yerleşmesi ve bu açıyı kapatmasıyla ortaya çıktığını söyleyen Prof. Dr. Elgin, "Drenaj açısının kapanmasıyla göz içi sıvının dışa akımı bloke olduğundan, göz tansiyonu ani bir şekilde 40-50 mmHg değerlere kadar yükselir. Bu durum oldukça ağrılıdır. Birlikte bulantı- kusma olabilir ve görme bulanıklaşır. Acil olarak tedavi edilmesi gereken bu durum kalıcı körlüğe neden olabilir. Dar açılı glokom hastalarının bir kısmında açı kapanması yıllar içerisinde ve yavaş yavaş gelişebilir" dedi.

Akdeniz tarzı diyet glokoma karşı faydalı

Glokomlu hastanın yaşam tarzı, beslenme ve diğer alışkanlıklarının da hastalığın gidişatını etkilediğine işaret eden Prof. Dr. Kadriye Ufuk Elgin, Akdeniz tarzı diyet ile beslenmenin glokomu olumlu yönde etkilediğini kaydetti. Glokomlu hastaların beslenmelerine özen göstermesi gerektiğini belirten Elgin, sözlerine şöyle devam etti: "Bol sebze, meyve içeren Akdeniz tarzı diyet glokoma karşı faydalıdır. Glokomlu hastaların günlük diyetinde, narenciye ve yeşil bitkilerde bulunan C vitamini; badem, ay çekirdeği, kabak çekirdeği, fındık, ceviz gibi kuruyemişlerin yanı sıra avokado gibi bazı sebzeler ve balıkta bulunan E vitamini; tahıl ürünlerinde çokça bulunan B vitamini yer almalıdır. Yaban mersini, çilek vb. diğer kırmızı ve mor meyveler, özellikle balık yağı, keten tohumu yağı ve ceviz gibi omega-3 ve omega-6 içeren gıdalar, çekirdekli siyah üzüm ve bitter çikolata glokoma karşı faydalıdır."

Aşırı kahve içimi hastalığı olumsuz etkiliyor

Glokomla mücadelede sigaradan uzak bir yaşamın son derece önemli olduğunu hatırlatan Prof. Dr. Elgin, alkol tüketimi ile glokom arasındaki ilişkinin net olarak bilinmediğini, ancak günde bir kadeh kırmızı şarap içilmesinin, antioksidan özelliği nedeniyle glokom için faydalı olabileceğini ayrıca günde 2-3 kupayı geçmeyen siyah ve yeşil çay tüketiminin glokom için faydalı iken, aşırı kahve içiminin hastalığı olumsuz yönde etkilediğini anlattı.

Uygun sporları yapın

Prof. Dr. Elgin, düzenli egzersizin, genel vücut sağlığı için olduğu kadar glokom için de büyük oranda önemli olduğunu, düzenli olarak haftada 3-4 kez, 40-45 dakika dinamik aerobik egzersizin (yürüme, koşma, bisiklet vs) ideal olduğunu aktardı. Glokom hastaları için uygun olmayan sporlar hakkında da uyarılarda bulunan Prof. Dr. Elgin, "Başın aşağıda kaldığı atipik pozisyonlara bağlı olarak yoga, benzer şekilde ağırlık çalışmaları, skuat gibi izometrik egzersizler ve bungee jumping gibi sporlar uygun değildir. Ayrıca sıkı yüzücü gözlükleri ve dalış sporu da glokomlu hastalar için uygun değildir" diye konuştu.`,
  },
  {
    id: '4',
    slug: 'kanal-d-konustukca-programi',
    type: 'tv',
    title: 'Konuştukça Programı',
    source: 'Kanal D',
    date: '24 Ocak 2026',
    externalLink: 'https://www.kanald.com.tr/konustukca/bolumler/konustukca-462-bolum-24-01-2026',
    description: 'Prof. Dr. Kadriye Ufuk Elgin, Kanal D\'de yayınlanan Konuştukça programına konuk oldu.',
  },
];

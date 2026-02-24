import { BannerCarousel } from '@/components/BannerCarousel';
import { CategoryTile } from '@/components/CategoryTile';
import { ProductCard } from '@/components/ProductCard';
import VideoHero from '@/components/VideoHero';
import { useCart } from '@/context/CartContext';
import { kits as mockKits } from '@/data/kits';
import { ApiService } from '@/services/api'; // Import ApiService
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const { cart } = useCart();

  const [occasions, setOccasions] = useState<any[]>([]);
  const [kits, setKits] = useState<any[]>(mockKits);
  const [nuts, setNuts] = useState<any[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetchOccasions();
    fetchNuts();
  }, []);

  const fetchNuts = async () => {
    try {
      const data = await ApiService.getNuts();
      const formattedNuts = data.map((n: any) => ({
        id: n.id?.toString(),
        title: n.itemName,
        price: n.price || n.estimatedPrice || 0,
        image: ApiService.getImageUrl(n.s3ImageKey || n.imageUrl) || 'https://via.placeholder.com/150',
        description: n.description,
        quantityUnit: n.quantityUnit || 'piece',
        isInStock: n.isInStock !== false,
        stockInQuantity: n.stockInQuantity || 0,
        totalQuantity: n.totalQuantity || 1
      }));
      setNuts(formattedNuts);
    } catch (error) {
      console.error("Failed to fetch nuts", error);
    }
  };

  const fetchOccasions = async () => {
    try {
      const data = await ApiService.getOccasions();
      setOccasions(data);
    } catch (error) {
      console.error("Failed to fetch occasions", error);
    }
  };


  const renderSectionHeader = (title: string, onSeeAll?: () => void) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} style={styles.seeAllBtn}>
          <Ionicons name="arrow-forward-circle" size={24} color="#FF9933" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Image source={require('@/assets/images/logo_without_name.png')} style={styles.logo} />
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#8D7F71" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search for pooja kits, items..."
              style={styles.searchInput}
              placeholderTextColor="#8D7F71"
            />
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} style={{ position: 'relative' }}>
            <Ionicons name="cart-outline" size={28} color="#FF9933" />
            {cart.length > 0 && (
              <View style={{
                position: 'absolute',
                top: -4,
                right: -4,
                backgroundColor: '#800000',
                borderRadius: 10,
                width: 18,
                height: 18,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#FFF'
              }}>
                <Text style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>
                  {cart.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          {/* Restored VideoHero for stable local asset playback */}
          <VideoHero />
        </View>
        <BannerCarousel />

        <View style={styles.categoriesContainer}>
          {/* Category Tabs */}
          {occasions.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.categoryTabsContainer, { paddingHorizontal: 16 }]}>
              {['All', ...Array.from(new Set(occasions.map(o => o.category).filter(Boolean)))].map((cat: any) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryTab,
                    selectedCategory === cat && styles.categoryTabActive
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={[
                    styles.categoryTabText,
                    selectedCategory === cat && styles.categoryTabTextActive
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
            {occasions.filter(item => selectedCategory === 'All' || item.category === selectedCategory).map((item) => (
              <CategoryTile
                key={item.id}
                title={item.occasionName || item.title}
                image={ApiService.getImageUrl(item.s3ImageKey || item.image) || 'https://via.placeholder.com/150'} // Fallback
                onPress={() => router.push({
                  pathname: "/product/[id]",
                  params: {
                    type: 'occasion',
                    id: item.id,
                    title: item.occasionName, // Pass title to avoid "Godumarayi" issue
                    price: 0, // Default price if not in occasion object
                    image: ApiService.getImageUrl(item.s3ImageKey),
                    description: item.description
                  }
                } as any)}
              />
            ))}
          </ScrollView>
        </View>

        {nuts.length > 0 && (
          <View style={styles.section}>
            {renderSectionHeader("Premium Nuts", () => router.push({ pathname: '/listing/[type]', params: { type: 'nuts', title: 'Premium Nuts' } } as any))}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
              {nuts.map((item) => (
                <View key={item.id} style={{ marginRight: 16 }}>
                  <ProductCard
                    item={item}
                    onPress={() => router.push({
                      pathname: "/product/[id]",
                      params: {
                        id: item.id,
                        type: 'nut',
                        title: item.title,
                        price: item.price,
                        image: item.image,
                        description: item.description,
                        quantityUnit: item.quantityUnit,
                        totalQuantity: item.totalQuantity
                      }
                    } as any)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0', // Spiritual Cream
  },
  header: {
    backgroundColor: '#FFF8F0', // Spiritual Cream
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E6D7C3',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E6D7C3',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#4A3B2A', // Spiritual Brown
  },
  categoriesContainer: {
    backgroundColor: '#FFF8F0', // Spiritual Cream
    paddingVertical: 16,
    marginBottom: 8,
  },
  categoryTabsContainer: {
    marginBottom: 16,
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0E6D2', // Muted cream/gold for inactive
    borderWidth: 1,
    borderColor: '#E6D7C3',
  },
  categoryTabActive: {
    backgroundColor: '#800000', // Spiritual Maroon for active
    borderColor: '#800000',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#8D7F71',
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  section: {
    marginBottom: 8,
    backgroundColor: '#FFF8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#800000', // Spiritual Maroon
  },
  seeAllBtn: {
    padding: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 8,
  },
});

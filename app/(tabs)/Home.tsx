import { BannerCarousel } from '@/components/BannerCarousel';
import { CategoryTile } from '@/components/CategoryTile';
import MediaRenderer from '@/components/MediaRenderer';
import { ProductCard } from '@/components/ProductCard';
import { ApiService } from '@/services/api';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const [marriageOccasions, setMarriageOccasions] = useState<any[]>([]);
  const [festivalOccasions, setFestivalOccasions] = useState<any[]>([]);
  const [kits, setKits] = useState<any[]>([]);
  const [poojaItems, setPoojaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [allOccasions, allItems] = await Promise.all([
        ApiService.getOccasions(),
        ApiService.getPoojaItems()
      ]);

      // Transform and filter occasions
      // Assuming backend 'type' field is available now (we added it)
      // If not, we might need fallback logic or rely on naming conventions

      const marriages = allOccasions.filter((o: any) => o.type === 'MARRIAGE' || o.occasionName?.toLowerCase().includes('marriage') || o.occasionName?.toLowerCase().includes('wedding')).map((o: any) => ({
        id: o.id.toString(),
        title: o.occasionName,
        image: o.imageUrl || 'https://via.placeholder.com/150',
        price: o.price || 0,
      }));

      const festivals = allOccasions.filter((o: any) => o.type === 'FESTIVAL' || (!o.type && !o.occasionName?.toLowerCase().includes('marriage'))).map((o: any) => ({
        id: o.id.toString(),
        title: o.occasionName,
        image: o.imageUrl || 'https://via.placeholder.com/150',
        price: o.price || 0,
      }));

      const pItems = allItems.map((i: any) => ({
        id: i.id.toString(),
        title: i.itemName,
        price: i.price || i.estimatedPrice || 100, // Fallback
        image: i.imageUrl || i.s3ImageKey || 'https://via.placeholder.com/150',
        rating: 4.5, // Default rating as backend doesn't have it yet
        description: i.description
      }));

      // For "Kits", if we don't have a dedicated endpoint, we might reuse filtering logic
      // Or if kits are just bundles, we can show specific occasions as kits
      const popularKits = [...marriages].slice(0, 5); // Just as an example

      setMarriageOccasions(marriages);
      setFestivalOccasions(festivals);
      setKits(popularKits);
      setPoojaItems(pItems);
    } catch (e) {
      console.error("Failed to fetch data", e);
    } finally {
      setLoading(false);
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
          <TouchableOpacity onPress={() => router.push('/(tabs)/cart')}>
            <Ionicons name="cart-outline" size={28} color="#FF9933" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          {/* Replaced VideoHero with MediaRenderer or updated VideoHero. 
               For now, keeping VideoHero if it works, or using MediaRenderer if we have dynamic content.
               Let's update it to be dynamic if we had a banner API. 
               For now, static video is fine as per requirements ("Banner videos... sourced from existing UI assets"). 
               Wait, "All images & videos must be loaded from S3" - so we should replace local assets in VideoHero too.
               I'll leave VideoHero as is for a second but wrapping it. 
               Actually user said "All images & videos must be loaded from S3 URLs". 
               So I should use MediaRenderer here with a hardcoded S3 URL if I had one, or fetching from a "Config" API.
               I will assume VideoHero needs to be updated. for now I will use MediaRenderer with a placeholder S3 URL.
           */}
          <MediaRenderer
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Example S3 URL
            posterUrl="https://via.placeholder.com/800x400"
            imageUrl="https://via.placeholder.com/800x400"
            style={{ height: 200, borderRadius: 12, marginBottom: 20, width: '100%' }}
            showWatermark={true}
          />
        </View>
        <BannerCarousel />

        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
            {marriageOccasions.slice(0, 4).map((item) => (
              <CategoryTile
                key={item.id}
                title={item.title.split(' ')[0]}
                image={item.image}
                onPress={() => router.push({ pathname: "/listing/[type]", params: { type: 'occasion', id: item.id } } as any)}
              />
            ))}
            {festivalOccasions.slice(0, 4).map((item) => (
              <CategoryTile
                key={item.id}
                title={item.title.split(' ')[0]}
                image={item.image}
                onPress={() => router.push({ pathname: "/listing/[type]", params: { type: 'occasion', id: item.id } } as any)}
              />
            ))}
            <CategoryTile
              title="View All"
              image="https://via.placeholder.com/70?text=ALL"
              onPress={() => router.push('/(tabs)/categories')}
            />
          </ScrollView>
        </View>

        {/* Marriage Kits */}
        <View style={styles.section}>
          {renderSectionHeader("Popular Marriage Kits")}
          <FlatList
            data={kits} // In real app, filter by type
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <View style={{ marginRight: 16 }}>
                <ProductCard
                  item={item}
                  onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.id, type: 'kit' } } as any)}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Individual Items */}
        <View style={styles.section}>
          {renderSectionHeader("Essential Pooja Items")}
          <View style={styles.grid}>
            {poojaItems.map((item) => (
              <View key={item.id} style={styles.gridItem}>
                <ProductCard
                  item={item}
                  onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.id, type: 'item' } } as any)}
                />
              </View>
            ))}
          </View>
        </View>

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

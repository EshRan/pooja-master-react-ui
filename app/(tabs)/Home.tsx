
import { BannerCarousel } from '@/components/BannerCarousel';
import { CategoryTile } from '@/components/CategoryTile';
import { ProductCard } from '@/components/ProductCard';
import { festivalOccasions } from '@/data/festivalOccasions';
import { items } from '@/data/items';
import { kits } from '@/data/kits';
import { marriageOccasions } from '@/data/marriageOccasions';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  const renderSectionHeader = (title: string, onSeeAll?: () => void) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} style={styles.seeAllBtn}>
          <Ionicons name="arrow-forward-circle" size={24} color="#D9945D" />
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
            <Feather name="search" size={20} color="#666" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search for pooja kits, items..."
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/cart')}>
            <Ionicons name="cart-outline" size={28} color="#D9945D" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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
                  onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.id } } as any)}
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
            {items.map((item) => (
              <View key={item.id} style={styles.gridItem}>
                <ProductCard
                  item={item}
                  onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.id } } as any)}
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
    backgroundColor: '#f1f2f4',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginBottom: 8,
  },
  section: {
    marginBottom: 8,
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
    color: '#212121',
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
